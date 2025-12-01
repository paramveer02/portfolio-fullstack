export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  'https://formspree.io/f/mnnejlpn';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

type FormspreeError = {
  error?: string;
  errors?: Array<{ field: string; message: string }>;
};

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitContactForm(
  payload: ContactFormPayload,
  signal?: AbortSignal
): Promise<{ success: boolean; error?: string }> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal,
      });

      // Handle different status codes with specific messages
      if (response.ok) {
        return { success: true };
      }

      // Parse error response
      let errorMessage = 'Unable to send your message.';
      
      try {
        const errorData: FormspreeError = await response.json();
        
        if (response.status === 400) {
          errorMessage = errorData.errors
            ? errorData.errors.map((e) => e.message).join('. ')
            : 'Invalid form data. Please check your input.';
        } else if (response.status === 403) {
          errorMessage = 'Form submission blocked. Please contact support.';
        } else if (response.status === 404) {
          errorMessage = 'Contact form not configured. Please use email directly.';
        } else if (response.status === 429) {
          errorMessage = 'Too many requests. Please try again in a few minutes.';
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later or use email.';
        } else {
          errorMessage = errorData.error || errorMessage;
        }
      } catch {
        // If JSON parsing fails, use generic message
        errorMessage = `Request failed (${response.status}). Please try again or use email.`;
      }

      // Don't retry on client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(errorMessage);
      }

      // Retry on 5xx server errors
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * (attempt + 1));
        continue;
      }

      throw new Error(errorMessage);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      // Don't retry on abort
      if (signal?.aborted || lastError.name === 'AbortError') {
        throw new Error('Request cancelled');
      }

      // Don't retry on network errors after max attempts
      if (attempt >= MAX_RETRIES) {
        throw new Error(
          'Network error. Please check your connection and try again, or contact via email.'
        );
      }

      // Wait before retry
      await sleep(RETRY_DELAY * (attempt + 1));
    }
  }

  throw lastError || new Error('Failed to send message');
}

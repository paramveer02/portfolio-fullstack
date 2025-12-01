export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  'https://formspree.io/f/mnnejlpn';

export async function submitContactForm(payload: ContactFormPayload, signal?: AbortSignal) {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new Error('We could not send your message. Please try again or use the direct email link.');
  }
}

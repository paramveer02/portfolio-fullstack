import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  submitContactForm,
  ContactFormPayload,
} from '../../utils/contactFormService';
import { Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const RATE_LIMIT_MS = 30_000;
const MAX_MESSAGE_LENGTH = 2000;
const MIN_MESSAGE_LENGTH = 24;

const WHATSAPP_LINK =
  'https://wa.me/4917643835327?text=Hi%20Paramveer,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.';

type FormValues = ContactFormPayload & {
  honeypot?: string;
  projectType?: string;
  budgetRange?: string;
};

interface ContactFormProps {
  onClose?: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const lastSubmissionRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const [status, setStatus] =
    useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      message: '',
      company: '',
      honeypot: '',
      projectType: '',
      budgetRange: '',
    },
  });

  // Abort pending request on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  const onSubmit = async (values: FormValues) => {
    // Honeypot check
    if (values.honeypot) return;

    // Client-side rate limiting
    const now = Date.now();
    if (now - lastSubmissionRef.current < RATE_LIMIT_MS) {
      setErrorMessage('Please wait 30 seconds before sending another message.');
      setStatus('error');
      return;
    }

    if (values.message.length > MAX_MESSAGE_LENGTH) {
      setErrorMessage(
        `Message is too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`,
      );
      setStatus('error');
      return;
    }

    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setStatus('submitting');
    setErrorMessage('');

    // Fold projectType + budgetRange into the final message
    const enrichedMessageParts: string[] = [];

    if (values.projectType) {
      enrichedMessageParts.push(`Project type: ${values.projectType}`);
    }
    if (values.budgetRange) {
      enrichedMessageParts.push(`Budget range: ${values.budgetRange}`);
    }
    enrichedMessageParts.push(`Message:\n${values.message.trim()}`);

    const finalMessage = enrichedMessageParts.join('\n\n');

    try {
      const result = await submitContactForm(
        {
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company?.trim() || undefined,
          message: finalMessage,
        },
        abortRef.current.signal,
      );

      if (result.success) {
        lastSubmissionRef.current = now;
        setStatus('success');
        setMessageValue('');
        reset({
          name: '',
          email: '',
          message: '',
          company: '',
          honeypot: '',
          projectType: '',
          budgetRange: '',
        });
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      setStatus('error');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          'Something went wrong. Please try again or contact via email.',
        );
      }
      console.error('Contact form error:', error);
    }
  };

  const CloseAction = () =>
    onClose ? (
      <div className="flex justify-end sm:hidden mb-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded border border-black/60 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-sm transition hover:bg-black hover:text-white"
          aria-label="Close contact form"
        >
          Close
        </button>
      </div>
    ) : null;

  return (
    <>
      {status === 'success' ? (
        /* Thank You Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12 px-6 space-y-6"
        >
          <CloseAction />
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Message sent!
            </h3>
            <p className="text-gray-600">
              Thanks for reaching out — I&apos;ll get back to you within 24
              hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="animated-border-btn w-full text-center leading-none font-light uppercase text-black mx-auto max-w-xs"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              letterSpacing: '0.08em',
            }}
          >
            <span className="box">Back to site</span>
          </button>
        </motion.div>
      ) : (
        <>
          {/* Side Contact Options - Hidden on mobile, shown on desktop */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full hidden lg:flex flex-col gap-4 pr-6">
            <a
              href="mailto:service@monpro-ai.com"
              className="group flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur border border-black/10 rounded-l-xl shadow-lg hover:shadow-xl transition-all hover:-translate-x-1"
              aria-label="Email Paramveer"
            >
              <Mail className="w-5 h-5 text-gray-700 group-hover:text-black transition" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-black whitespace-nowrap">
                Email me
              </span>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur border border-black/10 rounded-l-xl shadow-lg hover:shadow-xl transition-all hover:-translate-x-1"
              aria-label="Chat on WhatsApp"
            >
              <SiWhatsapp className="w-5 h-5 text-[#25d366] group-hover:scale-110 transition" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-black whitespace-nowrap">
                WhatsApp (fastest reply)
              </span>
            </a>
          </div>

          {/* Top Contact Options - Shown on mobile, hidden on desktop */}
          <div className="flex lg:hidden flex-col sm:flex-row gap-3 mb-6">
            <a
              href="mailto:service@monpro-ai.com"
              className="group flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-white/90 backdrop-blur border border-black/10 rounded-xl shadow-md hover:shadow-lg transition-all"
              aria-label="Email Paramveer"
            >
              <Mail className="w-5 h-5 text-gray-700 group-hover:text-black transition" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-black">
                Email me
              </span>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-white/90 backdrop-blur border border-black/10 rounded-xl shadow-md hover:shadow-lg transition-all"
              aria-label="Chat on WhatsApp"
            >
              <SiWhatsapp className="w-5 h-5 text-[#25d366] group-hover:scale-110 transition" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-black">
                WhatsApp (fastest reply)
              </span>
            </a>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative space-y-4 border border-black/10 bg-white/80 p-4 sm:p-6 text-left shadow-lg backdrop-blur max-h-[80vh] overflow-y-auto overscroll-contain sm:max-h-none sm:overflow-visible"
          >
            <CloseAction />
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-700">
                  Project enquiry
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  Tell me what you need built
                </p>
              </div>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="hidden sm:inline-flex items-center justify-center rounded border border-black/70 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
                  aria-label="Close contact form"
                >
                  Close
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'Your name is required',
                    minLength: {
                      value: 2,
                      message: 'Name is too short',
                    },
                  })}
                  aria-invalid={!!errors.name || undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                  placeholder="e.g., John Smith"
                  autoComplete="name"
                />
                {errors.name && (
                  <span id="name-error" className="text-xs text-red-600">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  aria-invalid={!!errors.email || undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                  placeholder="john@example.com"
                  autoComplete="email"
                  inputMode="email"
                />
                {errors.email && (
                  <span id="email-error" className="text-xs text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700"
                  htmlFor="company"
                >
                  Company (optional)
                </label>
                <input
                  id="company"
                  type="text"
                  {...register('company')}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                  placeholder="e.g., Acme Inc or local café in Leipzig"
                  autoComplete="organization"
                />
              </div>

              {/* Project type */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700"
                  htmlFor="projectType"
                >
                  Project type (optional)
                </label>
                <select
                  id="projectType"
                  {...register('projectType')}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="New website / redesign">
                    New website / redesign
                  </option>
                  <option value="Workflow / automation system">
                    Workflow / automation system
                  </option>
                  <option value="Website + Application (Android / iOS">
                    Website + Application (Android/iOS)
                  </option>
                  <option value="Other / not sure yet">
                    Something different / not sure yet
                  </option>
                </select>
              </div>
            </div>

            {/* Budget range */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700"
                htmlFor="budgetRange"
              >
                Budget range (optional)
              </label>
              <select
                id="budgetRange"
                {...register('budgetRange')}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a rough range
                </option>
                <option value="< 1000€">&lt; 1.000€</option>
                <option value="1000–3000€">1.000–3.000€</option>
                <option value="3000–6000€">3.000–6.000€</option>
                <option value="> 6000€ / flexible">
                  &gt; 6.000€ / flexible
                </option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700"
                htmlFor="message"
              >
                Project details
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', {
                  required: 'A short project summary helps me respond quickly',
                  minLength: {
                    value: MIN_MESSAGE_LENGTH,
                    message: 'Please include a few more details',
                  },
                  maxLength: {
                    value: MAX_MESSAGE_LENGTH,
                    message: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters)`,
                  },
                })}
                aria-invalid={!!errors.message || undefined}
                aria-describedby={
                  errors.message ? 'message-error' : 'message-help'
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                placeholder="Example: I run a small business and need a modern website and simple automations (e.g. order tracking, email reminders). Please share what you do, what you need, any deadline, and a rough budget range."
                onChange={(e) => {
                  setMessageValue(e.target.value);
                }}
              />
              {errors.message && (
                <span id="message-error" className="text-xs text-red-600">
                  {errors.message.message}
                </span>
              )}
              <p
                id="message-help"
                className="text-[11px] text-gray-500 flex justify-between gap-2"
              >
                <span>
                  Tip: one–two sentences about your business + what you want
                  built + timeline + budget range helps me reply with a clear
                  plan.
                </span>
                <span className="whitespace-nowrap">
                  {messageValue.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </p>
            </div>

            {/* Honeypot for spam */}
            <div className="hidden" aria-hidden>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register('honeypot')}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center rounded-lg border border-black bg-black px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
              <p className="text-xs text-gray-600">
                I usually reply within 24 hours. For urgent projects, WhatsApp
                is the fastest way to reach me.
              </p>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600" role="alert">
                {errorMessage ||
                  'Unable to send right now. Please try again or email directly.'}
              </p>
            )}
          </motion.form>
        </>
      )}
    </>
  );
}

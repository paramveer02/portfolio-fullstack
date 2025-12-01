import { useRef, useState } from 'react';
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

type FormValues = ContactFormPayload & { honeypot?: string };

interface ContactFormProps {
  onClose?: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const lastSubmissionRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const [status, setStatus] =
    useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
    },
  });

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

    try {
      const result = await submitContactForm(
        {
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company?.trim() || undefined,
          message: values.message.trim(),
        },
        abortRef.current.signal,
      );

      if (result.success) {
        lastSubmissionRef.current = now;
        setStatus('success');
        reset({
          name: '',
          email: '',
          message: '',
          company: '',
          honeypot: '',
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
          {/* Side Contact Options */}
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

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative space-y-4 rounded-2xl border border-black/10 bg-white/70 p-6 text-left shadow-lg backdrop-blur"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-700">
                  Project enquiry
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  Tell me what you need built
                </p>
              </div>
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
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                  placeholder="e.g., John Smith"
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="text-xs text-red-600">
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
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                  placeholder="john@example.com"
                  autoComplete="email"
                  inputMode="email"
                />
                {errors.email && (
                  <span className="text-xs text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

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
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
                placeholder="Example: I run a small business and need a modern website and simple automations (e.g. order tracking, email reminders). Please share what you do, what you need, any deadline, and a rough budget range."
              />
              {errors.message && (
                <span className="text-xs text-red-600">
                  {errors.message.message}
                </span>
              )}
              <p className="text-[11px] text-gray-500">
                Tip: one–two sentences about your business + what you want
                built + timeline + budget range helps me reply with a clear
                plan.
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
                Replies within 24 hours. Your details are never shared.
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

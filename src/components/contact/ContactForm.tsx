import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { submitContactForm, ContactFormPayload } from '../../utils/contactFormService';

const RATE_LIMIT_MS = 30_000;

type FormValues = ContactFormPayload & { honeypot?: string };

export function ContactForm() {
  const lastSubmissionRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
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
    if (values.honeypot) {
      return; // silently drop spam submissions
    }

    const now = Date.now();
    if (now - lastSubmissionRef.current < RATE_LIMIT_MS) {
      setErrorMessage('Please wait a few moments before sending another message.');
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
      await submitContactForm(
        {
          name: values.name,
          email: values.email,
          company: values.company?.trim() || undefined,
          message: values.message,
        },
        abortRef.current.signal,
      );
      lastSubmissionRef.current = now;
      setStatus('success');
      reset({ name: '', email: '', message: '', company: '', honeypot: '' });
    } catch (error) {
      setStatus('error');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong while sending your message.');
      }
    }
  };

  return (
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
          <p className="text-xs uppercase tracking-[0.18em] text-gray-700">Send a message</p>
          <p className="text-lg font-semibold text-gray-900">Let’s build together</p>
        </div>
        {status === 'success' && (
          <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Sent
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Your name is required', minLength: { value: 2, message: 'Name is too short' } })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700" htmlFor="email">
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
            placeholder="you@company.com"
            autoComplete="email"
            inputMode="email"
          />
          {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700" htmlFor="company">
          Company (optional)
        </label>
        <input
          id="company"
          type="text"
          {...register('company')}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
          placeholder="Company or team name"
          autoComplete="organization"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700" htmlFor="message">
          Project Details
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message', {
            required: 'A short project summary helps me respond quickly',
            minLength: { value: 24, message: 'Please include a few more details' },
          })}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-black focus:outline-none"
          placeholder="What are you building, timelines, and any budget constraints?"
        />
        {errors.message && <span className="text-xs text-red-600">{errors.message.message}</span>}
      </div>

      {/* Honeypot for spam */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
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
          {errorMessage || 'Unable to send right now. Please try again or email directly.'}
        </p>
      )}
      {status === 'success' && (
        <p className="text-sm text-green-700" role="status">
          Thanks for reaching out! I’ll reply to you within one business day.
        </p>
      )}
    </motion.form>
  );
}

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Room, RoomHeading } from "../ui/Room";
import { CalendlyBanner } from "../ui/CalendlyCTA";
import { submitContactForm } from "../../utils/contactFormService";

const RATE_LIMIT_MS = 30_000;
const WHATSAPP =
  "https://wa.me/4917643835327?text=Hi%20Paramveer,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.";

type Status = "idle" | "dialing" | "success" | "error";

export function ContactRoom() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [err, setErr] = useState("");
  const lastSent = useRef(0);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.name.trim() || !/[^@\s]+@[^@\s]+\.[^@\s]+/.test(form.email) || form.message.trim().length < 12) {
      setErr("Fill in your name, a valid email, and a short message (12+ chars).");
      setStatus("error");
      return;
    }
    if (Date.now() - lastSent.current < RATE_LIMIT_MS) {
      setErr("Please wait 30 seconds before sending again.");
      setStatus("error");
      return;
    }
    setStatus("dialing");
    setErr("");
    // let the dial-up animation breathe a moment, then send
    await new Promise((r) => setTimeout(r, 1600));
    try {
      const res = await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (!res.success) throw new Error(res.error || "Send failed");
      lastSent.current = Date.now();
      setStatus("success");
      setForm({ name: "", email: "", message: "", honeypot: "" });
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Something went wrong. Email me directly.");
      setStatus("error");
    }
  };

  return (
    <Room id="contact" title="Mail — New Message" maxWidth={860} icon={<span aria-hidden>✉</span>} variant="rise">
      <div style={{ background: "#000", padding: "22px 18px" }}>
        <RoomHeading kicker="> compose new message" title="GET IN TOUCH" />

        <CalendlyBanner />

        <div className="contact-links">
          <a className="w95-button sys-hot" href="mailto:paramvir.marwah@gmail.com" style={{ textDecoration: "none" }}>
            ✉ Email
          </a>
          <a className="w95-button sys-hot" href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            ▸ WhatsApp (fastest)
          </a>
          <a className="w95-button sys-hot" href="https://www.linkedin.com/in/paramveer-marwah/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            in LinkedIn
          </a>
          <a className="w95-button sys-hot" href="https://github.com/paramveer02" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            ⌂ GitHub
          </a>
        </div>

        <form onSubmit={onSubmit} className="mail-form" noValidate>
          <label className="mail-row">
            <span>To:</span>
            <input className="mail-input" value="paramvir.marwah@gmail.com" readOnly tabIndex={-1} />
          </label>
          <label className="mail-row">
            <span>From:</span>
            <input className="mail-input sys-hot" placeholder="your name" value={form.name} onChange={set("name")} autoComplete="name" />
          </label>
          <label className="mail-row">
            <span>Email:</span>
            <input className="mail-input sys-hot" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} autoComplete="email" inputMode="email" />
          </label>
          <label className="mail-row mail-row-msg">
            <span>Message:</span>
            <textarea className="mail-input sys-hot" rows={5} placeholder="Tell me what you want built — what you do, the goal, rough timeline & budget." value={form.message} onChange={set("message")} />
          </label>

          {/* honeypot */}
          <input className="mail-honeypot" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={set("honeypot")} aria-hidden />

          <div className="mail-actions">
            <button type="submit" className="w95-button sys-hot" disabled={status === "dialing"} style={{ fontWeight: 700 }}>
              {status === "dialing" ? "CONNECTING…" : "SEND ▸▸"}
            </button>
            <span className="mail-note">Replies within ~24h. WhatsApp is fastest.</span>
          </div>

          <AnimatePresence>
            {status === "dialing" && (
              <motion.div className="dialup" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <div>ATDT paramvir.marwah@gmail.com</div>
                <div className="dialup-bars" aria-hidden>
                  <span /><span /><span /><span /><span />
                </div>
                <div>CONNECT 56000 — handshaking…</div>
              </motion.div>
            )}
            {status === "success" && (
              <motion.div className="mail-status ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                ✓ TRANSMISSION COMPLETE — message delivered. Talk soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div className="mail-status bad" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                ✗ {err}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </Room>
  );
}

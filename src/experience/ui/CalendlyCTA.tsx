export const CALENDLY_URL = "https://calendly.com/paramvir-marwah/30min";

/** Old-school "book a call" banner: starburst FREE badge, blinking marquee,
 *  big beveled launch button. Opens Calendly in a new tab. */
export function CalendlyBanner() {
  return (
    <div className="cal-banner">
      <div className="cal-starburst" aria-hidden>
        <span>FREE!</span>
      </div>

      <div className="cal-marquee" aria-hidden>
        <div className="cal-marquee-track">
          ★ NOW BOOKING ★ FREE 30-MIN DISCOVERY CALL ★ NO COMMITMENT ★ LET'S BUILD SOMETHING ★ NOW BOOKING ★ FREE 30-MIN DISCOVERY CALL ★ NO COMMITMENT ★ LET'S BUILD SOMETHING ★
        </div>
      </div>

      <div className="cal-body">
        <div className="cal-copy">
          <span className="cal-blink">●</span> Got a project in mind?
          <div className="cal-sub">Book a free 30-minute discovery call — we'll scope it together.</div>
        </div>
        <a
          className="cal-btn sys-hot"
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cal-btn-icon" aria-hidden>📅</span> BOOK A CALL ▸▸
        </a>
      </div>
    </div>
  );
}

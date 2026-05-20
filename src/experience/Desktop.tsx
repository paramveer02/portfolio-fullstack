import { motion } from "framer-motion";
import { Window } from "./ui/Window";
import { DesktopIcon, Glyphs } from "./ui/DesktopIcon";
import { Taskbar } from "./ui/Taskbar";
import { scrollToId } from "./lib/scroll";
import { CALENDLY_URL } from "./ui/CalendlyCTA";

export function Desktop() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Floating desktop icons (left column on desktop) */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 24,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          zIndex: 5,
        }}
        className="sys-icon-col"
      >
        <DesktopIcon label="My_Work" glyph={Glyphs.folder} onActivate={() => scrollToId("projects")} delay={0.2} drift={7} />
        <DesktopIcon label="About.txt" glyph={Glyphs.document} onActivate={() => scrollToId("about")} delay={0.35} drift={5} />
        <DesktopIcon label="Skills" glyph={Glyphs.gear} onActivate={() => scrollToId("skills")} delay={0.5} drift={8} />
        <DesktopIcon label="Mail" glyph={Glyphs.mail} onActivate={() => scrollToId("contact")} delay={0.65} drift={6} />
        <DesktopIcon label="Book_Call" glyph={Glyphs.calendar} href={CALENDLY_URL} delay={0.8} drift={9} />
        <DesktopIcon label="MonPro-AI" glyph={Glyphs.globe} href="https://monpro-ai.com" delay={0.95} drift={7} />
      </div>

      {/* Masthead window */}
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "80px 20px 60px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.15 },
            scale: { duration: 0.6, delay: 0.15, ease: "backOut" },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          }}
          style={{ width: "min(720px, 94vw)" }}
        >
          <Window title="PARAMVIR.SYS" icon={<span style={{ fontSize: 14 }} aria-hidden>▣</span>}>
            <div style={{ background: "#000", padding: "26px 22px", color: "#fff" }}>
              <div
                style={{
                  fontFamily: "var(--font-pixel)",
                  lineHeight: 1.35,
                  letterSpacing: "0.02em",
                  textShadow: "0 0 8px rgba(65,255,119,0.45)",
                  color: "var(--phosphor)",
                  fontSize: "clamp(1.1rem, 4.4vw, 2.6rem)",
                }}
              >
                PARAMVIR
                <br />
                MARWAH
              </div>

              <div
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-term)",
                  fontSize: "clamp(1rem, 2.6vw, 1.4rem)",
                  color: "#bfefff",
                  letterSpacing: "0.12em",
                }}
              >
                SOFTWARE DEVELOPER · AI AUTOMATION CONSULTANT
              </div>

              <div
                style={{
                  marginTop: 18,
                  fontFamily: "var(--font-term)",
                  fontSize: "clamp(1.05rem, 2.4vw, 1.4rem)",
                  color: "#d8d8d8",
                  lineHeight: 1.5,
                }}
              >
                <p style={{ color: "inherit", fontSize: "inherit", lineHeight: "inherit", margin: 0 }}>
                  &gt; Five years building software for founders and small teams.
                </p>
                <p style={{ color: "inherit", fontSize: "inherit", lineHeight: "inherit", margin: "6px 0 0" }}>
                  &gt; Now consulting on AI automation through MonPro-AI.
                </p>
              </div>

              <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 12 }}>
                <button className="w95-button sys-hot" onClick={() => scrollToId("projects")}>
                  VIEW MY WORK ↓
                </button>
                <a
                  className="w95-button cal-btn-inline sys-hot"
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  📅 BOOK A FREE CALL ▸
                </a>
                <a
                  className="w95-button sys-hot"
                  href="https://monpro-ai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  VISIT MONPRO-AI ↗
                </a>
              </div>
            </div>
          </Window>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 56,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-term)",
          fontSize: 20,
          color: "var(--phosphor)",
          textShadow: "0 0 6px rgba(65,255,119,0.5)",
        }}
      >
        ▼ scroll to enter the machine ▼
      </motion.div>

      <Taskbar />
    </div>
  );
}

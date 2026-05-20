import { motion } from "framer-motion";
import { Room, RoomHeading } from "../ui/Room";
import profileImage from "@/assets/profile-image.png";

const BIO = [
  "> whoami",
  "Paramvir Marwah — software developer & AI automation consultant,",
  "based in Leipzig, working across Europe and India.",
  "",
  "> history",
  "Five years building full-stack software for founders and small",
  "teams — shipping the whole thing: frontend, backend, infra.",
  "",
  "> now_running",
  "Consulting on AI automation through MonPro-AI: turning manual,",
  "repetitive workflows into systems that run themselves.",
];

export function AboutRoom() {
  return (
    <Room id="about" title="README.TXT — Notepad" maxWidth={980} icon={<span aria-hidden>▤</span>} variant="flip">
      <div className="about-grid" style={{ background: "#000", padding: "22px 18px" }}>
        {/* Profile in a CRT video monitor */}
        <motion.div
          className="about-photo"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="crt-monitor">
            <div className="crt-screen">
              <img src={profileImage} alt="Paramvir Marwah" draggable={false} />
              <span className="crt-screen-scan" />
              <span className="crt-screen-label">● VIDEO IN — CAM 01</span>
            </div>
          </div>
          <div className="crt-monitor-base" aria-hidden />
        </motion.div>

        {/* README bio */}
        <div className="about-text">
          <RoomHeading kicker="> type README.TXT" title="ABOUT.SYS" />
          <div className="about-readme">
            {BIO.map((line, i) => (
              <motion.div
                key={i}
                className="about-line"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                style={{
                  color: line.startsWith(">") ? "var(--phosphor)" : "#d8d8d8",
                  textShadow: line.startsWith(">") ? "0 0 6px rgba(65,255,119,0.4)" : "none",
                  minHeight: line === "" ? "0.6em" : undefined,
                }}
              >
                {line}
                {i === BIO.length - 1 && <span className="boot-cursor" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Room>
  );
}

import { motion } from "framer-motion";
import { Room, RoomHeading } from "../ui/Room";
import { skills, techIcons } from "../../constants/skillsData";

export function SkillsRoom() {
  return (
    <Room id="skills" title="Control Panel" maxWidth={1000} icon={<span aria-hidden>⚙</span>} variant="right">
      <div style={{ background: "#000", padding: "22px 18px" }}>
        <RoomHeading kicker="> control_panel.exe — system capabilities" title="SKILLS & TOOLS" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
            marginTop: 8,
          }}
        >
          {skills.map((s, i) => {
            const Cat = s.icon;
            return (
              <motion.div
                key={s.id}
                className="skill-applet sys-hot"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <div className="skill-applet-head">
                  <span className="skill-cat-icon" aria-hidden>
                    <Cat />
                  </span>
                  <span className="skill-cat-title">{s.category}</span>
                </div>
                <div className="skill-chips">
                  {s.tech.map((t) => {
                    const Icon = techIcons[t];
                    return (
                      <span className="skill-chip" key={t}>
                        {Icon && <Icon aria-hidden />} {t}
                      </span>
                    );
                  })}
                </div>
                <div className="skill-bar" aria-hidden>
                  <span style={{ width: `${70 + ((i * 7) % 30)}%` }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Room>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Room, RoomHeading } from "../ui/Room";
import { projects } from "../../constants/projectsData";
import { techIcons } from "../../constants/skillsData";

type Project = (typeof projects)[number];

export function ProjectsRoom() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Room id="projects" title="C:\\PROJECTS" maxWidth={1040} icon={<span aria-hidden>▦</span>} variant="left">
      <div style={{ background: "#000", padding: "22px 18px" }}>
        <RoomHeading kicker={`> dir /projects  —  ${projects.length} items found`} title="SELECTED WORK" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 8,
          }}
        >
          {projects.map((p, i) => (
            <motion.button
              key={p.number}
              className="proj-tile sys-hot"
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              aria-label={`Open ${p.title}`}
            >
              <div className="proj-thumb">
                <img src={p.image} alt={p.title} loading="lazy" draggable={false} />
                <span className="proj-scan" />
                <span className="proj-num">{p.number}</span>
              </div>
              <div className="proj-meta">
                <span className="proj-title">{p.title}</span>
                <span className="proj-open">OPEN ▸</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Room>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const images = project.images?.length ? project.images : [project.image];
  const go = (d: number) => setIdx((v) => (v + d + images.length) % images.length);

  return (
    <motion.div
      className="proj-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w95-window proj-modal"
        initial={{ scale: 0.7, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w95-titlebar">
          <span className="w95-title-text">
            {project.number} — {project.title}
          </span>
          <button className="w95-titlebar-btn sys-hot" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="proj-modal-body">
          <div className="proj-gallery">
            <img src={images[idx]} alt={`${project.title} screenshot ${idx + 1}`} draggable={false} />
            {images.length > 1 && (
              <>
                <button className="proj-nav left sys-hot" onClick={() => go(-1)} aria-label="Previous">
                  ◂
                </button>
                <button className="proj-nav right sys-hot" onClick={() => go(1)} aria-label="Next">
                  ▸
                </button>
                <span className="proj-count">
                  {idx + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          <div className="proj-info">
            <p className="proj-desc">{project.description}</p>
            <div className="proj-tech">
              {project.tech.map((t) => {
                const Icon = techIcons[t];
                return (
                  <span className="proj-chip" key={t}>
                    {Icon && <Icon aria-hidden />} {t}
                  </span>
                );
              })}
            </div>
            {project.link && (
              <a
                className="w95-button sys-hot"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "inline-block", marginTop: 6 }}
              >
                LAUNCH LIVE ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

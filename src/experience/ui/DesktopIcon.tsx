import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DesktopIconProps {
  label: string;
  glyph: ReactNode;
  onActivate?: () => void;
  href?: string;
  delay?: number;
  drift?: number;
}

/** A draggable-feeling floating desktop icon (pixel glyph + label). */
export function DesktopIcon({
  label,
  glyph,
  onActivate,
  href,
  delay = 0,
  drift = 6,
}: DesktopIconProps) {
  const content = (
    <motion.span
      className="sys-hot"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: [0, -drift, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration: 4 + drift * 0.2, delay, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: 84,
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      <span
        style={{
          width: 48,
          height: 48,
          display: "grid",
          placeItems: "center",
          filter: "drop-shadow(2px 2px 0 rgba(0,0,0,0.6))",
        }}
      >
        {glyph}
      </span>
      <span
        style={{
          fontFamily: "var(--font-chrome)",
          fontSize: 16,
          color: "#fff",
          background: "rgba(0,0,40,0.35)",
          padding: "1px 5px",
          textShadow: "1px 1px 0 #000",
          lineHeight: 1.1,
        }}
      >
        {label}
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {content}
      </a>
    );
  }
  return (
    <button
      onClick={onActivate}
      aria-label={label}
      style={{ background: "none", border: "none", padding: 0 }}
    >
      {content}
    </button>
  );
}

/* ---- pixel glyphs (blocky inline SVG) ---- */
const stroke = { stroke: "#000", strokeWidth: 1 };

export const Glyphs = {
  folder: (
    <svg width="44" height="44" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <path d="M1 4h5l1 1h8v8H1z" fill="#ffd34d" {...stroke} />
      <path d="M1 4h5l1 1H1z" fill="#e0a800" {...stroke} />
    </svg>
  ),
  document: (
    <svg width="44" height="44" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <path d="M3 1h7l3 3v11H3z" fill="#fff" {...stroke} />
      <path d="M10 1v3h3" fill="#cfcfcf" {...stroke} />
      <path d="M5 6h6M5 8h6M5 10h4" stroke="#1084d0" strokeWidth="1" />
    </svg>
  ),
  gear: (
    <svg width="44" height="44" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="6" y="1" width="4" height="14" fill="#c0c0c0" {...stroke} />
      <rect x="1" y="6" width="14" height="4" fill="#c0c0c0" {...stroke} />
      <circle cx="8" cy="8" r="3" fill="#808080" {...stroke} />
      <circle cx="8" cy="8" r="1.4" fill="#fff" />
    </svg>
  ),
  mail: (
    <svg width="44" height="44" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="1" y="3" width="14" height="10" fill="#fff" {...stroke} />
      <path d="M1 3l7 5 7-5" fill="none" stroke="#1084d0" strokeWidth="1" />
    </svg>
  ),
  globe: (
    <svg width="44" height="44" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <circle cx="8" cy="8" r="7" fill="#1084d0" {...stroke} />
      <path d="M1 8h14M8 1v14M3 4c3 2 7 2 10 0M3 12c3-2 7-2 10 0" stroke="#bfefff" strokeWidth="0.8" fill="none" />
    </svg>
  ),
  calendar: (
    <svg width="44" height="44" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="1" y="2" width="14" height="13" fill="#fff" {...stroke} />
      <rect x="1" y="2" width="14" height="4" fill="#d11" {...stroke} />
      <rect x="4" y="1" width="2" height="3" fill="#333" />
      <rect x="10" y="1" width="2" height="3" fill="#333" />
      <path d="M3 8h2v2H3zM7 8h2v2H7zM11 8h2v2h-2zM3 11h2v2H3zM7 11h2v2H7z" fill="#1084d0" />
    </svg>
  ),
};

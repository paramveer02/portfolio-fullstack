import { useEffect, useState } from "react";

export function Taskbar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 36,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4px",
        background: "var(--w95-face)",
        borderTop: "2px solid var(--w95-hilite)",
        fontFamily: "var(--font-chrome)",
      }}
    >
      <button className="w95-button sys-hot" style={{ fontWeight: 700, display: "flex", gap: 6 }}>
        <span aria-hidden style={{ letterSpacing: "-2px" }}>▢▤</span> Start
      </button>
      <div
        className="w95-inset"
        style={{
          background: "var(--w95-face)",
          borderColor: "var(--w95-shadow) var(--w95-hilite) var(--w95-hilite) var(--w95-shadow)",
          padding: "2px 12px",
          fontSize: 17,
          color: "#000",
        }}
      >
        {time}
      </div>
    </div>
  );
}

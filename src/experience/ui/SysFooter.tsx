export function SysFooter() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        padding: "26px 18px 64px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="w95-window"
        style={{ width: "min(900px, 94vw)", fontFamily: "var(--font-term)" }}
      >
        <div className="w95-titlebar">
          <span className="w95-title-text">C:\SYSTEM\about.nfo</span>
        </div>
        <div
          style={{
            background: "#000",
            color: "#bfefff",
            padding: "16px 18px",
            fontSize: 18,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "var(--phosphor)" }}>
            PARAMVIR.SYS — Paramvir Marwah · Software Developer · Leipzig
          </span>
          <span style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a className="sys-hot" style={{ color: "#bfefff" }} href="https://monpro-ai.com" target="_blank" rel="noopener noreferrer">
              MonPro-AI ↗
            </a>
            <a className="sys-hot" style={{ color: "#bfefff" }} href="https://www.linkedin.com/in/paramveer-marwah/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="sys-hot" style={{ color: "#bfefff" }} href="https://github.com/paramveer02" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </span>
          <span style={{ width: "100%", opacity: 0.6, fontSize: 15 }}>© 2026 Paramvir Marwah — all systems nominal.</span>
        </div>
      </div>
    </footer>
  );
}

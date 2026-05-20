import { ReactNode } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
}

/** Reusable Win95 window chrome (title bar + bevelled body). */
export function Window({
  title,
  children,
  className = "",
  style,
  active = true,
  onClose,
  icon,
}: WindowProps) {
  return (
    <div className={`w95-window ${className}`} style={style}>
      <div className={`w95-titlebar ${active ? "" : "inactive"}`}>
        {icon && <span aria-hidden>{icon}</span>}
        <span className="w95-title-text">{title}</span>
        <button className="w95-titlebar-btn" aria-label="Minimize" tabIndex={-1}>_</button>
        <button className="w95-titlebar-btn" aria-label="Maximize" tabIndex={-1}>□</button>
        <button
          className="w95-titlebar-btn"
          aria-label="Close"
          onClick={onClose}
          tabIndex={onClose ? 0 : -1}
        >
          ×
        </button>
      </div>
      <div style={{ padding: "12px" }}>{children}</div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

const LINES = [
  "PARAMVIR.SYS BIOS v2.6.26",
  "Copyright (C) 1996-2026 Marwah Systems",
  "",
  "CPU: Creative Cortex @ 900 THz ......... OK",
  "Detecting drives ....................... OK",
  "Loading kernel: developer.exe .......... OK",
  "Loading module: ai-automation.dll ...... OK",
  "Mounting /portfolio .................... OK",
  "",
];

export function Boot({
  onDone,
  reducedMotion,
}: {
  onDone: () => void;
  reducedMotion: boolean;
}) {
  const [shown, setShown] = useState(reducedMotion ? LINES.length : 0);
  const [mem, setMem] = useState(reducedMotion ? 65536 : 0);
  const [flash, setFlash] = useState(false);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setFlash(true);
    setTimeout(onDone, reducedMotion ? 0 : 320);
  };

  useEffect(() => {
    if (reducedMotion) {
      finish();
      return;
    }
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), 180 + i * 230));
    });
    const memStart = 180 + LINES.length * 230;
    let m = 0;
    const memTimer = window.setInterval(() => {
      m += 4096;
      setMem(Math.min(m, 65536));
      if (m >= 65536) window.clearInterval(memTimer);
    }, 28);
    const doneTimer = window.setTimeout(finish, memStart + 700);
    timers.push(memTimer, doneTimer);

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(memTimer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="boot-screen" role="status" aria-label="System booting">
        {LINES.slice(0, shown).map((l, i) => (
          <div className="boot-line" key={i}>
            {l}
          </div>
        ))}
        {shown >= LINES.length && (
          <>
            <div className="boot-line">Memory Test: {mem} KB OK</div>
            <div className="boot-line boot-cursor">
              {mem >= 65536 ? "Starting PARAMVIR.SYS " : ""}
            </div>
          </>
        )}
        {!reducedMotion && (
          <div style={{ position: "absolute", bottom: "4vh", right: "8vw", opacity: 0.5, fontSize: 18 }}>
            press any key to skip
          </div>
        )}
      </div>
      {flash && <div className="crt-power" />}
    </>
  );
}

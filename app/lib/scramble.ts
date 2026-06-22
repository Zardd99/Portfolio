const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>*·—!?";

type RafEl = HTMLElement & { __sraf?: number };

export function scrambleText(el: HTMLElement, finalText: string, duration = 640) {
  const node = el as RafEl;
  if (node.__sraf) cancelAnimationFrame(node.__sraf);

  const start = performance.now();
  const keep = new Set([" ", "·", "/", ".", "'", "—", "&"]);

  const tick = () => {
    const progress = Math.min((performance.now() - start) / duration, 1);
    const revealed = Math.floor(progress * finalText.length);
    let out = "";
    for (let i = 0; i < finalText.length; i++) {
      const ch = finalText[i];
      out +=
        i < revealed || keep.has(ch)
          ? ch
          : CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = out;
    if (progress < 1) {
      node.__sraf = requestAnimationFrame(tick);
    } else {
      el.textContent = finalText;
      node.__sraf = undefined;
    }
  };

  node.__sraf = requestAnimationFrame(tick);
}

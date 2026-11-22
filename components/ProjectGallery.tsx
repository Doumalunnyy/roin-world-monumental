"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties,
  type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { publicUrl } from "@/lib/urls";
import { cycleMs, reducedMotionQuery } from "@/lib/motion";
import { Photo } from "./Media";
import { Icon } from "./Icons";
import "./project-gallery.css";

type Frame = { image: string; caption: string };
type GalleryProps = {
  frames: Frame[];
  title: string;
  openLabel: string;
  prev: string;
  next: string;
  close: string;
  rtl: boolean;
};
type Direction = -1 | 1;
type Gesture = { id: number; x: number; y: number; dragging: boolean };

function observeMotion(update: () => void) {
  const query = matchMedia(reducedMotionQuery);
  query.addEventListener("change", update);
  document.addEventListener("visibilitychange", update);
  return () => {
    query.removeEventListener("change", update);
    document.removeEventListener("visibilitychange", update);
  };
}
const canPlay = () => !document.hidden && !matchMedia(reducedMotionQuery).matches;
const staticMode = () => false;
const wrap = (position: number, count: number) => (position % count + count) % count;

export function ProjectGallery({ frames, title, openLabel, prev, next, close, rtl }: GalleryProps) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const lastSwipe = useRef(0);
  const request = useRef(0);
  const [position, setPosition] = useState({ cursor: 0, previous: 0 });
  const [inView, setInView] = useState(false);
  const [visited, setVisited] = useState(false);
  const [opened, setOpened] = useState(false);
  const [preview, setPreview] = useState("");
  const [touching, setTouching] = useState(false);
  const motion = useSyncExternalStore(observeMotion, canPlay, staticMode);
  const count = frames.length;
  const active = count ? wrap(position.cursor, count) : 0;
  const selected = frames[active];
  const running = count > 1 && motion && inView && !opened && !touching;

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisited(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= .15;
      setInView(visible);
      if (visible) setVisited(true);
    }, { threshold: [0, .15] });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const step = useCallback(async (direction: Direction, auto?: AbortSignal) => {
    if (count < 2) return;
    const id = ++request.current;
    const photo = track.current?.querySelector<HTMLImageElement>(`[data-slot="${direction}"] img`);
    // The neighbour and the centre use the same responsive source. Wait for its
    // pixels so a slow image never sweeps an empty panel into the reading area.
    if (photo) {
      try { await photo.decode(); } catch { /* Photo supplies the missing-media state. */ }
    }
    if (request.current !== id || auto?.aborted || (auto && !canPlay())) return;
    if (dialog.current?.open) setPreview(photo?.currentSrc || "");
    setPosition(p => ({ cursor: p.cursor + direction, previous: p.cursor }));
  }, [count]);

  useEffect(() => {
    if (!running) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => void step(1, controller.signal), cycleMs);
    return () => { controller.abort(); clearTimeout(timer); };
  }, [running, position.cursor, step]);

  if (!selected) return null;

  function open(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
    event.preventDefault();
    ++request.current;
    setPreview(track.current?.querySelector<HTMLImageElement>('[data-slot="0"] img')?.currentSrc || "");
    setOpened(true);
    dialog.current.showModal();
  }
  function onKeyDown(event: KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || count < 2) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    if (!event.repeat) void step((event.key === "ArrowRight") !== rtl ? 1 : -1);
  }
  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || count < 2) return;
    if (event.pointerType !== "mouse") setTouching(true);
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: false };
  }
  function moveSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.dragging) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 9) return;
      if (Math.abs(dy) > Math.abs(dx)) { gesture.current = null; setTouching(false); return; }
      event.currentTarget.setPointerCapture(start.id);
      event.currentTarget.dataset.dragging = "";
      start.dragging = true;
    }
    const limit = event.currentTarget.clientWidth * .37;
    event.currentTarget.style.setProperty("--drag-x", Math.max(-limit, Math.min(limit, dx)) + "px");
  }
  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    // Touch transfers its implicit capture from the link to the draggable strip.
    if (event.type === "lostpointercapture" && event.target !== event.currentTarget) return;
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    setTouching(false);
    if (!start.dragging) return;
    delete event.currentTarget.dataset.dragging;
    event.currentTarget.style.removeProperty("--drag-x");
    lastSwipe.current = performance.now();
    const dx = event.clientX - start.x;
    const threshold = Math.min(70, Math.max(30, event.currentTarget.clientWidth * .1));
    if (event.type === "pointerup" && Math.abs(dx) >= threshold) void step((dx < 0) !== rtl ? 1 : -1);
  }
  const swipe = {
    onPointerDown: startSwipe, onPointerMove: moveSwipe, onPointerUp: finishSwipe,
    onPointerCancel: finishSwipe, onLostPointerCapture: finishSwipe,
    onDragStart: (event: MouseEvent) => event.preventDefault(),
    onClickCapture: (event: MouseEvent) => {
      if (event.detail && lastSwipe.current && performance.now() - lastSwipe.current < 480) {
        event.preventDefault(); event.stopPropagation();
      }
    },
  };
  const size = count === 1 ? "(max-width:760px) 92vw, (max-width:1540px) 89vw, 1380px"
    : "(max-width:760px) 74vw, (max-width:1540px) 68vw, 1050px";
  const controls = <>
    <button type="button" aria-label={prev} onClick={() => void step(-1)}><Icon name="left" /></button>
    <button type="button" aria-label={next} onClick={() => void step(1)}><Icon name="right" /></button>
  </>;
  const counter = <bdi dir="ltr" className="cg-count">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</bdi>;

  return <div className="cinematic-gallery" data-single={count === 1 || undefined} onKeyDown={onKeyDown}>
    <figure className="cg-overview">
      <div className="cg-strip" ref={track} {...swipe}>
        {(count > 1 ? [-2, -1, 0, 1, 2] : [0]).map(slot => {
          const key = position.cursor + slot;
          const offset = slot * (rtl ? -1 : 1);
          const frame = frames[wrap(key, count)];
          // Keep the retiring side image until its panel has cleared the edge.
          const mount = slot === 0 || (visited && (Math.abs(slot) <= 1 || Math.abs(key - position.previous) <= 1));
          return <div key={key} className="cg-plate" aria-hidden="true" data-slot={slot}
            style={{ "--offset": offset, "--image-position": offset < 0 ? "right" : offset > 0 ? "left" : "center" } as CSSProperties}>
            {mount && <Photo src={frame.image} alt="" sizes={size} />}
          </div>;
        })}
        <a className="cg-open" ref={opener} href={publicUrl(selected.image)}
          aria-label={openLabel + " · " + (selected.caption || title)} onClick={open}>
          <span className="cg-zoom"><Icon name="plus" size={19} /></span>
        </a>
      </div>
      <figcaption className="cg-meta">
        <span className="cg-caption" aria-live={running ? "off" : "polite"} aria-atomic="true">
          {frames.map((f, i) => <span key={f.image} aria-hidden={i !== active}>{f.caption}</span>)}
        </span>
        {count > 1 && <span className="cg-controls">
          {counter}
          {controls}
        </span>}
      </figcaption>
    </figure>
    {count > 1 && <noscript><ul>{frames.map(f => <li key={f.image}><a href={publicUrl(f.image)}>{f.caption || title}</a></li>)}</ul></noscript>}
    <dialog className="field-viewer cg-viewer" ref={dialog} aria-label={title}
      onClose={() => { ++request.current; setOpened(false); opener.current?.focus({ preventScroll: true }); }}
      onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className="field-viewer-inner">
        <div className="viewer-top">
          <span>{title}</span>
          <button type="button" aria-label={close} onClick={() => dialog.current?.close()}><Icon name="close"/></button>
        </div>
        {opened && <div className="viewer-image" {...swipe}
          style={preview ? { backgroundImage: `url(${JSON.stringify(preview)})` } : undefined}>
          <Photo key={selected.image} src={selected.image} alt={selected.caption} sizes="100vw" priority />
        </div>}
        <div className="viewer-bottom">
          <p aria-live="polite">{selected.caption}</p>
          {count > 1 && <div className="cg-controls">{counter}{controls}</div>}
        </div>
      </div>
    </dialog>
  </div>;
}

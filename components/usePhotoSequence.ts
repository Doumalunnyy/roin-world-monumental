"use client";

import { useEffect, useReducer, useState, useSyncExternalStore } from "react";

const HOLD_MS = 8000;
const FADE_MS = 1100;
type Request = { index: number; manual: boolean };
type Sequence = {
  active: number;
  previous: number | null;
  pending: Request | null;
  ready: number[];
  failed: number[];
  moves: number;
};
type Event =
  | { type: "request"; index: number; manual: boolean }
  | { type: "ready"; index: number; autoplayAllowed: boolean }
  | { type: "failed"; index: number; count: number }
  | { type: "settle" };

function show(state: Sequence, index: number): Sequence {
  if (index === state.active) return { ...state, pending: null };
  return { ...state, previous: state.active, active: index, pending: null, moves: state.moves + 1 };
}

function update(state: Sequence, event: Event): Sequence {
  if (event.type === "settle") return { ...state, previous: null };
  if (event.type === "request") {
    if (state.failed.includes(event.index)) return state;
    return state.ready.includes(event.index)
      ? show(state, event.index)
      : { ...state, pending: { index: event.index, manual: event.manual } };
  }
  if (event.type === "ready") {
    const ready = state.ready.includes(event.index) ? state : { ...state, ready: [...state.ready, event.index] };
    if (state.pending?.index !== event.index) return ready;
    return state.pending.manual || event.autoplayAllowed
      ? show(ready, event.index)
      : { ...ready, pending: null };
  }
  const failed = [...new Set([...state.failed, event.index])];
  const next = Array.from({ length: event.count }, (_, i) => i).find(i => !failed.includes(i));
  const result = { ...state, pending: null, failed };
  if (state.active !== event.index || next === undefined) return result;
  return state.ready.includes(next) ? show(result, next) : { ...result, pending: { index: next, manual: true } };
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(update: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}
function subscribeVisibility(update: () => void) {
  document.addEventListener("visibilitychange", update);
  return () => document.removeEventListener("visibilitychange", update);
}
const reducedMotion = () => window.matchMedia(motionQuery).matches;
const visibleDocument = () => !document.hidden;
const serverFalse = () => false;

export function usePhotoSequence<T extends HTMLElement>(count: number, holdFirst = false) {
  const [section, attach] = useState<T | null>(null);
  const [state, dispatch] = useReducer(update, { active: 0, previous: null, pending: null, ready: [], failed: [], moves: 0 });
  const [onscreen, setOnscreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [buffer, setBuffer] = useState<number | null>(null);
  const reduced = useSyncExternalStore(subscribeMotion, reducedMotion, serverFalse);
  const visible = useSyncExternalStore(subscribeVisibility, visibleDocument, serverFalse);
  const running = count - state.failed.length > 1 && onscreen && visible && !paused && !reduced && !hovered && !focused;
  const candidates = Array.from({ length: count }, (_, n) => (state.active + 1 + n) % count);
  const next = candidates.find(index => index !== state.active && !state.failed.includes(index));
  const activeReady = state.ready.includes(state.active);

  function step(direction: 1 | -1) {
    const origin = state.pending?.manual ? state.pending.index : state.active;
    for (let offset = 1; offset < count; offset++) {
      const index = (origin + count + direction * offset) % count;
      if (!state.failed.includes(index)) {
        dispatch({ type: "request", index, manual: true });
        break;
      }
    }
  }

  function onKeyDown(event: React.KeyboardEvent<T>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target !== event.currentTarget) return;
    if (event.key === " ") {
      event.preventDefault();
      if (!event.repeat && !reduced) setPaused(value => !value);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
      step((event.key === "ArrowRight") !== rtl ? 1 : -1);
    }
  }

  useEffect(() => {
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setOnscreen(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => setOnscreen(entry.isIntersecting && entry.intersectionRatio >= 0.05), { threshold: 0.05 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [section]);

  useEffect(() => {
    if (!running || next === undefined || !activeReady || (holdFirst && state.moves === 0)) return;
    // Delay the next download until the current frame has had time to paint.
    const loadNext = window.setTimeout(() => setBuffer(next), HOLD_MS / 2);
    const advance = window.setTimeout(() => {
      if (!document.hidden && !reducedMotion()) dispatch({ type: "request", index: next, manual: false });
    }, HOLD_MS);
    return () => { clearTimeout(loadNext); clearTimeout(advance); };
  }, [running, next, state.active, state.moves, activeReady, holdFirst]);

  useEffect(() => {
    if (state.previous === null) return;
    const timer = window.setTimeout(() => dispatch({ type: "settle" }), FADE_MS + 100);
    return () => clearTimeout(timer);
  }, [state.previous, state.moves]);

  return {
    attach, state, running, reduced, paused,
    step, onKeyDown,
    ready: (index: number) => dispatch({ type: "ready", index, autoplayAllowed: running && !document.hidden && !reducedMotion() }),
    failed: (index: number) => dispatch({ type: "failed", index, count }),
    mounted: new Set([...state.ready, state.active, state.previous, state.pending?.index, buffer]),
    interaction: {
      onPointerEnter: (event: React.PointerEvent<T>) => setHovered(event.pointerType === "mouse"),
      onPointerLeave: () => setHovered(false),
      onFocusCapture: (event: React.FocusEvent<T>) => setFocused(event.target.matches(":focus-visible") && event.target.matches("a, button")),
      onBlurCapture: (event: React.FocusEvent<T>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      },
    },
  };
}

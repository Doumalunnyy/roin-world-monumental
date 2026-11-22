"use client";

import { useRef, useState, type MouseEvent } from "react";
import { publicUrl } from "@/lib/urls";
import { Photo } from "./Media";
import { Icon } from "./Icons";

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

export function ProjectGallery({ frames, title, openLabel, prev, next, close, rtl }: GalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const selected = frames[index];
  if (!selected) return null;

  function open(event: MouseEvent<HTMLAnchorElement>, chosen: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
    event.preventDefault();
    setIndex(chosen);
    setOpened(true);
    dialog.current.showModal();
  }
  function step(direction: number) {
    setIndex(current => (current + direction + frames.length) % frames.length);
  }

  return <>
    <div className="field-gallery field-plate" data-count={frames.length}>
      {frames.map((frame, i) => <figure key={frame.image}>
        <a href={publicUrl(frame.image)} className="field-large"
          aria-label={openLabel + " · " + (frame.caption || title)} onClick={event => open(event, i)}>
          <Photo src={frame.image} alt="" sizes={i === 0
            ? "(max-width:760px) 92vw, 75vw" : "(max-width:760px) 92vw, 50vw"}/>
          <span className="field-zoom"><Icon name="plus" size={21}/></span>
        </a>
        {frame.caption && <figcaption>{frame.caption}</figcaption>}
      </figure>)}
    </div>
    <dialog className="field-viewer" ref={dialog} aria-label={title} onClose={() => setOpened(false)}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={event => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        step((event.key === "ArrowRight") !== rtl ? 1 : -1);
      }}>
      <div className="field-viewer-inner">
        <div className="viewer-top">
          <span>{title}</span>
          <button type="button" aria-label={close} onClick={() => dialog.current?.close()}><Icon name="close"/></button>
        </div>
        {opened && <div className="viewer-image">
          <Photo key={selected.image} src={selected.image} alt={selected.caption} sizes="100vw" priority/>
        </div>}
        <div className="viewer-bottom">
          <p aria-live="polite">{selected.caption}</p>
          <div className="viewer-pager">
            {frames.length > 1 && <button aria-label={prev} type="button" onClick={() => step(-1)}>
              <Icon name={rtl ? "right" : "left"}/>
            </button>}
            <bdi>{index + 1} / {frames.length}</bdi>
            {frames.length > 1 && <button aria-label={next} type="button" onClick={() => step(1)}>
              <Icon name={rtl ? "left" : "right"}/>
            </button>}
          </div>
        </div>
      </div>
    </dialog>
  </>;
}

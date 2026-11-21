"use client";

import { useRef, useState } from "react";
import { publicUrl } from "@/lib/urls";
import { Photo } from "./Media";
import { Icon } from "./Icons";

type Frame = { image: string; caption: string };

export function ProjectGallery({
  frames,
  title,
  openLabel,
  prev,
  next,
  close,
  rtl,
}: {
  frames: Frame[];
  title: string;
  openLabel: string;
  prev: string;
  next: string;
  close: string;
  rtl: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const frame = frames[index];
  if (!frame) return null;
  const step = (direction: number) =>
    setIndex((i) => (i + direction + frames.length) % frames.length);
  return (
    <>
      <div className="field-gallery field-plate">
        <figure>
          <a className="field-large" href={publicUrl(frame.image)} aria-label={openLabel + " · " + (frame.caption || title)}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
              event.preventDefault();
              setOpened(true);
              dialog.current.showModal();
            }}>
            <Photo key={frame.image} src={frame.image} alt={frame.caption} sizes="(max-width:760px) 91vw,72vw" />
            <span className="field-zoom"><Icon name="plus" /></span>
          </a>
          <figcaption aria-live="polite">{frame.caption || title}</figcaption>
        </figure>
        {frames.length > 1 && <div className="field-contact-sheet" role="group" aria-label={title}>
          {frames.map((f,i)=><a key={f.image} href={publicUrl(f.image)}
            aria-label={String(i+1).padStart(2,"0") + " · " + (f.caption || title)}
            aria-current={i === index ? "true" : undefined}
            onClick={(event)=>{
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              setIndex(i);
            }}>
            <span className="field-thumb"><Photo src={f.image} alt="" sizes="(max-width:760px) 20vw,110px"/></span>
            <bdi>{String(i+1).padStart(2,"0")}</bdi>
          </a>)}
        </div>}
      </div>
      <dialog
        className="field-viewer"
        ref={dialog}
        aria-label={title}
        onClose={() => setOpened(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            step((e.key === "ArrowRight") !== rtl ? 1 : -1);
          }
        }}
      >
        <div className="field-viewer-inner">
          <div className="viewer-top">
            <span>{title}</span>
            <button
              type="button"
              aria-label={close}
              onClick={() => dialog.current?.close()}
            >
              <Icon name="close" />
            </button>
          </div>
          {opened && (
            <div className="viewer-image">
              <Photo
                key={frame.image}
                src={frame.image}
                alt={frame.caption}
                sizes="95vw"
              />
            </div>
          )}
          <div className="viewer-bottom">
            <p aria-live="polite">{frame.caption}</p>
            <div className="viewer-pager">
              {frames.length > 1 && (
                <button
                  aria-label={prev}
                  type="button"
                  onClick={() => step(-1)}
                >
                  <Icon name="left" />
                </button>
              )}
              <bdi>
                {index + 1} / {frames.length}
              </bdi>
              {frames.length > 1 && (
                <button aria-label={next} type="button" onClick={() => step(1)}>
                  <Icon name="right" />
                </button>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

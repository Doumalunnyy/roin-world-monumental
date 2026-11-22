"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "./Icons";
import { publicUrl } from "@/lib/urls";

const staticPhotos: Partial<Record<string, number[]>> = JSON.parse(process.env.NEXT_PUBLIC_STATIC_PHOTOS || "{}");

export function Photo({
  src,
  alt,
  className = "",
  sizes = "(max-width: 700px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState("");
  if (failed === src || !src)
    return (
      <span
        className={"media-missing " + className}
        role="img"
        aria-label={alt}
      >
        <Icon name="layers" size={40} />
      </span>
    );
  const widths = staticPhotos[src];
  if (widths?.length) {
    const file = src.slice("/images/".length);
    const srcSet = widths.map((width, i) => {
      const url = i === widths.length - 1 ? src : `/media/${width}/${file}`;
      return publicUrl(url) + " " + width + "w";
    }).join(", ");
    // eslint-disable-next-line @next/next/no-img-element -- GitHub Pages serves prebuilt responsive files without a Next image server.
    return <img className={"photo static-photo " + className} alt={alt} src={publicUrl(src)}
      sizes={sizes} srcSet={srcSet} loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"} decoding="async" onError={() => setFailed(src)} />;
  }
  return (
    <Image
      src={publicUrl(src)}
      alt={alt}
      fill
      sizes={sizes}
      className={"photo " + className}
      priority={priority}
      unoptimized={!src.startsWith("/")}
      onError={() => setFailed(src)}
    />
  );
}
function playerUrl(raw: string) {
  try {
    const u = new URL(raw, "https://local.invalid");
    if (
      [
        "youtube.com",
        "www.youtube.com",
        "youtu.be",
        "www.youtube-nocookie.com",
      ].includes(u.hostname)
    ) {
      const id =
        u.hostname === "youtu.be"
          ? u.pathname.slice(1)
          : u.searchParams.get("v") || u.pathname.split("/").pop();
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id))
        return "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1";
    }
    if (["vimeo.com", "player.vimeo.com"].includes(u.hostname)) {
      const id = u.pathname.split("/").pop();
      if (id && /^\d+$/.test(id))
        return "https://player.vimeo.com/video/" + id + "?autoplay=1";
    }
  } catch {}
  return "";
}
export function MediaButton({
  url,
  title,
  playLabel,
  closeLabel,
  externalLabel,
  poster,
}: {
  url: string;
  title: string;
  playLabel: string;
  closeLabel: string;
  externalLabel: string;
  poster?: string;
}) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(false);
  const embedded = playerUrl(url);
  return (
    <>
      <a
        className="film-trigger"
        href={publicUrl(url)}
        onClick={(e) => {
          if (!dlg.current?.showModal) return;
          e.preventDefault();
          setActive(true);
          dlg.current.showModal();
        }}
      >
        <span className="play-ring">
          <Icon name="play" size={14} />
        </span>
        {playLabel}
      </a>
      <dialog
        className="film-dialog"
        aria-label={title}
        ref={dlg}
        onClose={() => setActive(false)}
        onClick={(e) => {
          if (e.target === dlg.current) dlg.current.close();
        }}
      >
        <div className="film-head">
          <strong>{title}</strong>
          <button
            className="circle"
            onClick={() => dlg.current?.close()}
            aria-label={closeLabel}
          >
            <Icon name="close" />
          </button>
        </div>
        {active && (
          <>
            {embedded ? (
              <iframe
                title={title}
                src={embedded}
                allow="autoplay; fullscreen; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : /\.(mp4|webm)(\?|$)/i.test(url) ? (
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={poster ? publicUrl(poster) : undefined}
                src={publicUrl(url)}
              />
            ) : null}
            <a
              className="player-source"
              href={publicUrl(url)}
              target="_blank"
              rel="noreferrer"
            >
              {externalLabel}
              <Icon name="diagonal" size={15} />
            </a>
          </>
        )}
      </dialog>
    </>
  );
}

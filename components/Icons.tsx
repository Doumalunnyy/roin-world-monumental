import Image from "next/image";
import { publicUrl } from "@/lib/urls";
import type { CSSProperties } from "react";
type SymbolName =
  | "arrow"
  | "diagonal"
  | "down"
  | "chevron"
  | "left"
  | "right"
  | "menu"
  | "close"
  | "play"
  | "globe"
  | "pin"
  | "layers"
  | "mail"
  | "file"
  | "plus";
const strokes: Record<SymbolName, React.ReactNode> = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  diagonal: <path d="M6 18 18 6M6 6h12v12" />,
  down: <path d="M12 4v16m-6-6 6 6 6-6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  left: <path d="m15 5-7 7 7 7" />,
  right: <path d="m9 5 7 7-7 7" />,
  menu: (
    <>
      <path d="M3 8h18M3 16h18" />
    </>
  ),
  close: <path d="m5 5 14 14M5 19 19 5" />,
  play: <path fill="currentColor" stroke="none" d="m8 4 12 8-12 8z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.8" />
    </>
  ),
  layers: (
    <path d="m12 2 10 5.5L12 13 2 7.5 12 2Zm-9 10L12 17l9-5m-18 5 9 5 9-5" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  file: <path d="M5 2h10l4 4v16H5z M14 2v6h5M8 13h8m-8 4h6" />,
  plus: <path d="M4 12h16M12 4v16" />,
};
export function Icon({
  name,
  size = 20,
  style,
}: {
  name: SymbolName;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={"icon icon-" + name}
    >
      {strokes[name]}
    </svg>
  );
}
export function Wordmark({ surface = "dark" }: { surface?: "dark" | "light" }) {
  return (
    <span
      className="wordmark"
      dir="ltr"
      style={surface === "light" ? { backgroundColor: "#111111", padding: "3px 9px" } : undefined}
    >
      <Image
        src={publicUrl("/brand/roin-world.svg")}
        alt="ROIN WORLD"
        width={149}
        height={61}
        unoptimized
        style={{ display: "block", width: "clamp(112px, 11vw, 149px)", height: "auto" }}
      />
    </span>
  );
}

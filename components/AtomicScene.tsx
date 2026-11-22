import { publicUrl } from "@/lib/urls";

function Lines({ paths }: { paths: string[] }) {
  return paths.map((d) => <path key={d} d={d} pathLength="1" />);
}

// A drafting elevation: primary silhouettes, then the lighter structural members.
function CoolingTower({ transform }: { transform: string }) {
  return <g transform={transform}>
    <Lines paths={[
      "M0 131 C13 107 23 67 22 40 C22 27 20 12 19 4 Q52 -1 85 4 C83 22 81 34 82 49 C83 76 92 110 104 131 Z",
      "M19 4 Q52 10 85 4 M19.5 8 Q52 14 84.5 8",
      "M0 131 V135 H104 V131 M-3 151 H107",
    ]} />
    <g className="plant-detail"><Lines paths={[
      "M16 130 C26 98 31 67 29 43 M88 130 C77 96 72 63 75 43",
      "M4 135 L9 150 L15 135 L21 150 L27 135 L33 150 L39 135 L45 150 L51 135 L57 150 L63 135 L69 150 L75 135 L81 150 L87 135 L93 150 L99 135",
    ]} /></g>
  </g>;
}

function Crane({ transform }: { transform: string }) {
  return <g transform={transform}>
    <Lines paths={[
      "M-4 151 V36 H3 V151 M-40 31 L-40 24 L127 28 L129 31 Z",
      "M-37 24 L-1 3 L92 27 M-1 3 V23 M-47 23 H-34 V35 H-47 Z",
      "M-7 31 V39 H7 V33 H13 V27 H6 M91 32 V75 Q91 79 95 77",
    ]} />
    <g className="plant-detail"><Lines paths={[
      "M-4 147 L3 139 L-4 131 L3 123 L-4 115 L3 107 L-4 99 L3 91 L-4 83 L3 75 L-4 67 L3 59 L-4 51 L3 43 L-4 37",
      "M-33 25 L-26 31 L-19 25 L-12 31 L-5 25 L2 31 L9 25 L16 31 L23 25 L30 31 L37 26 L44 31 L51 26 L58 31 L65 27 L72 31 L79 27 L86 31 L93 27 L100 31 L107 28 L114 31",
      "M87 32 V69 H91",
    ]} /></g>
  </g>;
}

function Containment({ transform }: { transform: string }) {
  return <g transform={transform}>
    <Lines paths={[
      "M0 72 V35 H2 C4 15 17 3 36 1 C55 3 68 15 70 35 H72 V72",
      "M-2 35 H74 V39 H-2 Z M31 2 V-2 H41 V2",
    ]} />
    <g className="plant-detail"><Lines paths={[
      "M8 70 V42 M18 70 V42 M56 70 V42 M66 70 V42 M12 35 Q16 12 34 4 M63 35 Q59 12 39 4",
    ]} /></g>
  </g>;
}

function TurbineHall({ transform }: { transform: string }) {
  return <g transform={transform}>
    <Lines paths={[
      "M0 61 V14 L106 1 L164 12 V61 M-3 14 L106 -1 L167 11 M106 1 V61",
      "M0 22 L106 10 L164 20 M0 26 L106 14 L164 24",
    ]} />
    <g className="plant-detail"><Lines paths={[
      "M10 61 V27 M24 61 V25 M38 61 V23 M52 61 V22 M67 61 V20 M82 61 V18 M95 61 V17",
      "M116 60 V19 M131 60 V22 M146 60 V25 M3 48 L103 40 M112 40 L161 48",
    ]} /></g>
  </g>;
}

export function AtomicScene() {
  // Two viewports crop the unmodified Illustrator lockup into its original mark and lettering.
  const brand = publicUrl("/brand/roin-world.svg");
  return <>
    <svg className="atom-traces" aria-hidden="true">
      <g>{["west", "north", "east", "south"].map((edge) => <path data-edge={edge} key={edge} />)}</g>
    </svg>
    <div className="atom-lockup" dir="ltr">
      <svg className="atom-symbol" viewBox="0 0 80 91" aria-hidden="true"><image href={brand} width="222.9" height="91.1" /></svg>
      <svg className="atom-name" viewBox="92 37 131 17" aria-hidden="true"><image href={brand} width="222.9" height="91.1" /></svg>
    </div>
    <svg className="plant-elevation" viewBox="0 0 1440 230" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g className="plant-ground"><Lines paths={[
        "M0 212 H1440", "M19 218 H249 M310 218 H593 M845 218 H1231 M1297 218 H1440",
      ]} /></g>
      <g className="plant-distant">
        <CoolingTower transform="translate(188 100) scale(.74)" />
        <Crane transform="translate(385 66) scale(-.95 .96)" />
        <Containment transform="translate(927 144) scale(.94)" />
        <Crane transform="translate(1268 59) scale(-1 1)" />
      </g>
      <g className="plant-main">
        <TurbineHall transform="translate(12 170) scale(.68)" />
        <Containment transform="translate(255 150) scale(.86)" />
        <Crane transform="translate(505 16) scale(1.29)" />
        <TurbineHall transform="translate(574 153) scale(.96)" />
        <CoolingTower transform="translate(765 68) scale(.95)" />
        <CoolingTower transform="translate(863 110) scale(.67)" />
        <TurbineHall transform="translate(1021 163) scale(.81)" />
      </g>
      <g className="plant-detail"><Lines paths={[
        "M112 210 V194 H137 V188 H167 V211 M117 198 H164 M145 188 V174 H149 V188",
        "M331 211 V192 H355 V182 H373 V211 M395 210 V194 H437 V182 H470 V211 M400 199 H466",
        "M522 210 V192 H544 V180 H561 V211 M548 180 V167 H552 V180",
        "M1176 210 V184 H1217 V192 H1244 V211 M1181 189 H1212",
        "M1284 211 V182 L1332 175 L1385 183 V211 M1285 187 L1332 181 L1384 188 M1332 181 V211 M1394 211 V194 H1440",
      ]} /></g>
    </svg>
  </>;
}

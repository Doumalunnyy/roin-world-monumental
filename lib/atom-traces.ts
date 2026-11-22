// Work in the Illustrator atom's coordinate space. The three orbit axes and
// tangent entry points coincide with the centre lines of the official artwork.
const entrances = [
  { side: "west", rotation: 60, start: 180, sweep: 360 },
  { side: "north", rotation: 0, start: 0, sweep: 180 },
  { side: "east", rotation: -60, start: 180, sweep: 360 },
  { side: "south", rotation: 0, start: 180, sweep: 180 },
] as const;

export function fitAtomTraces(scene: HTMLElement) {
  const mark = scene.querySelector<SVGSVGElement>(".atom-symbol")!;
  const layer = scene.querySelector<SVGSVGElement>(".atom-traces")!;
  const group = layer.querySelector("g")!;
  const frame = layer.getBoundingClientRect();
  const box = mark.getBoundingClientRect();
  const scale = box.width / 80;
  if (!scale) return;
  group.style.setProperty("--trace-weight", String(1.25 / scale));
  const left = (frame.left - box.left) / scale;
  const top = (frame.top - box.top) / scale;
  const width = frame.width / scale;
  const height = frame.height / scale;
  group.setAttribute("transform", `translate(${-left * scale} ${-top * scale}) scale(${scale})`);

  for (const { side, rotation, start, sweep } of entrances) {
    const path = group.querySelector<SVGPathElement>(`[data-edge="${side}"]`)!;
    const radians = Math.PI / 180;
    const angle = rotation * radians;
    const rx = 12.1;
    const ry = 43.6;
    function point(degrees: number) {
      const x = rx * Math.cos(degrees * radians);
      const y = ry * Math.sin(degrees * radians);
      return [40.1 + x * Math.cos(angle) - y * Math.sin(angle), 45.5 + x * Math.sin(angle) + y * Math.cos(angle)];
    }
    const [x, y] = point(start);
    const [tx, ty] = point(start + .1);
    const length = Math.hypot(tx - x, ty - y);
    const horizontal = side === "west" || side === "east";
    const fromX = horizontal ? (side === "west" ? left - 3 : left + width + 3) : x + (side === "north" ? .055 : -.055) * width;
    const fromY = horizontal ? y + (side === "west" ? .12 : .075) * height : (side === "north" ? top - 3 : top + height + 3);
    const reach = Math.min(115, Math.hypot(fromX - x, fromY - y) * .32);
    const lead = `M${fromX} ${fromY} C${horizontal ? (fromX + x) / 2 : fromX} ${horizontal ? fromY : (fromY + y) / 2} ${x - (tx - x) / length * reach} ${y - (ty - y) / length * reach} ${x} ${y}`;
    path.setAttribute("d", lead);
    const stem = path.getTotalLength();
    let orbit = "";
    for (let offset = 90; offset <= sweep; offset += 90) {
      const [endX, endY] = point(start + offset);
      orbit += ` A${rx} ${ry} ${rotation} 0 1 ${endX} ${endY}`;
    }
    path.setAttribute("d", lead + orbit);
    const total = path.getTotalLength();
    // A single moving dash follows the feeder and rolls directly into its orbit.
    path.style.setProperty("--strand", String(total - stem));
    path.style.setProperty("--gap", String(total + 2));
    path.style.setProperty("--land", String(-stem));
  }
}

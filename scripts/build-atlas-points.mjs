import { readFileSync, writeFileSync } from "node:fs";

// Use Natural Earth's ne_110m_admin_0_countries.geojson (the same edition as the relief).
// node scripts/build-atlas-points.mjs path/to/ne_110m_admin_0_countries.geojson
const input = process.argv[2];
if (!input) throw new Error("Pass the path to the Natural Earth country GeoJSON.");
const countries = JSON.parse(readFileSync(input, "utf8")).features;
const source = new URL("../content/map.json", import.meta.url);
const map = JSON.parse(readFileSync(source, "utf8"));
const codes = { bangladesh: "BGD", egypt: "EGY", hungary: "HUN", turkey: "TUR", russia: "RUS" };
const radians = Math.PI / 180;
const sin60 = Math.sqrt(3) / 2;

function project([longitude, latitude]) {
  const theta = Math.asin(sin60 * Math.sin(latitude * radians));
  const t2 = theta * theta;
  const t6 = t2 ** 3;
  const x = longitude * radians * Math.cos(theta) /
    (sin60 * (1.340264 - 3 * .081106 * t2 + t6 * (7 * .000893 + 9 * .003796 * t2)));
  const y = theta * (1.340264 - .081106 * t2 + t6 * (.000893 + .003796 * t2));
  return [Number((500 + x * 181).toFixed(2)), Number((253 - y * 181).toFixed(2))];
}

function inside(ring, x, y) {
  let result = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[j];
    if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) result = !result;
  }
  return result;
}

map.points = Object.fromEntries(Object.entries(codes).map(([region, code]) => {
  const feature = countries.find(country => country.properties.ADM0_A3 === code);
  if (!feature) throw new Error(`Natural Earth feature missing for ${code}`);
  const { LABEL_X: longitude, LABEL_Y: latitude } = feature.properties;
  const { type, coordinates } = feature.geometry;
  const polygons = type === "Polygon" ? [coordinates] : coordinates;
  if (!polygons.some(([outer, ...holes]) => inside(outer, longitude, latitude) &&
    !holes.some(hole => inside(hole, longitude, latitude)))) throw new Error(`Off-territory label for ${code}`);
  const outline = polygons.flatMap(polygon => polygon.map(ring => "M" + ring.slice(0, -1)
    .map(point => project(point).map(value => Number(value.toFixed(1))).join(",")).join(" ") + "Z")).join("");
  const [x, y] = project([longitude, latitude]);
  return [region, { x, y, latitude, longitude, outline }];
}));
writeFileSync(source, JSON.stringify(map, null, 2) + "\n");

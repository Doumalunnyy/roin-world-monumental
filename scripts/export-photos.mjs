import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const widths = [256, 480, 768, 1200, 1600];
const photoRoot = path.resolve("public/images");

// Supply real intrinsic widths to the static <img> markup. Existing local
// or remote files outside this photo collection continue using their own URLs.
export async function photoManifest() {
  const photos = {};
  for (const file of await readdir(photoRoot)) {
    if (!file.endsWith(".webp") || file === "atlas-relief.webp") continue;
    const { width } = await sharp(path.join(photoRoot, file)).metadata();
    photos["/images/" + file] = [...widths.filter(size => size < width), width];
  }
  return photos;
}

export async function exportPhotos(photos, output) {
  for (const [url, sizes] of Object.entries(photos)) {
    const file = path.basename(url);
    for (const size of sizes.slice(0, -1)) {
      const dir = path.join(output, "media", String(size));
      await mkdir(dir, { recursive: true });
      await sharp(path.join(photoRoot, file)).resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 }).toFile(path.join(dir, file));
    }
  }
}

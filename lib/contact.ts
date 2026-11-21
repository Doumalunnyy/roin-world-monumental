import { createHash, randomUUID } from "node:crypto";
import { existsSync, realpathSync } from "node:fs";
import { access, link, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

type Environment = Readonly<Record<string, string | undefined>>;
type Enquiry = {
  requestId: string;
  name: string;
  email: string;
  company: string;
  message: string;
  lang: "ru" | "en" | "ar" | "es" | "hu";
  consent: true;
};

const maxBytes = 24 * 1024;
const hour = 60 * 60 * 1_000;
const senders = new Map<string, { count: number; until: number }>();
let traffic = { count: 0, until: 0 };

function inside(parent: string, target: string) {
  const relative = path.relative(parent, target);
  return (
    relative === "" ||
    (!path.isAbsolute(relative) &&
      relative !== ".." &&
      !relative.startsWith(".." + path.sep))
  );
}

// Resolve junctions and symlinks in any existing prefix, even before first use.
function physicalPath(directory: string): string {
  if (existsSync(directory)) return realpathSync(directory);
  const parent = path.dirname(directory);
  if (parent === directory) throw new Error("Volume unavailable");
  return path.join(physicalPath(parent), path.basename(directory));
}

function inboxDirectory(env: Environment): string | null {
  const directory = env.CONTACT_INBOX_DIR;
  if (
    env.CONTACT_ENABLED !== "true" ||
    !directory ||
    !path.isAbsolute(directory)
  )
    return null;
  try {
    const root = realpathSync(process.cwd());
    const target = physicalPath(path.resolve(directory));
    if (inside(target, root)) return null;
    if (
      ["public", ".next", "out", "dist"].some((name) =>
        inside(physicalPath(path.join(root, name)), target),
      )
    )
      return null;
    return target;
  } catch {
    return null;
  }
}

export function contactEnabled(env: Environment = process.env): boolean {
  return inboxDirectory(env) !== null;
}

function result(status: number, code: string, retryAfter?: number) {
  const headers = new Headers({ "Cache-Control": "no-store" });
  if (retryAfter) headers.set("Retry-After", String(retryAfter));
  return Response.json({ code }, { status, headers });
}

async function readPayload(request: Request): Promise<unknown | Response> {
  if (Number(request.headers.get("content-length")) > maxBytes)
    return result(413, "large");
  const reader = request.body?.getReader();
  if (!reader) return result(400, "invalid");
  let size = 0;
  const blocks: Uint8Array[] = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        return result(413, "large");
      }
      blocks.push(value);
    }
    return JSON.parse(Buffer.concat(blocks).toString("utf8"));
  } catch {
    return result(400, "invalid");
  } finally {
    reader.releaseLock();
  }
}

function validate(input: unknown): Enquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const fields = input as Record<string, unknown>;
  function text(key: string, min: number, max: number): string | null {
    const raw = fields[key];
    if (typeof raw !== "string") return null;
    const value = raw.trim();
    return value.length >= min && value.length <= max ? value : null;
  }
  const { lang, requestId } = fields;
  if (lang !== "ru" && lang !== "en" && lang !== "ar" && lang !== "es" && lang !== "hu") return null;
  if (fields.consent !== true || fields.website !== "") return null;
  if (
    typeof requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestId,
    )
  )
    return null;
  const name = text("name", 2, 100);
  const email = text("email", 3, 254);
  const message = text("message", 10, 4000);
  const company = text("company", 0, 160);
  if (!name || !email || !message || company === null) return null;
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(name + company)
  )
    return null;
  return { requestId, name, email, company, message, lang, consent: true };
}

function isCode(error: unknown, code: string): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === code
  );
}

function chargeSender(key: string, now: number): number {
  for (const [sender, entry] of senders)
    if (entry.until <= now) senders.delete(sender);
  const count = senders.get(key) ?? { count: 0, until: now + hour };
  if (count.count >= 3)
    return Math.max(1, Math.ceil((count.until - now) / 1000));
  count.count++;
  senders.set(key, count);
  return 0;
}

const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");

export async function handleContact(
  request: Request,
  env: Environment = process.env,
): Promise<Response> {
  const directory = inboxDirectory(env);
  if (!directory) return result(503, "closed");
  const origin = request.headers.get("origin");
  const allowedOrigin = env.SITE_URL
    ? URL.parse(env.SITE_URL)?.origin
    : undefined;
  if (
    !origin ||
    (origin !== new URL(request.url).origin && origin !== allowedOrigin)
  )
    return result(403, "origin");
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    return result(415, "invalid");
  }
  const now = Date.now();
  if (traffic.until <= now) traffic = { count: 0, until: now + 60_000 };
  if (traffic.count >= 120)
    return result(
      429,
      "limit",
      Math.max(1, Math.ceil((traffic.until - now) / 1_000)),
    );
  traffic.count++;
  const input = await readPayload(request);
  if (input instanceof Response) return input;
  const enquiry = validate(input);
  if (!enquiry) return result(422, "invalid");

  const file = path.join(directory, digest(JSON.stringify(enquiry)) + ".json");
  const temp = path.join(directory, "." + randomUUID() + ".tmp");
  const sender = digest(enquiry.email.toLowerCase());
  try {
    await mkdir(directory, { recursive: true, mode: 0o700 });
    try {
      await access(file);
      return result(200, "received");
    } catch (error) {
      if (!isCode(error, "ENOENT")) throw error;
    }

    const retryAfter = chargeSender(sender, now);
    if (retryAfter) return result(429, "limit", retryAfter);
    const record = { ...enquiry, receivedAt: new Date(now).toISOString() };
    await writeFile(temp, JSON.stringify(record, null, 2) + "\n", {
      flag: "wx",
      mode: 0o600,
      flush: true,
    });
    try {
      await link(temp, file);
    } catch (error) {
      if (isCode(error, "EEXIST")) return result(200, "received");
      throw error;
    }
    return result(201, "received");
  } catch {
    return result(503, "unavailable");
  } finally {
    await rm(temp, { force: true }).catch(() => undefined);
  }
}

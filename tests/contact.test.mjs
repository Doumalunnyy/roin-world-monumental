import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { contactEnabled, handleContact } from "../lib/contact.ts";
import { contactCopy } from "../lib/contact-copy.ts";

const origin = "https://example.test";
const sample = {
  requestId: randomUUID(),
  lang: "ru",
  name: "Тестовый заявитель",
  email: "test@example.test",
  company: "",
  message: "Тест обработки локального обращения.",
  consent: true,
  website: "",
};

function request(data, headers = {}) {
  return new Request(origin + "/api/contact", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });
}

test("disabled or publicly readable storage never accepts an enquiry", async () => {
  assert.equal(contactEnabled({}), false);
  assert.equal(
    contactEnabled({ CONTACT_ENABLED: "true", CONTACT_INBOX_DIR: "relative" }),
    false,
  );
  for (const directory of ["public", "public/uploads", ".next/static", "."]) {
    assert.equal(
      contactEnabled({
        CONTACT_ENABLED: "true",
        CONTACT_INBOX_DIR: resolve(directory),
      }),
      false,
    );
  }
  const res = await handleContact(request(sample), {});
  assert.equal(res.status, 503);
  assert.deepEqual(await res.json(), { code: "closed" });
});

test("writes one private JSON on concurrent duplicate submission", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "roin-contact-test-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const config = { CONTACT_ENABLED: "true", CONTACT_INBOX_DIR: dir };
  assert.equal(contactEnabled(config), true);
  const statuses = await Promise.all(
    [1, 2].map(
      async () => (await handleContact(request(sample), config)).status,
    ),
  );
  assert.deepEqual(statuses.sort(), [200, 201]);
  const files = await readdir(dir);
  assert.equal(files.length, 1);
  const saved = JSON.parse(await readFile(join(dir, files[0]), "utf8"));
  assert.equal(saved.email, sample.email);
  assert.equal(saved.consent, true);
  assert.equal(saved.message, sample.message);
  assert.ok(Date.parse(saved.receivedAt));
  assert.equal(Object.hasOwn(saved, "website"), false);
});

test("invalid, oversized, cross-origin and bot submissions leave the inbox empty", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "roin-contact-test-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const config = { CONTACT_ENABLED: "true", CONTACT_INBOX_DIR: dir };
  const cases = [
    [request({ ...sample, name: " " }), 422],
    [request({ ...sample, email: "invalid" }), 422],
    [request({ ...sample, consent: false }), 422],
    [request({ ...sample, message: " " }), 422],
    [request({ ...sample, website: "bot.example" }), 422],
    [request({ ...sample, lang: "other" }), 422],
    [request({ ...sample, message: "x".repeat(30000) }), 413],
    [request(sample, { origin: "https://elsewhere.test" }), 403],
    [
      request(sample, { "content-type": "application/x-www-form-urlencoded" }),
      415,
    ],
  ];
  for (const [submission, expected] of cases) {
    assert.equal((await handleContact(submission, config)).status, expected);
  }
  assert.deepEqual(await readdir(dir), []);
});

test("Spanish and Hungarian have complete form text and supported submissions", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "roin-contact-locale-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const config = { CONTACT_ENABLED: "true", CONTACT_INBOX_DIR: directory };
  const keys = Object.keys(contactCopy.en).sort();
  for (const lang of ["es", "hu"]) {
    assert.deepEqual(Object.keys(contactCopy[lang]).sort(), keys);
    assert.ok(Object.values(contactCopy[lang]).every((value) => value.trim()));
    const submission = request({ ...sample, lang, email: lang + "@example.test" });
    assert.equal((await handleContact(submission, config)).status, 201);
  }
  const records = await Promise.all((await readdir(directory)).map(async (file) =>
    JSON.parse(await readFile(join(directory, file), "utf8"))));
  assert.deepEqual(records.map((record) => record.lang).sort(), ["es", "hu"]);
});

test("repeated enquiries from one address are rate limited", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "roin-contact-test-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const config = { CONTACT_ENABLED: "true", CONTACT_INBOX_DIR: dir };
  const submit = () =>
    handleContact(
      request({
        ...sample,
        email: "another@example.test",
        requestId: randomUUID(),
      }),
      config,
    );
  for (let i = 0; i < 3; i++) assert.equal((await submit()).status, 201);
  const limited = await submit();
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("retry-after")) > 0);
  assert.equal((await readdir(dir)).length, 3);
});

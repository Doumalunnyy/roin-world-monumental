"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import { contactCopy } from "@/lib/contact-copy";
import { localeUrl, publicUrl } from "@/lib/urls";
import company from "@/content/company.json";
import "./contact.css";

type Props = { lang: keyof typeof contactCopy; enabled: boolean };
type Feedback =
  | "verified"
  | "received"
  | "invalid"
  | "limit"
  | "large"
  | "unavailable"
  | "closed";

const subscribeReady = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function ContactForm({ lang, enabled }: Props) {
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady);
  const t = contactCopy[lang];
  const officeEmail = company.offices.find((office) => office.email)?.email;
  const contactLink = officeEmail ? (
    <a href={"mailto:" + officeEmail}><bdi>{officeEmail}</bdi></a>
  ) : (
    <a href={localeUrl(lang, "contacts")}>{t.offices}</a>
  );
  const titleId = useId();
  const noticeId = useId();
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const draftLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => { if (draft) draftLink.current?.focus({preventScroll:true}); }, [draft]);
  const lastSubmission = useRef<{ signature: string; id: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    const body = {
      name: field("name"),
      email: field("email"),
      company: field("company"),
      message: field("message"),
      website: field("website"),
      consent: data.get("consent") === "yes",
      lang,
    };
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const message = form.elements.namedItem("message") as HTMLTextAreaElement;
    name.setCustomValidity(body.name.length < 2 ? t.invalidName : "");
    message.setCustomValidity(body.message.length < 10 ? t.invalidMessage : "");
    if (!form.reportValidity()) return;
    if (!enabled) {
      if (officeEmail) {
        const text = [body.name, body.company, body.email, "", body.message].filter((v, i) => v || i === 3).join("\n");
        setDraft("mailto:" + officeEmail + "?subject=" + encodeURIComponent(t.title) + "&body=" + encodeURIComponent(text));
      }
      setFeedback("verified");
      return;
    }
    setBusy(true);
    setFeedback(null);
    const signature = JSON.stringify(body);
    try {
      if (lastSubmission.current?.signature !== signature) {
        lastSubmission.current = { signature, id: crypto.randomUUID() };
      }
      const response = await fetch(publicUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, requestId: lastSubmission.current.id }),
        signal: AbortSignal.timeout(20_000),
      });
      const { code } = await response.json();
      if (response.ok && code === "received") {
        form.reset();
        lastSubmission.current = null;
        setFeedback("received");
      } else {
        const known = ["invalid", "limit", "large", "closed"] as const;
        setFeedback(known.find((key) => key === code) ?? "unavailable");
      }
    } catch {
      setFeedback("unavailable");
    } finally {
      setBusy(false);
    }
  }

  const feedbackId =
    feedback === "verified" || feedback === "received" ? "success" : "notice";
  return (
    <form
      className="contact-form"
      method="post"
      action={publicUrl("/api/contact")}
      aria-labelledby={titleId}
      aria-describedby={enabled ? undefined : noticeId}
      onSubmit={submit}
      onInput={(event) => {
        const field = event.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        )
          field.setCustomValidity("");
        if (feedback) setFeedback(null);
        if (draft) setDraft("");
      }}
      onInvalid={(event) => {
        const field = event.target;
        if (
          !(
            field instanceof HTMLInputElement ||
            field instanceof HTMLTextAreaElement
          )
        )
          return;
        const messages: Record<string, string> = {
          name: t.invalidName,
          email: t.invalidEmail,
          message: t.invalidMessage,
          consent: t.invalidConsent,
        };
        field.setCustomValidity(messages[field.name] ?? t.invalid);
      }}
    >
      <h2 id={titleId}>{t.title}</h2>
      {!enabled && (
        <p className="contact-form__notice" id={noticeId}>
          {t.mailMode} {contactLink}
        </p>
      )}
      <noscript>
        <style>{".contact-form fieldset {display:none}"}</style>
        <p className="contact-form__notice">
          {t.js} {contactLink}
        </p>
      </noscript>
      <fieldset disabled={busy || !ready}>
        <div className="contact-form__row">
          <label>
            {t.name}
            <input
              name="name"
              type="text"
              autoComplete="name"
              dir="auto"
              required
              minLength={2}
              maxLength={100}
            />
          </label>
          <label>
            {t.email}
            <input
              name="email"
              type="email"
              autoComplete="email"
              dir="ltr"
              required
              maxLength={254}
              pattern={String.raw`[^\s@]+@[^\s@]+\.[^\s@]+`}
            />
          </label>
        </div>
        <label>
          {t.company}
          <input
            name="company"
            type="text"
            dir="auto"
            autoComplete="organization"
            maxLength={160}
          />
        </label>
        <label>
          {t.message}
          <textarea
            name="message"
            placeholder={t.placeholder}
            dir="auto"
            rows={3}
            required
            minLength={10}
            maxLength={4000}
          />
        </label>
        <div hidden aria-hidden="true">
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-label="Website"
          />
        </div>
        <div className="contact-form__consent">
          <input
            id={noticeId + "-consent"}
            aria-labelledby={noticeId + "-terms"}
            name="consent"
            type="checkbox"
            value="yes"
            required
          />
          <div id={noticeId + "-terms"}>
            <label htmlFor={noticeId + "-consent"}>{t.consent}</label>{" "}
            <a href={localeUrl(lang, "privacy")}>{t.privacy}</a>.
          </div>
        </div>
        <button type="submit">
          {busy ? t.sending : enabled ? t.send : t.check}
          <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
      <p
        className="contact-form__feedback"
        role="status"
        aria-live="polite"
        data-result={feedbackId}
      >
        {feedback && t[feedback]}
        {feedback === "verified" && draft && <> <a className="contact-draft" ref={draftLink} href={draft}>{t.openDraft} <span aria-hidden="true">↗</span></a></>}
        {feedback && (["closed", "unavailable", "limit"].includes(feedback) || (feedback === "verified" && !draft)) && <> {contactLink}</>}
      </p>
    </form>
  );
}

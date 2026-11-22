// Profile links published in the header and footer of roinworld.com.
const accounts = [
  { name: "Instagram", url: "https://www.instagram.com/roinworld_sl/", mark:
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.45" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </g> },
  { name: "Facebook", url: "https://www.facebook.com/RoinWorldSL/", mark:
    <path fill="currentColor" d="M14.1 22v-8.9h3l.45-3.47H14.1V7.42c0-1 .28-1.69 1.73-1.69h1.85V2.62a24 24 0 0 0-2.69-.14c-2.66 0-4.49 1.62-4.49 4.61v2.54h-3v3.47h3V22z" /> },
];

export function SocialLinks({ placement }: { placement: "header" | "footer" }) {
  return <div className={`social-links social-links--${placement}`}>
    {accounts.map(({ name, url, mark }) =>
      <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`ROIN WORLD · ${name}`} title={name}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">{mark}</svg>
      </a>
    )}
  </div>;
}

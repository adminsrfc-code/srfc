"use client";

// Obfuscates email addresses from scrapers by rendering them via JS
export function ObfuscatedEmail({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="flex items-center gap-2 font-body text-sm text-muted hover:text-maroon transition-colors"
    >
      <span>✉️</span>
      <span>{email}</span>
    </a>
  );
}

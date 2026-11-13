/**
 * HeroBanner — time-bounded promotional image for the homepage Club Intro section.
 *
 * Configured via Google Sheets Settings tab (key/value rows):
 *   banner_image_url  → Full public image URL
 *   banner_expires    → YYYY-MM-DD (banner hidden after this date, UTC midnight)
 *
 * When no banner is configured OR the expiry date has passed, this component
 * returns null so the caller can render the stats grid instead.
 */

type HeroBannerProps = {
  imageUrl: string;
  expires: string; // YYYY-MM-DD or empty string
  alt?: string;
};

export function HeroBanner({ imageUrl, expires, alt = "Club announcement" }: HeroBannerProps) {
  if (!imageUrl) return null;

  // Hide banner if the expiry date has passed (compare UTC dates)
  if (expires) {
    const expiryMs = new Date(`${expires}T23:59:59Z`).getTime();
    if (Date.now() > expiryMs) return null;
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );
}

import type { Metadata } from "next";
import { getSheetContacts } from "@/lib/contacts";
import { ObfuscatedEmail } from "./ObfuscatedEmail";

export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Get in touch with Southwell RFC. Find contact details for club officials, coaches, and the clubhouse at Park Lane, Southwell NG25 0QN.",
};

export const revalidate = 300;

export default async function ContactsPage() {
  // Contacts come from Google Sheets contacts tab
  const contactGroups = await getSheetContacts();
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-maroon-deep text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-body text-gold text-xs font-semibold tracking-widest uppercase block mb-3">
            Park Lane, Southwell NG25 0QN
          </span>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-white">
            GET IN TOUCH
          </h1>
          <p className="font-body text-white/60 mt-4 text-lg max-w-xl">
            Whether you want to join, hire the clubhouse, or just find out what's on — we'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Officials directory */}
          <div className="lg:col-span-2 space-y-10">
            {contactGroups.length === 0 ? (
              /* Fallback when Sheets not yet configured */
              <div className="bg-white border border-border rounded-2xl p-8 text-center">
                <p className="font-display font-bold text-xl text-slate mb-2">CONTACT INFO LOADING</p>
                <p className="font-body text-muted text-sm mb-4">
                  Contact details are managed in the club spreadsheet. In the meantime, call us on{" "}
                  <a href="tel:01636812576" className="text-maroon font-semibold">01636 812576</a>.
                </p>
              </div>
            ) : (
              contactGroups.map((group) => (
                <div key={group.category}>
                  <h2 className="font-display font-bold text-2xl text-slate mb-4 pb-2 border-b border-border">
                    {group.category.toUpperCase()}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {group.contacts.map((contact, ci) => (
                      <div
                        key={contact.role + ci}
                        className="flex items-center justify-between gap-4 bg-white border border-border rounded-2xl p-5 hover:border-maroon/30 hover:shadow-sm transition-all"
                      >
                        {/* Left: Contact details */}
                        <div className="min-w-0 flex-1">
                          <span className="font-body text-maroon text-xs font-semibold tracking-wide uppercase block mb-1">
                            {contact.role}
                          </span>
                          <span className="font-display font-bold text-xl text-slate block mb-3">
                            {contact.name}
                          </span>
                          <div className="space-y-1.5">
                            {contact.email && <ObfuscatedEmail email={contact.email} />}
                            {contact.phone && (
                              <a
                                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-2 font-body text-sm text-muted hover:text-slate transition-colors"
                              >
                                <span>📞</span>
                                <span>{contact.phone}</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Right: Optional photo/avatar */}
                        {contact.photo && (
                          <img
                            src={contact.photo}
                            alt={contact.name}
                            width={96}
                            height={96}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-border"
                            loading="lazy"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-maroon-deep rounded-2xl p-6 text-white">
              <h3 className="font-display font-bold text-xl mb-4">CLUBHOUSE</h3>
              <address className="not-italic font-body text-white/70 text-sm leading-relaxed space-y-1 mb-4">
                <p>Park Lane</p>
                <p>Southwell</p>
                <p>Nottinghamshire</p>
                <p>NG25 0QN</p>
              </address>
              <a href="tel:01636812576" className="flex items-center gap-2 font-body text-gold hover:text-white transition-colors text-sm font-semibold">
                📞 01636 812576
              </a>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1198.9465!2d-0.9584550!3d53.0690390!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879a16d6c1b7af3%3A0x0!2sPark+Lane%2C+Southwell+NG25+0QN!5e0!3m2!1sen!2suk!4v1731081600000!5m2!1sen!2suk"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Southwell RFC — Park Lane, Southwell NG25 0QN"
              />
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=53.069039,-0.958455"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white border border-border text-maroon font-body font-semibold text-sm px-4 py-3 rounded-xl hover:bg-maroon hover:text-white hover:border-maroon transition-all"
            >
              📍 Get Directions
            </a>

            <div className="bg-cream border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-base text-slate mb-2">SAFEGUARDING</h3>
              <p className="font-body text-muted text-xs leading-relaxed mb-2">
                Committed to the welfare of all players. Contact our Safeguarding Officer via the directory above.
              </p>
              <a href="https://www.englandrugby.com/participation/playing/safeguarding" target="_blank" rel="noopener noreferrer"
                className="font-body text-xs text-maroon hover:underline">
                RFU Safeguarding Policy ↗
              </a>
            </div>
            {/* Visiting teams info */}
            <div className="bg-cream border border-border rounded-2xl p-6">
              <h2 className="font-display font-bold text-2xl text-slate mb-4">VISITING TEAMS & OFFICIALS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-body text-sm text-muted leading-relaxed">
                <div>
                  <h3 className="font-semibold text-slate mb-2">Getting Here</h3>
                  <p>Park Lane, Southwell, NG25 0QN. From the A612, follow signs towards the Minster. Park Lane is on your right.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate mb-2">Parking</h3>
                  <p>On-site parking at the ground. Overspill at Southwell Leisure Centre (5 min walk). Please respect local residents.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate mb-2">Changing Rooms</h3>
                  <p>Full facilities for both teams and officials. Hot showers. Contact the club in advance to confirm allocation.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate mb-2">After the Match</h3>
                  <p>Clubhouse bar open after all home matches. Hot food on selected matchdays. Visitors always welcome. 🍺</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

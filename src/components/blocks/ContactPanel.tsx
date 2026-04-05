import { storyblokEditable } from "@storyblok/react/rsc";

import type { SbBlokData } from "@/lib/types";

type ContactPanelProps = {
  blok: SbBlokData & {
    title: string;
    intro?: string;
    address?: string;
    email?: string;
    phone?: string;
  };
};

function sanitizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export default function ContactPanel({ blok }: ContactPanelProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="contact-panel" {...storyblokEditable(blok as any)}>
          <h2>{blok.title}</h2>
          {blok.intro ? <p>{blok.intro}</p> : null}
          <dl className="contact-grid">
            {blok.address ? (
              <div>
                <dt>Adres</dt>
                <dd>{blok.address}</dd>
              </div>
            ) : null}
            {blok.email ? (
              <div>
                <dt>E-mail</dt>
                <dd>
                  <a href={`mailto:${blok.email}`}>{blok.email}</a>
                </dd>
              </div>
            ) : null}
            {blok.phone ? (
              <div>
                <dt>Telefoon</dt>
                <dd>
                  <a href={`tel:${sanitizePhone(blok.phone)}`}>{blok.phone}</a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </section>
  );
}

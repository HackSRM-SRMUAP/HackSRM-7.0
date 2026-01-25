"use client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

type AboutDoc = {
  _id: string;
  title: string;
  subtitle?: string;
  heroImage?: any;
  body?: any;
  highlights?: string[];
  cta?: { label?: string; href?: string };
} | null;

type PersonDoc = {
  _id: string;
  name: string;
  role?: string;
  image?: any;
  bio?: string;
  socials?: { github?: string; linkedin?: string; twitter?: string; website?: string };
};

type OrganizerDoc = {
  _id: string;
  name: string;
  logo?: any;
  url?: string;
  description?: string;
};

type FaqDoc = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
};

export default function AboutWindow({ about, leaders, organizers, faqs }: {
  about: AboutDoc;
  leaders: PersonDoc[];
  organizers: OrganizerDoc[];
  faqs: FaqDoc[];
}) {
  const title = about?.title || "HACKSRM 7.0";
  const subtitle = about?.subtitle;
  const highlights = about?.highlights || [];
  const heroUrl = about?.heroImage ? urlFor(about.heroImage).width(1200).url() : null;

  return (
    <div className="p-4 space-y-4 text-black">
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
      </div>

      {heroUrl && (
        <div className="bg-white/80 p-2 shadow-inner">
          <img src={heroUrl} alt={about?.heroImage?.alt || ""} className="w-full h-auto" />
        </div>
      )}

      {about?.body && (
        <div className="bg-white/80 p-3 shadow-inner prose prose-sm max-w-none">
          <PortableText value={about.body} />
        </div>
      )}

      {highlights.length > 0 && (
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold">Highlights</div>
          <ul className="list-disc list-inside text-sm">
            {highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      )}

      {leaders?.length > 0 && (
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold mb-2">Leadership</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {leaders.map((p) => (
              <li key={p._id} className="flex items-center gap-3 bg-white/70 p-2">
                {p.image && (
                  <img
                    src={urlFor(p.image).width(120).height(120).fit('crop').url()}
                    alt={p.image?.alt || ''}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <div className="font-semibold text-sm">{p.name}</div>
                  {p.role && <div className="text-xs text-gray-700">{p.role}</div>}
                  {p.bio && <div className="text-xs mt-1 line-clamp-2">{p.bio}</div>}
                  {(p.socials?.github || p.socials?.linkedin || p.socials?.twitter || p.socials?.website) && (
                    <div className="flex items-center gap-2 mt-1 text-gray-800">
                      {p.socials?.github && (
                        <a href={p.socials.github} target="_blank" rel="noreferrer" title="GitHub" className="inline-flex items-center justify-center w-5 h-5">
                          <FaGithub className="w-4 h-4" />
                        </a>
                      )}
                      {p.socials?.linkedin && (
                        <a href={p.socials.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="inline-flex items-center justify-center w-5 h-5">
                          <FaLinkedin className="w-4 h-4" />
                        </a>
                      )}
                      {p.socials?.twitter && (
                        <a href={p.socials.twitter} target="_blank" rel="noreferrer" title="Twitter/X" className="inline-flex items-center justify-center w-5 h-5">
                          <FaTwitter className="w-4 h-4" />
                        </a>
                      )}
                      {p.socials?.website && (
                        <a href={p.socials.website} target="_blank" rel="noreferrer" title="Website" className="inline-flex items-center justify-center w-5 h-5">
                          <FaGlobe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {organizers?.length > 0 && (
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold mb-2">Organizers</div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {organizers.map((o) => (
              <li key={o._id} className="bg-white/70 p-2 flex flex-col items-center text-center">
                {o.logo && (<img src={urlFor(o.logo).width(160).url()} alt={o.logo?.alt || ''} className="w-24 h-auto" />)}
                <div className="mt-1 text-sm font-medium">{o.name}</div>
                {o.url && (
                  <a href={o.url} target="_blank" rel="noreferrer" className="text-xs text-blue-700 underline">Website</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {faqs?.length > 0 && (
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold mb-2">FAQs</div>
          <ul className="space-y-2">
            {faqs.map((f) => (
              <li key={f._id}>
                <div className="text-sm font-medium">Q: {f.question}</div>
                <div className="text-sm mt-1">{f.answer}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {about?.cta?.label && about?.cta?.href && (
        <div>
          <a className="win98-btn" href={about.cta.href} target="_blank" rel="noreferrer">{about.cta.label}</a>
        </div>
      )}
    </div>
  );
}

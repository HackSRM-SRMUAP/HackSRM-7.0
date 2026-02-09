"use client";
import { urlFor } from "@/lib/sanity";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

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

export default function TeamsWindow({ members, organizers }: { members: PersonDoc[]; organizers: OrganizerDoc[] }) {
  return (
    <div className="p-4 text-black space-y-4">
      <h2 className="text-lg font-bold">Teams.exe</h2>

      {/* Core Team / Leaders */}
      <div className="bg-white/80 p-3 shadow-inner">
        <div className="font-semibold mb-2">Core Team</div>
        {members?.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {members.map((p) => (
              <li key={p._id} className="flex items-center gap-3 bg-white/70 p-2 border border-gray-300">
                {p.image && (
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={urlFor(p.image).width(200).height(200).fit('crop').url()}
                      alt={p.image?.alt || p.name}
                      className="w-full h-full object-cover rounded shadow-sm border border-gray-100"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{p.name}</div>
                  {p.role && <div className="text-xs text-gray-700 truncate">{p.role}</div>}
                  {p.bio && <div className="text-xs mt-1 line-clamp-2">{p.bio}</div>}
                  {p.socials && (
                    <div className="mt-1 flex items-center gap-2 text-blue-700">
                      {p.socials.github && (
                        <a href={p.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:underline">
                          <FaGithub size={14} />
                        </a>
                      )}
                      {p.socials.linkedin && (
                        <a href={p.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:underline">
                          <FaLinkedin size={14} />
                        </a>
                      )}
                      {p.socials.twitter && (
                        <a href={p.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:underline">
                          <FaTwitter size={14} />
                        </a>
                      )}
                      {p.socials.website && (
                        <a href={p.socials.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="hover:underline">
                          <FaGlobe size={14} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm">No core team members listed.</div>
        )}
      </div>

      {/* Organizers */}
      <div className="bg-white/80 p-3 shadow-inner">
        <div className="font-semibold mb-2">Organizers</div>
        {organizers?.length ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {organizers.map((o) => (
              <li key={o._id} className="bg-white/70 p-2 border border-gray-300 flex flex-col items-center text-center">
                {o.logo && (
                  <div className="w-24 h-16 flex items-center justify-center overflow-hidden">
                    <img
                      src={urlFor(o.logo).width(180).fit('max').url()}
                      alt={o.logo?.alt || o.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="mt-1 text-sm font-medium truncate w-full">{o.name}</div>
                {o.url && (
                  <a href={o.url} target="_blank" rel="noreferrer" className="text-xs text-blue-700 underline mt-1">Website</a>
                )}
                {o.description && <div className="text-xs mt-1 line-clamp-2">{o.description}</div>}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm">No organizers listed.</div>
        )}
      </div>
    </div>
  );
}

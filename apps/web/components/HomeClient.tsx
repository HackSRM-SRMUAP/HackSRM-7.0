"use client";
import { useEffect, useState } from "react";
import Desktop98 from "@/components/desktop/Desktop98";
import Phone98 from "@/components/mobile/Phone98";

interface ScheduleItem {
  _id: string;
  title: string;
  startTime: string;
  type: string;
}

interface AboutDoc {
  _id: string;
  title: string;
  subtitle?: string;
  heroImage?: any;
  body?: any;
  highlights?: string[];
  cta?: { label?: string; href?: string };
}

interface PersonDoc {
  _id: string;
  name: string;
  role?: string;
  image?: any;
  bio?: string;
  socials?: { github?: string; linkedin?: string; twitter?: string; website?: string };
}

interface OrganizerDoc {
  _id: string;
  name: string;
  logo?: any;
  url?: string;
  description?: string;
}

interface FaqDoc {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export default function HomeClient({ events, about, leaders, organizers, faqs, announcements, prizes, sponsors, rulesPage, settings }: {
  events: ScheduleItem[];
  about: AboutDoc | null;
  leaders: PersonDoc[];
  organizers: OrganizerDoc[];
  faqs: FaqDoc[];
  announcements: { _id: string; title: string; date?: string; time?: string; pinned?: boolean; level?: string; _updatedAt?: string }[];
  prizes: { _id: string; name: string; amount: string; by?: string; tier?: string; desc?: string }[];
  sponsors: { _id: string; name: string; tier: string; logo?: any; url?: string }[];
  rulesPage: { _id: string; title?: string; core?: string[]; conduct?: string[]; submissions?: string[]; eligibility?: string[]; note?: string } | null;
  settings: { _id: string; registerUrl?: string } | null;
}) {
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const update = () => setIsPhone(window.innerWidth < 768 || window.innerHeight < 600);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isPhone
    ? <Phone98 events={events} about={about} leaders={leaders} organizers={organizers} faqs={faqs} announcements={announcements} prizes={prizes} sponsors={sponsors} rulesPage={rulesPage} settings={settings} />
    : <Desktop98 events={events} about={about} leaders={leaders} organizers={organizers} faqs={faqs} announcements={announcements} prizes={prizes} sponsors={sponsors} rulesPage={rulesPage} settings={settings} />;
}

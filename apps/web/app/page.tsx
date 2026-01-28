import { client } from '@/lib/sanity';
export const revalidate = 0;
export const dynamic = 'force-dynamic';
import { SCHEDULE_QUERY, ABOUT_PAGE_QUERY, LEADERSHIP_QUERY, ORGANIZERS_QUERY, FAQS_QUERY, ANNOUNCEMENTS_QUERY, PRIZES_QUERY, SPONSORS_QUERY, RULES_PAGE_QUERY, SETTINGS_QUERY } from '@/lib/queries';
import HomeClient from "@/components/HomeClient";

// 2. Define the Type (TypeScript Expert Mode)
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

interface AnnouncementDoc {
  _id: string;
  title: string;
  time?: string;
  pinned?: boolean;
  level?: string;
}

interface PrizeDoc {
  _id: string;
  name: string;
  amount: string;
  by?: string;
  tier?: string;
  desc?: string;
}

interface SponsorDoc {
  _id: string;
  name: string;
  tier: string;
  logo?: any;
  url?: string;
}

interface RulesPageDoc {
  _id: string;
  title?: string;
  core?: string[];
  conduct?: string[];
  submissions?: string[];
  eligibility?: string[];
  note?: string;
}

interface SettingsDoc {
  _id: string;
  registerUrl?: string;
}

export default async function Home() {

  const [events, about, leaders, organizers, faqs, announcements, prizes, sponsors, rulesPage, settings, slugData] = await Promise.all([
    client.fetch<ScheduleItem[]>(SCHEDULE_QUERY),
    client.fetch<AboutDoc | null>(ABOUT_PAGE_QUERY),
    client.fetch<PersonDoc[]>(LEADERSHIP_QUERY),
    client.fetch<OrganizerDoc[]>(ORGANIZERS_QUERY),
    client.fetch<FaqDoc[]>(FAQS_QUERY),
    client.fetch<AnnouncementDoc[]>(ANNOUNCEMENTS_QUERY),
    client.fetch<PrizeDoc[]>(PRIZES_QUERY),
    client.fetch<SponsorDoc[]>(SPONSORS_QUERY),
    client.fetch<RulesPageDoc | null>(RULES_PAGE_QUERY),
    client.fetch<SettingsDoc | null>(SETTINGS_QUERY),
    client.fetch(`*[_type == "settings"][0]{devfolioSlug}`)
  ]);

  const devfolioSlug = slugData?.devfolioSlug || "hack-srm26";
  
  return <HomeClient
    events={events}
    about={about}
    leaders={leaders}
    organizers={organizers}
    faqs={faqs}
    announcements={announcements}
    prizes={prizes}
    sponsors={sponsors}
    rulesPage={rulesPage}
    settings={settings}
    slug={devfolioSlug}
  />;
}
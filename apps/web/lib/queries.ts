// Centralized GROQ queries used by the web app

// Schedule: chronological order
export const SCHEDULE_QUERY = `*[_type == "schedule"] | order(startTime asc) {
  _id,
  title,
  startTime,
  endTime,
  type,
  location,
  description
}`;

// About page: assume single doc (pick the first)
export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"] | order(_updatedAt desc)[0] {
  _id,
  title,
  subtitle,
  heroImage,
  body,
  highlights,
  cta
}`;

// Leadership (specific roles)
export const LEADERSHIP_QUERY = `*[_type == "person" && role in ["head", "cohead", "technical-lead", "website-lead", "pr", "sponsors", "smt"]] {
  _id,
  name,
  role,
  image,
  bio,
  socials,
  "orderRank": select(
    role == "head" => 0,
    role == "cohead" => 1,
    role == "technical-lead" => 2,
    role == "website-lead" => 3,
    role == "pr" => 4,
    role == "sponsors" => 5,
    role == "smt" => 6,
    999
  )
} | order(orderRank asc, name asc)`;

// Organizers
export const ORGANIZERS_QUERY = `*[_type == "organizer"] | order(name asc) {
  _id,
  name,
  logo,
  url,
  description
}`;

// FAQs by category then order
export const FAQS_QUERY = `*[_type == "faq"] | order(category asc, order asc, question asc) {
  _id,
  question,
  answer,
  category,
  order
}`;

// Announcements: pinned first, then latest updated
export const ANNOUNCEMENTS_QUERY = `*[_type == "announcement"] {
  _id,
  title,
  date,
  time,
  pinned,
  level,
  _updatedAt
} | order(pinned desc, coalesce(date, _updatedAt) desc)`;

// Prizes: group/sort by tier then name
export const PRIZES_QUERY = `*[_type == "prize"] {
  _id,
  name,
  amount,
  "by": coalesce(sponsor->name, by),
  tier,
  desc,
  // expose some sponsor fields for richer UI (optional)
  "sponsor": sponsor->{ _id, name, logo, url },
  "tierRank": select(
    tier == "Platinum" => 0,
    tier == "Gold" => 1,
    tier == "Silver" => 2,
    tier == "Community" => 3,
    tier == "Bronze" => 4,
    tier == "Supporter" => 5,
    9
  )
} | order(tierRank asc, name asc)`;

// Sponsors: similar tier order
export const SPONSORS_QUERY = `*[_type == "sponsor"] {
  _id,
  name,
  tier,
  logo,
  url,
  "tierRank": select(
    tier == "Platinum" => 0,
    tier == "Gold" => 1,
    tier == "Silver" => 2,
    tier == "Community" => 3,
    9
  )
} | order(tierRank asc, name asc)`;

// Rules page: use latest doc
export const RULES_PAGE_QUERY = `*[_type == "rulesPage"] | order(_updatedAt desc)[0] {
  _id,
  title,
  core,
  conduct,
  submissions,
  eligibility,
  note
}`;

// Settings: latest
export const SETTINGS_QUERY = `*[_type == "siteSettings"] | order(_updatedAt desc)[0] {
  _id,
  registerUrl
}`;

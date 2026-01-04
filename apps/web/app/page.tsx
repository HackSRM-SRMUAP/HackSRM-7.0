import { client } from '@/lib/sanity';
import HomeClient from "@/components/HomeClient";

// 1. The Query (GROQ Language)
// We order by startTime so the schedule is chronological
const SCHEDULE_QUERY = `*[_type == "schedule"] | order(startTime asc) {
  _id,
  title,
  startTime,
  type
}`;

// 2. Define the Type (TypeScript Expert Mode)
interface ScheduleItem {
  _id: string;
  title: string;
  startTime: string;
  type: string;
}

export default async function Home() {
  const events = await client.fetch<ScheduleItem[]>(SCHEDULE_QUERY);
  return <HomeClient events={events} />;
}
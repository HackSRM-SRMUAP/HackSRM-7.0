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

export default function HomeClient({ events }: { events: ScheduleItem[] }) {
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const update = () => setIsPhone(window.innerWidth < 768 || window.innerHeight < 600);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isPhone ? <Phone98 events={events} /> : <Desktop98 events={events} />;
}

"use client";

const announcements = [
  { title: "Welcome to HACKSRM 7.0", time: "09:00" },
  { title: "Team formation starts at 10:00", time: "09:45" },
  { title: "Lightning talk in Hall A at 14:00", time: "13:30" },
  { title: "Snacks available near the foyer", time: "16:00" },
  { title: "Mentor rounds from 17:00", time: "16:45" },
];

export default function AnnouncementsWindow() {
  return (
    <div className="p-4 text-black space-y-2">
      <div className="bg-[#E0F0FF] border border-blue-700/30 text-blue-900 px-3 py-2 text-xs shadow">
        Pinned: Check Schedule.exe for live updates. Ask mentors if blocked.
      </div>
      {announcements.map((a, i) => (
        <div key={i} className="bg-white/80 p-3 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">{a.time}</div>
            <span className="text-[10px] px-2 py-0.5 border border-black/30 bg-[#EAEAEA]">Info</span>
          </div>
          <div className="text-sm font-semibold mt-1">{a.title}</div>
        </div>
      ))}
    </div>
  );
}

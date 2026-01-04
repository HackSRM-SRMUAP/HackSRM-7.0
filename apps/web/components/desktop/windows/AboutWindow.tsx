"use client";

export default function AboutWindow() {
  return (
    <div className="p-4 space-y-4 text-black">
      <div>
        <h2 className="text-lg font-bold">HACKSRM 7.0</h2>
        <p className="text-sm mt-1">A national-level hackathon packed with learning, shipping, and fun. Build across tracks like AI, Web, Systems, and more. Ship fast, iterate, and collaborate.</p>
        <p className="text-xs mt-1 text-gray-700">Bring an MVP, iterate quickly, and focus on impact. Mentors and lightning talks help you unblock and level up.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold">Tracks</div>
          <ul className="list-disc list-inside text-sm">
            <li>AI & ML</li>
            <li>Web & Mobile</li>
            <li>Systems & Infra</li>
            <li>Open Source</li>
          </ul>
        </div>
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold">Highlights</div>
          <ul className="list-disc list-inside text-sm">
            <li>36 hours of building</li>
            <li>Expert mentors</li>
            <li>Lightning talks</li>
            <li>Live demos</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        <div className="bg-white/70 p-2 shadow-inner"><div className="font-semibold">Teams</div><div>100+</div></div>
        <div className="bg-white/70 p-2 shadow-inner"><div className="font-semibold">Hours</div><div>36</div></div>
        <div className="bg-white/70 p-2 shadow-inner"><div className="font-semibold">Mentors</div><div>25+</div></div>
        <div className="bg-white/70 p-2 shadow-inner"><div className="font-semibold">Prizes</div><div>$6k+</div></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold">Judging Criteria</div>
          <ul className="list-disc list-inside text-sm">
            <li>Impact: solves a real problem</li>
            <li>Innovation: creative approach and novelty</li>
            <li>Technical depth: solid engineering</li>
            <li>User experience: clear and friendly</li>
            <li>Pitch: concise and convincing</li>
          </ul>
        </div>
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold">Quick Links</div>
          <ul className="list-disc list-inside text-sm">
            <li>Open Register.exe to lock your spot</li>
            <li>Open Rules.txt for guidelines</li>
            <li>Open Schedule.exe for timings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

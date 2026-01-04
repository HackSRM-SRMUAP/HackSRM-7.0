"use client";

export default function RulesWindow() {
  return (
    <div className="p-4 text-black space-y-3">
      <h2 className="text-lg font-bold">README.txt</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold mb-1">Core</div>
          <ul className="list-disc list-inside text-sm">
            <li>36 hours of building</li>
            <li>Original work only</li>
            <li>Team size: per official rules</li>
          </ul>
        </div>
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold mb-1">Conduct</div>
          <ul className="list-disc list-inside text-sm">
            <li>Be kind. No harassment.</li>
            <li>Respect venue and equipment</li>
            <li>Follow mentor guidance</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold mb-1">Submissions</div>
          <ul className="list-disc list-inside text-sm">
            <li>Repo link and README</li>
            <li>Demo or screen recording</li>
            <li>Problem statement and solution overview</li>
          </ul>
        </div>
        <div className="bg-white/80 p-3 shadow-inner">
          <div className="font-semibold mb-1">Eligibility</div>
          <ul className="list-disc list-inside text-sm">
            <li>Students and early professionals</li>
            <li>Multi-campus teams allowed</li>
            <li>Rules may vary; check opening brief</li>
          </ul>
        </div>
      </div>
      <div className="text-xs text-gray-800 bg-[#FFFBEA] border border-black/20 p-2">
        Note: Detailed rules and judging criteria will be shared during opening. Code of conduct applies throughout the event.
      </div>
    </div>
  );
}

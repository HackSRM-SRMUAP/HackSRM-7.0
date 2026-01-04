"use client";

const prizes = [
  { name: "Grand Prize", amount: "$3000", by: "ACME Corp", tier: "Platinum", desc: "Top overall project demonstrating impact, innovation, and execution." },
  { name: "Best AI Hack", amount: "$1500", by: "NeuralNet Inc", tier: "Gold", desc: "Applied AI with clear problem definition and robust modeling." },
  { name: "Best Web App", amount: "$1000", by: "WebWorks", tier: "Silver", desc: "Polished product with thoughtful UX and reliable backend." },
  { name: "Open Source Hero", amount: "$800", by: "OSS Foundation", tier: "Community", desc: "Meaningful contributions that benefit the community." },
  { name: "Best UX", amount: "$600", by: "Pixel Co", tier: "Bronze", desc: "Delightful experience, clarity, and accessibility." },
  { name: "Rookie Award", amount: "$400", by: "Starter Inc", tier: "Supporter", desc: "Strong first-time team showing promise and grit." },
];

export default function PrizesWindow() {
  return (
    <div className="p-4 text-black grid grid-cols-1 sm:grid-cols-2 gap-3">
      {prizes.map((p, i) => (
        <div key={i} className="bg-white/80 p-3 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">{p.by}</div>
            <span className="text-[10px] px-2 py-0.5 border border-black/30 bg-[#EAEAEA]">{p.tier}</span>
          </div>
          <div className="text-lg font-bold mt-1">{p.name}</div>
          <div className="text-green-700 font-semibold">{p.amount}</div>
          <p className="text-xs mt-1 text-gray-700">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

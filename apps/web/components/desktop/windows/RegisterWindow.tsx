"use client";

export default function RegisterWindow({ registerUrl }: { registerUrl?: string | null }) {
  const url = typeof window !== "undefined" ? (registerUrl || process.env.NEXT_PUBLIC_REGISTER_URL || "#") : "#";
  return (
    <div className="p-4 text-black space-y-3">
      <p>Apply now to secure your spot.</p>
      <ol className="list-decimal list-inside text-sm space-y-1">
        <li>HackSRM 7.0 is hosted on Devfolio</li>
        <li>Visit our Devfolio page to apply for HackSRM 7.0</li>
        <li>Submit your application and await confirmation</li>
      </ol>
      <a className="win98-btn inline-block mt-1" href={url} target="_blank" rel="noreferrer">Apply on Devfolio</a>
      <div className="text-xs text-gray-800 bg-[#FFFBEA] border border-black/20 p-2 flex items-center justify-between gap-2">
        <span>Refer FAQ for most common doubts.</span>
        <button
          className="win98-btn text-black px-2 py-1"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('open-faq'));
            }
          }}
        >
          Open FAQ.txt
        </button>
      </div>

      <div className="max-w rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm shadow-sm">
        <div className="mb-3 flex items-center gap-2 font-bold text-blue-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
            {"</>"}
          </span>
          Quick Tips
        </div>

        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="font-medium text-blue-600">01.</span>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Check Link Status:</span> Ensure the link is live by checking <code className="rounded bg-blue-100 px-1 text-xs text-blue-800">Announcements.log</code>.
            </p>
          </li>

          <li className="flex gap-3">
            <span className="font-medium text-blue-600">02.</span>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Participation:</span> Team must consist of 3-5 members. Inter-college teams are allowed.
            </p>
          </li>

          <li className="flex gap-3">
            <span className="font-medium text-blue-600">03.</span>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Support:</span> Need help? Join our discord server for assistance. check <code className="rounded bg-blue-100 px-1 text-xs text-blue-800">About.exe</code> for server invite. Use the server judiciously.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

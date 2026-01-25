"use client";

export default function RegisterWindow({ registerUrl }: { registerUrl?: string | null }) {
  const url = typeof window !== "undefined" ? (registerUrl || process.env.NEXT_PUBLIC_REGISTER_URL || "#") : "#";
  return (
    <div className="p-4 text-black space-y-3">
      <p>Register now to secure your spot.</p>
      <ol className="list-decimal list-inside text-sm space-y-1">
        <li>Click the registration link</li>
        <li>Fill team and project details</li>
        <li>Submit and await confirmation</li>
      </ol>
      <a className="win98-btn inline-block mt-1" href={url} target="_blank" rel="noreferrer">Open Registration</a>
      <div className="text-xs text-gray-700">
        <div className="font-semibold">FAQ</div>
        <div>Is the link live? Check Announcements.log</div>
        <div>Can solo participants join? Yes, solo or team is fine</div>
        <div>Need help? Ask mentors or check Announcements.log</div>
      </div>
    </div>
  );
}

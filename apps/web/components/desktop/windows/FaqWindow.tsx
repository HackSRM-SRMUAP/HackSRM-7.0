"use client";

type FaqDoc = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
};

export default function FaqWindow({ faqs }: { faqs: FaqDoc[] }) {
  const grouped = faqs.reduce<Record<string, FaqDoc[]>>((acc, f) => {
    const key = (f.category?.toUpperCase()|| "General").trim() || "General";
    (acc[key] ||= []).push(f);
    return acc;
  }, {});
  const categories = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  return (
    <div className="p-4 text-black space-y-3">
      <h2 className="text-lg font-bold">FAQ.txt</h2>
      {categories.length === 0 ? (
        <div className="bg-white/80 p-3 shadow-inner text-sm">No FAQs available yet.</div>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="bg-white/80 p-3 shadow-inner">
            <div className="font-semibold mb-2">{cat}</div>
            <ul className="space-y-2">
              {grouped[cat]!
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.question.localeCompare(b.question))
                .map((f) => (
                  <li key={f._id}>
                    <div className="text-sm font-medium bg-black/80 text-white px-2 py-1 rounded">Q: {f.question}</div>
                    <div className="text-sm mt-1">{f.answer}</div>
                  </li>
                ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

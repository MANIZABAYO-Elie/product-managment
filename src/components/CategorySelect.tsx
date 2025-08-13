export default function CategorySelect({
  items,
  value,
  onChange,
}: {
  items: string[];
  value?: string | null;
  onChange: (slug: string | null) => void;
}) {
  return (
    <select value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} className="rounded-lg border px-3 py-2 text-sm">
      <option value="">All Categories</option>
      {items.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
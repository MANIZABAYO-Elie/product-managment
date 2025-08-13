import { useState, useEffect } from "react";
import Button from "./Button";

export default function SearchBar({ defaultValue = "", onSearch }: { defaultValue?: string; onSearch: (q: string) => void }) {
  const [q, setQ] = useState(defaultValue);

  useEffect(() => {
    const t = setTimeout(() => onSearch(q.trim()), 400);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="flex items-center gap-2">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
      <Button onClick={() => onSearch(q.trim())}>Search</Button>
    </div>
  );
}


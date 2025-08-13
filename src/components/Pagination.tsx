export default function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (idx: number) => void }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2">
      <button disabled={page === 0} onClick={() => onChange(Math.max(0, page - 1))} className="rounded border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">Prev</button>
      <span className="text-sm">Page {page + 1} / {pages}</span>
      <button disabled={page >= pages - 1} onClick={() => onChange(Math.min(pages - 1, page + 1))} className="rounded border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">Next</button>
    </div>
  );
}
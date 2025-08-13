import { useState } from "react";
import type { Product } from "../types/products";
import Button from "./Button";

export default function ProductForm({ initial, onSubmit, onCancel }: { initial: Product; onSubmit: (patch: Partial<Product>) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState<Partial<Product>>({
    title: initial.title,
    description: initial.description,
    price: initial.price,
    stock: initial.stock,
    brand: initial.brand,
    category: initial.category,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      await onSubmit(form);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {err && <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">{err}</div>}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Title</span>
          <input className="rounded border px-3 py-2" value={form.title ?? ""} onChange={(e) => update("title", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Brand</span>
          <input className="rounded border px-3 py-2" value={form.brand ?? ""} onChange={(e) => update("brand", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Price</span>
          <input type="number" step="0.01" className="rounded border px-3 py-2" value={form.price ?? 0} onChange={(e) => update("price", Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Stock</span>
          <input type="number" className="rounded border px-3 py-2" value={form.stock ?? 0} onChange={(e) => update("stock", Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm text-gray-600">Description</span>
          <textarea className="min-h-[96px] rounded border px-3 py-2" value={form.description ?? ""} onChange={(e) => update("description", e.target.value)} />
        </label>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
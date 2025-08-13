import type { Product } from "../types/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items, onEdit, onDelete }: { items: Product[]; onEdit: (p: Product) => void; onDelete: (p: Product) => void }) {
  if (!items.length) return <p className="text-center text-gray-500">No products found.</p>;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
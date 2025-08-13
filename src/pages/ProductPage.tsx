import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useProducts } from "../hooks/useProducts";
import SearchBar from "../components/SearchBar";
import CategorySelect from "../components/CategorySelect";
import ProductGrid from "../components/ProductGrid";
import ErrorAlert from "../components/ErrorAlert";
import Spinner from "../components/Spinner";
import ProductForm from "../components/ProductForm";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";
import type { Product } from "../types/products";

export default function ProductsPage() {
  const {
    items,
    total,
    limit,
    currentPage,
    pageCount,
    categories,
    loading,
    error,
    query,
    selectedCategory,
    loadList,
    save,
    remove,
    setQuery,
    setCategory,
    setPage,
  } = useProducts();

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const cat = params.get("category");
    if (cat && cat !== selectedCategory) setCategory(cat);
  }, []);

  useEffect(() => { loadList(); }, [query, selectedCategory, currentPage, limit]);

  const [editing, setEditing] = useState<Product | null>(null);
  const [confirmDel, setConfirmDel] = useState<Product | null>(null);

  function onCategoryChange(slug: string | null) {
    setCategory(slug);
    if (slug) params.set("category", slug); else params.delete("category");
    setParams(params, { replace: true });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <SearchBar defaultValue={query} onSearch={setQuery} />
          <CategorySelect items={categories} value={selectedCategory ?? undefined} onChange={onCategoryChange} />
        </div>
        <div className="text-sm text-gray-600">Total: {total}</div>
      </div>

      {error && <ErrorAlert message={error} />}
      {loading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : (
        <ProductGrid items={items} onEdit={(p) => setEditing(p)} onDelete={(p) => setConfirmDel(p)} />
      )}

      <Pagination page={currentPage} pages={pageCount} onChange={setPage} />

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Edit Product</h3>
            <ProductForm
              initial={editing}
              onCancel={() => setEditing(null)}
              onSubmit={async (patch) => {
                await save(editing.id, patch);
                setEditing(null);
                alert("Updated (simulated by API)");
              }}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDel}
        title="Delete product?"
        message="This API simulates deletion but will return a deleted flag."
        onCancel={() => setConfirmDel(null)}
        onConfirm={async () => {
          if (confirmDel) {
            await remove(confirmDel.id);
            setConfirmDel(null);
            alert("Deleted (simulated by API)");
          }
        }}
      />
    </div>
  );
}
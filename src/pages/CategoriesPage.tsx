import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import ErrorAlert from "../components/ErrorAlert";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { current, loading, error, getOne } = useProducts();

  useEffect(() => {
    if (id) getOne(Number(id));
  }, [id]);

  if (loading) return <div className="flex justify-center p-8"><Spinner /></div>;
  if (error) return <div className="p-4"><ErrorAlert message={error} /></div>;
  if (!current) return <div className="p-4 text-gray-500">No product.</div>;

  return (
    <div className="mx-auto max-w-5xl p-4">
      <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {current.images?.[0] ? (
          <img src={current.images[0]} alt={current.title} className="w-full rounded-xl object-cover" />
        ) : (
          <div className="h-80 w-full rounded-xl bg-gray-100" />
        )}
        <div>
          <div className="mb-2 text-sm text-gray-500">{current.category}</div>
          <h1 className="mb-2 text-2xl font-bold">{current.title}</h1>
          <div className="mb-4 text-3xl font-extrabold">${current.price}</div>
          <p className="text-gray-700">{current.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Brand:</span> {current.brand ?? "—"}</div>
            <div><span className="text-gray-500">Stock:</span> {current.stock}</div>
            <div><span className="text-gray-500">Rating:</span> {current.rating ?? "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
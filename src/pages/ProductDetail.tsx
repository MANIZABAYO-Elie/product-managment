import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
  reviews: Review[];
}



export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  console.log("Full product detail:", product);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold">{product.title}</h1>
    //   <img
    //     src={product.thumbnail}
    //     alt={product.title}
    //     className="w-64 h-auto my-4 rounded"
    //   />
    //   <p className="mb-2">{product.description}</p>
    //   <p className="font-semibold mb-4">${product.price}</p>

    //   <p><strong>Brand:</strong> {product.brand}</p>
    //   <p><strong>Category:</strong> {product.category}</p>
    //   <p><strong>Availability:</strong> {product.availabilityStatus}</p>
    //   <p><strong>Stock:</strong> {product.stock}</p>
    //   <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
    //   <p><strong>Shipping:</strong> {product.shippingInformation}</p>

    //   <div className="mt-4">
    //     <h2 className="text-lg font-bold">Reviews</h2>
    //     {product.reviews.map((review, i) => (
    //       <div key={i} className="border p-2 my-2 rounded">
    //         <p><strong>{review.reviewerName}</strong> ({review.rating}⭐)</p>
    //         <p>{review.comment}</p>
    //         <small>{new Date(review.date).toLocaleDateString()}</small>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center">{product.title}</h1>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full max-w-xs mx-auto h-auto my-4 rounded"
        />
        <p className="mb-2 text-gray-700">{product.description}</p>
        <p className="font-semibold mb-4 text-lg text-green-600">${product.price}</p>

        <div className="space-y-1">
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Availability:</strong> {product.availabilityStatus}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
          <p><strong>Shipping:</strong> {product.shippingInformation}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold border-b pb-1">Reviews</h2>
          {product.reviews.map((review, i) => (
            <div
              key={i}
              className="border p-3 my-2 rounded-lg bg-gray-50 shadow-sm"
            >
              <p className="font-medium">
                {review.reviewerName} <span className="text-yellow-500">({review.rating}⭐)</span>
              </p>
              <p className="text-gray-700">{review.comment}</p>
              <small className="text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}


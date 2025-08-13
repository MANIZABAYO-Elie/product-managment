import { api } from "./api";
import type { Product, ProductsResponse } from "../types/products";

export type SortOrder = "asc" | "desc";

export async function fetchProducts(
  params: {
    q?: string;
    limit?: number;
    skip?: number;
    category?: string; // slug
    sortBy?: keyof Product | "price" | "title" | "rating" | "stock";
    order?: SortOrder;
  } = {}
): Promise<ProductsResponse> {
  const { q, limit = 12, skip = 0, category, sortBy, order } = params;

  const base = category
    ? `/products/category/${encodeURIComponent(category)}`
    : q
    ? `/products/search`
    : `/products`;

  const res = await api.get(base, {
    params: {
      q,
      limit,
      skip,
      sortBy,
      order,
    },
  });
  return res.data;
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export interface CategoryEntry {
  slug: string;
  name: string;
  url: string;
}

export async function fetchCategories(): Promise<string[]> {
  // Use “category-list” for string slugs only; easier for a simple select.
  const res = await api.get<string[]>("/products/category-list");
  return res.data;
}

export async function updateProduct(
  id: number,
  patch: Partial<Product>
): Promise<Product> {
  // DummyJSON supports PUT or PATCH; both simulate and return the updated object
  const res = await api.put(`/products/${id}`, patch);
  return res.data;
}

export async function deleteProduct(
  id: number
): Promise<{ id: number; isDeleted: boolean; deletedOn: string } & Partial<Product>> {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}

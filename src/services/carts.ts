import { api } from "../services/api";

export async function fetchCart(cartId: number) {
  const res = await api.get(`/carts/${cartId}`);
  return res.data;
}

export async function addToCart(userId: number, productId: number, quantity: number = 1) {
  const res = await api.post("/carts/add", {
    userId,
    products: [{ id: productId, quantity }],
  });
  return res.data;
}

export async function updateCart(cartId: number, products: { id: number; quantity: number }[]) {
  const res = await api.put(`/carts/${cartId}`, { products });
  return res.data;
}

export async function deleteCart(cartId: number) {
  const res = await api.delete(`/carts/${cartId}`);
  return res.data;
}
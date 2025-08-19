// import { createContext, useContext, useReducer } from "react";
// import type {ReactNode} from 'react'
// import type { Product } from "../types/products";
// import { addToCart } from "../services/carts";

// interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   dummyCartId?: number;
// }

// const initialState: CartState = { items: [] };

// type Action =
//   | { type: "ADD"; payload: Product }
//   | { type: "REMOVE"; payload: number }
//   | { type: "CLEAR" }
//   | { type: "SET_DUMMY_ID"; payload: number };

// function reducer(state: CartState, action: Action): CartState {
//   switch (action.type) {
//     case "ADD": {
//       const exists = state.items.find((i) => i.product.id === action.payload.id);
//       if (exists) {
//         return {
//           ...state,
//           items: state.items.map((i) =>
//             i.product.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
//           ),
//         };
//       }
//       return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] };
//     }
//     case "REMOVE":
//       return { ...state, items: state.items.filter((i) => i.product.id !== action.payload) };
//     case "CLEAR":
//       return { ...state, items: [] };
//     case "SET_DUMMY_ID":
//       return { ...state, dummyCartId: action.payload };
//     default:
//       return state;
//   }
// }

// const CartContext = createContext<{
//   state: CartState;
//   add: (p: Product) => Promise<void>;
//   remove: (id: number) => void;
//   clear: () => void;
// }>({ state: initialState, add: async () => {}, remove: () => {}, clear: () => {} });

// export function CartProvider({ children }:{ children: ReactNode }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const add = async (p: Product) => {
//     dispatch({ type: "ADD", payload: p });
//     try {
//       // DummyJSON requires a userId, using 1 for demo
//       const res = await addToCart(1, p.id, 1);
//       if (res.id) dispatch({ type: "SET_DUMMY_ID", payload: res.id });
//     } catch (e) {
//       console.error("Failed to sync with DummyJSON:", e);
//     }
//   };

//   const remove = (id: number) => dispatch({ type: "REMOVE", payload: id });
//   const clear = () => dispatch({ type: "CLEAR" });

//   return (
//     <CartContext.Provider value={{ state, add, remove, clear }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }


import { createContext, useContext, useReducer} from "react";
import type {ReactNode } from "react"
import type { Product } from "../types/products";
import { addToCart, updateCart, deleteCart } from "../services/carts";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  dummyCartId?: number;
}

const initialState: CartState = { items: [] };

type Action =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: number }
  | { type: "CLEAR" }
  | { type: "SET_DUMMY_ID"; payload: number };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.product.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.payload) };
    case "CLEAR":
      return { ...state, items: [] };
    case "SET_DUMMY_ID":
      return { ...state, dummyCartId: action.payload };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  add: (p: Product) => Promise<void>;
  remove: (id: number) => Promise<void>;
  clear: () => Promise<void>;
}>({ state: initialState, add: async () => {}, remove: async () => {}, clear: async () => {} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = async (p: Product) => {
    dispatch({ type: "ADD", payload: p });
    try {
      const res = await addToCart(1, p.id, 1); // userId = 1 for demo
      if (res.id) dispatch({ type: "SET_DUMMY_ID", payload: res.id });
    } catch (e) {
      console.error("Failed to sync add with DummyJSON:", e);
    }
  };

  const remove = async (id: number) => {
    dispatch({ type: "REMOVE", payload: id });
    if (!state.dummyCartId) return;
    try {
      const products = state.items
        .filter((i) => i.product.id !== id)
        .map((i) => ({ id: i.product.id, quantity: i.quantity }));
      await updateCart(state.dummyCartId, products);
    } catch (e) {
      console.error("Failed to sync remove with DummyJSON:", e);
    }
  };

  const clear = async () => {
    dispatch({ type: "CLEAR" });
    if (!state.dummyCartId) return;
    try {
      await deleteCart(state.dummyCartId);
    } catch (e) {
      console.error("Failed to sync clear with DummyJSON:", e);
    }
  };

  return (
    <CartContext.Provider value={{ state, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
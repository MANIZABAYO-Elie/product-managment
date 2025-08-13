import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { Product } from "../types/products";
import { fetchProducts, fetchCategories, fetchProduct, updateProduct, deleteProduct } from "../services/products";

interface State {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error?: string | null;
  query: string;
  categories: string[];
  selectedCategory?: string | null;
  current?: Product | null;
}

const initial: State = {
  items: [],
  total: 0,
  skip: 0,
  limit: 12,
  loading: false,
  error: null,
  query: "",
  categories: [],
  selectedCategory: null,
  current: null,
};

type Action =
  | { type: "START" }
  | { type: "ERROR"; payload: string }
  | { type: "SET_LIST"; payload: { items: Product[]; total: number; skip: number; limit: number } }
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string | null }
  | { type: "SET_PAGINATION"; payload: { skip: number; limit: number } }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "SET_CURRENT"; payload: Product | null }
  | { type: "UPDATE_ONE"; payload: Product }
  | { type: "DELETE_ONE"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, loading: true, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_LIST":
      return { ...state, loading: false, error: null, items: action.payload.items, total: action.payload.total, skip: action.payload.skip, limit: action.payload.limit };
    case "SET_QUERY":
      return { ...state, query: action.payload, skip: 0 };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload, skip: 0 };
    case "SET_PAGINATION":
      return { ...state, ...action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_CURRENT":
      return { ...state, current: action.payload, loading: false };
    case "UPDATE_ONE":
      return {
        ...state,
        items: state.items.map((p) => (p.id === action.payload.id ? action.payload : p)),
        current: state.current?.id === action.payload.id ? action.payload : state.current,
      };
    case "DELETE_ONE":
      return { ...state, items: state.items.filter((p) => p.id !== action.payload), total: Math.max(0, state.total - 1) };
    default:
      return state;
  }
}

export function useProducts() {
  const [state, dispatch] = useReducer(reducer, initial);

  const loadCategories = useCallback(async () => {
    try {
      const cats = await fetchCategories();
      dispatch({ type: "SET_CATEGORIES", payload: cats });
    } catch (e: any) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  }, []);

  const loadList = useCallback(async () => {
    dispatch({ type: "START" });
    try {
      const { items, total, skip, limit } = await fetchProducts({
        q: state.query || undefined,
        limit: state.limit,
        skip: state.skip,
        category: state.selectedCategory || undefined,
      }).then((d) => ({ items: d.products, total: d.total, skip: d.skip, limit: d.limit }));

      dispatch({ type: "SET_LIST", payload: { items, total, skip, limit } });
    } catch (e: any) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  }, [state.query, state.limit, state.skip, state.selectedCategory]);

  const getOne = useCallback(async (id: number) => {
    dispatch({ type: "START" });
    try {
      const p = await fetchProduct(id);
      dispatch({ type: "SET_CURRENT", payload: p });
    } catch (e: any) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  }, []);

  const save = useCallback(async (id: number, patch: Partial<Product>) => {
    dispatch({ type: "START" });
    try {
      const updated = await updateProduct(id, patch);
      dispatch({ type: "UPDATE_ONE", payload: updated });
      return updated;
    } catch (e: any) {
      dispatch({ type: "ERROR", payload: e.message });
      throw e;
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    dispatch({ type: "START" });
    try {
      await deleteProduct(id);
      dispatch({ type: "DELETE_ONE", payload: id });
    } catch (e: any) {
      dispatch({ type: "ERROR", payload: e.message });
      throw e;
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const setQuery = (q: string) => dispatch({ type: "SET_QUERY", payload: q });
  const setCategory = (slug: string | null) => dispatch({ type: "SET_CATEGORY", payload: slug });
  const setPage = (pageIndex: number) => dispatch({ type: "SET_PAGINATION", payload: { skip: pageIndex * state.limit, limit: state.limit } });
  const setLimit = (limit: number) => dispatch({ type: "SET_PAGINATION", payload: { skip: 0, limit } });

  const pageCount = useMemo(() => Math.ceil(state.total / state.limit) || 1, [state.total, state.limit]);
  const currentPage = useMemo(() => Math.floor(state.skip / state.limit), [state.skip, state.limit]);

  return {
    ...state,
    loadList,
    getOne,
    save,
    remove,
    setQuery,
    setCategory,
    setPage,
    setLimit,
    pageCount,
    currentPage,
  };
}
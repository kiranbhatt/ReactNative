import { BASE_URL } from "./config";

// ✅ Get all products
export const getProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Cannot fetch products" } };
  }
};

// ✅ Get single product by ID
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Cannot fetch product" } };
  }
};

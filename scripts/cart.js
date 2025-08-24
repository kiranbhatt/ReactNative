import { BASE_URL } from "./config";

// ✅ Get cart
export const getCart = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/${userId}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Cannot fetch cart" } };
  }
};

// ✅ Add to cart
export const addToCart = async (userId, productId, quantity) => {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Cannot add to cart" } };
  }
};

// ✅ Update cart item
export const updateCartItem = async (userId, productId, quantity) => {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Cannot update cart" } };
  }
};

// ✅ Remove cart item
export const removeCartItem = async (userId, productId) => {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Cannot remove item" } };
  }
};

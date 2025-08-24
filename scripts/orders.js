import { BASE_URL } from "./config";

// ✅ Place order
export const placeOrder = async (userId, items, total, address, paymentMethod) => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items, total, address, paymentMethod }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Cannot place order" } };
  }
};

// ✅ Get user orders
export const getOrders = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/${userId}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Cannot fetch orders" } };
  }
};

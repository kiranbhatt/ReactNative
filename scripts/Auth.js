// script/Auth.js
export const signupUser = async (name, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { message: "Cannot connect to server" } };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: { message: "Cannot connect to server" } };
  }
};

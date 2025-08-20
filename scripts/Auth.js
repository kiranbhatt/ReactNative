// script/Auth.js
import { Platform } from "react-native";

const DEFAULT_BASE_URL = Platform.OS === "web"
  ? "http://localhost:5000"
  : Platform.OS === "android"
    ? "http://10.0.2.2:5000"
    : "http://localhost:5000";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_BASE_URL;

export const signupUser = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
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
    const response = await fetch(`${BASE_URL}/login`, {
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

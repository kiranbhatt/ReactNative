import axios from "axios";
import { Platform } from "react-native";

const DEFAULT_API_URL = Platform.OS === "web"
  ? "http://localhost:5000"
  : Platform.OS === "android"
    ? "http://10.0.2.2:5000"
    : "http://localhost:5000";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL;

export const signup = async (name, email, password) => {
  return await axios.post(`${API_URL}/signup`, { name, email, password });
};

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

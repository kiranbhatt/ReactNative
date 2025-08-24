import { Platform } from "react-native";

const DEFAULT_BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:5000"
    : Platform.OS === "android"
    ? "http://10.0.2.2:5000"
    : "http://localhost:5000";

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_BASE_URL;

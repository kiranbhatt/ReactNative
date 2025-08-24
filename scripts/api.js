import axios from "axios";
import { BASE_URL } from "./config";


export const signup = async (name, email, password) => {
  return await axios.post(`${BASE_URL}/signup`, { name, email, password });
};

export const login = async (email, password) => {
  return await axios.post(`${BASE_URL}/login`, { email, password });
};

import axios from "axios";

const API_URL = "http://localhost:5000/api"; // change to your backend IP if testing on device

export const signup = async (name, email, password) => {
  return await axios.post(`${API_URL}/auth/signup`, { name, email, password });
};

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password });
};

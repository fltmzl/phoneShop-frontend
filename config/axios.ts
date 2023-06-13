import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_BASE || process.env.NEXT_PUBLIC_API_BASE,
});

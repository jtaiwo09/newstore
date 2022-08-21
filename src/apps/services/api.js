import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const baseQuery = fetchBaseQuery({
  // baseUrl: import.meta.env.VITE_BASE_URL,
  baseUrl: "http://localhost:2022/api/",
  prepareHeaders: (headers, { getState }) => {
    const cookies = new Cookies();
    // const token = getState().user.user.accesToken
    const token = cookies.get("user")?.token;
    headers.set("Content-Type", "application/json");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  tagTypes: ["Auth", "Products", "Cart"],
  endpoints: () => ({}),
});

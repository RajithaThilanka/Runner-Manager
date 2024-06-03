import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({ baseUrl: "/your/api/endpoint" }),
  endpoints: (builder) => ({
    getExample: builder.query({
      query: (id) => `example/${id}`,
    }),
  }),
});

export const { useGetExampleQuery } = apiService;

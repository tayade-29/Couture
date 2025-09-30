import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseurl = 'https://couture-backend-gfa1.onrender.com/api'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; 
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (formData) => ({
        url: '/auth/register',
        method: 'POST',
        body: formData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query({
  query: () => "/auth/profile", // you'll need to make this route later if required
}),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: '/admin/products',
        method: 'POST',
        body: formData,
      }),
    }),
    getProducts: builder.query({
      query: () => "/products",
    }),
    createOrder: builder.mutation({ 
      query: (orderData) => ({
        url: '/shop',
        method: 'POST',
        body: orderData,
      }),
    }),
  }),
})

export const { 
  useLoginUserMutation, 
  useCreateUserMutation, 
  useCreateProductMutation, 
  useGetProductsQuery, 
  useCreateOrderMutation 
} = apiSlice;

import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "UsersList", id: "LIST" }],
    }),
    getAdminUsersList: builder.query({
      query: () => ({
        url: `/admins`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "UsersList", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersListQuery, useGetAdminUsersListQuery } =
  extendedApiSlice;

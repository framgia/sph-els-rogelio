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
  }),
});

export const { useGetUsersListQuery } = extendedApiSlice;

import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    changeGeneralInfo: builder.mutation({
      query: ({ data }) => ({
        url: `/user/change/general-info`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    changePassword: builder.mutation({
      query: ({ data }) => ({
        url: `/user/change/password`,
        method: "PUT",
        data: data,
      }),
    }),
    changeAvatar: builder.mutation({
      query: ({ data }) => ({
        url: `/user/change/avatar`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useChangeGeneralInfoMutation,
  useChangePasswordMutation,
  useChangeAvatarMutation,
} = extendedApiSlice;

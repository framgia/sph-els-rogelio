import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserLessons: builder.query({
      query: (id) => ({
        url: `/user/lessons`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "UserLesson", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetUserLessonsQuery } = extendedApiSlice;

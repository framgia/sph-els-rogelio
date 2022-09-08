import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserLessons: builder.query({
      query: ({ query }) => ({
        url: `/user/lessons?filter=${query}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "UserLesson", id })),
              { type: "UserLesson", id: "LIST" },
            ]
          : [{ type: "UserLesson", id: "LIST" }],
    }),
    getUserLesson: builder.query({
      query: ({ id }) => ({
        url: `/user/lessons/${id}/take`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "UserLesson", id }],
    }),
  }),
});

export const { useGetUserLessonsQuery, useGetUserLessonQuery } =
  extendedApiSlice;

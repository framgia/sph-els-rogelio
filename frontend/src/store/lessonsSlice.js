import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: () => ({
        url: "/lessons",
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Lesson", id })),
              { type: "Lesson", id: "LIST" },
            ]
          : [{ type: "Lesson", id: "LIST" }],
    }),
    createLesson: builder.mutation({
      query: (data) => ({
        url: "/lessons",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Lesson", id: "LIST" }],
    }),
  }),
});

export const { useGetLessonsQuery, useCreateLessonMutation } = extendedApiSlice;

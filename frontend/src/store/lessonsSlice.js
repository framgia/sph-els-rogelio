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
					? [...result.map(({ id }) => ({ type: "Lesson", id })), "Lesson"]
					: ["Lesson"],
		}),
	}),
});

export const { useGetLessonsQuery } = extendedApiSlice;

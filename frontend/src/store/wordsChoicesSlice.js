import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWordsChoices: builder.query({
			query: (id) => ({
				url: `/lessons/${id}/words`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{ type: "WordChoice", id }],
		}),
	}),
});

export const { useGetWordsChoicesQuery } = extendedApiSlice;

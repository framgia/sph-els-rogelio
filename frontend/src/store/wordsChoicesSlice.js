import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWordsChoices: builder.query({
			query: (id) => ({
				url: `/lessons/${id}/words`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [
				{ type: "WordChoice", id: "LIST" },
			],
		}),
		createWordChoice: builder.mutation({
			query: ({ data, id }) => ({
				url: `/lessons/${id}/words`,
				method: "POST",
				data: data,
			}),
			invalidatesTags: [{ type: "WordChoice", id: "LIST" }],
		}),
	}),
});

export const { useGetWordsChoicesQuery, useCreateWordChoiceMutation } =
	extendedApiSlice;

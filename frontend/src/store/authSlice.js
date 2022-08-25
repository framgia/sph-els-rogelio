import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (post) => ({
				url: "/register",
				method: "POST",
				data: post,
			}),
			invalidatesTags: [{ type: "Auth", id: "LIST" }],
		}),
	}),
});

export const { useRegisterUserMutation } = extendedApiSlice;

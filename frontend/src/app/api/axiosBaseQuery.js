import api from "../axios-instance/api";

export const axiosBaseQuery =
	() =>
	async ({ url, method, data, params }) => {
		try {
			const result = await api({ url, method, data, params });
			return { data: result.data };
		} catch (axiosError) {
			let err = axiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

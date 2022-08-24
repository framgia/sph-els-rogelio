import axios from "axios";
import { useEffect, useState } from "react";
import api from "../app/axios-instance/api";
import AuthContext from "./AuthContext";

const Auth = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(null);

	const csrf = async () => {
		return await api({
			baseURL: process.env.REACT_APP_BACKEND_URL,
			url: "sanctum/csrf-cookie",
			method: "GET",
		});
	};

	useEffect(() => {
		checkAuthentication();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const signIn = async (email, password) => {
		try {
			// Get CSRF cookie.
			await csrf();

			// Sign in.
			await api.post(
				`/login`,
				{ email, password },
				{
					maxRedirects: 0,
				}
			);

			// Fetch user.
			const user = await revalidate();
			return user;
		} catch (error) {
			return error;
		}
	};

	const signOut = async () => {
		try {
			await api.post(`/logout`);
			// Only sign out after the server has successfully responded.
			setUser(null);
			setAuthenticated(false);
		} catch (error) {
			return error;
		}
	};

	const setCurrentUser = (user, authenticated = true) => {
		setUser(user);
		setAuthenticated(authenticated);
	};

	const revalidate = async () => {
		try {
			const { data } = await api.get("/user", {
				maxRedirects: 0,
			});
			setCurrentUser(data);
			return data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response && error.response.status === 401) {
					setUser(null);
					setAuthenticated(false);
				}
			} else {
				return error;
			}
		}
	};

	const checkAuthentication = async () => {
		if (authenticated === null) {
			try {
				await revalidate();
			} catch (error) {
				if (axios.isAxiosError(error)) {
					if (error.response && error.response.status === 401) {
						// If there's a 401 error the user is not signed in/authenticated.
						setUser(null);
						setAuthenticated(false);
					}
				}
			}
		}
	};

	return (
		<AuthContext.Provider
			children={children}
			value={{
				user,
				authenticated,
				setCurrentUser,
				signIn,
				signOut,
				checkAuthentication,
			}}
		></AuthContext.Provider>
	);
};
export default Auth;

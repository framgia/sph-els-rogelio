import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const checkUserType = (Component) => {
	const AuthComponent = (props) => {
		const { authenticated, user } = useAuth();
		const navigate = useNavigate();
		useEffect(() => {
			const path = user && user.is_admin ? "/admin/dashboard" : "/dashboard";
			navigate(path);
		}, [authenticated, user, navigate]);

		return <Component {...props} />;
	};

	return AuthComponent;
};

export default checkUserType;

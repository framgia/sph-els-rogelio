import React from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
	const context = React.useContext(AuthContext);
	if (!context) throw new Error("useAuth should only be used inside <Auth />");
	return context;
}

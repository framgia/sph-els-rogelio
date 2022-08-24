import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/register" element={<RegistrationPage />} />
			</Routes>
		</div>
	);
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import AdminLessonsPage from "./AdminLessonsPage";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import UserDashboard from "./UserDashboard";
import AdminCreateLessonPage from "./AdminCreateLessonPage";
import AdminUpdateLessonPage from "./AdminUpdateLessonPage";
import AdminWordsChoicesPage from "./AdminWordsChoicesPage";
import AdminCreateWordsChoicesPage from "./AdminCreateWordsChoicesPage";
import AdminUpdateWordsChoicesPage from "./AdminUpdateWordsChoicesPage";
import AdminUsersListPage from "./AdminUsersListPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/dashboard" element={<AdminLessonsPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/lessons/create" element={<AdminCreateLessonPage />} />
          <Route
            path="/lessons/update/:id"
            element={<AdminUpdateLessonPage />}
          />
          <Route
            path="/lessons/:lessonID/words"
            element={<AdminWordsChoicesPage />}
          />
          <Route
            path="/lessons/:lessonID/words/create"
            element={<AdminCreateWordsChoicesPage />}
          />
          <Route
            path="/lessons/:lessonID/words/:wordID/update"
            element={<AdminUpdateWordsChoicesPage />}
          />
          <Route path="/admin/list" element={<AdminUsersListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

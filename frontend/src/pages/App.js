import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import AdminLessonsPage from "./admin/lessons/AdminLessonsPage";
import LoginPage from "./shared/auth/LoginPage";
import RegistrationPage from "./shared/auth/RegistrationPage";
import UserDashboard from "./user/dashboard/UserDashboard";
import AdminCreateLessonPage from "./admin/lessons/AdminCreateLessonPage";
import AdminUpdateLessonPage from "./admin/lessons/AdminUpdateLessonPage";
import AdminWordsChoicesPage from "./admin/lessons/AdminWordsChoicesPage";
import AdminCreateWordsChoicesPage from "./admin/lessons/AdminCreateWordsChoicesPage";
import AdminUpdateWordsChoicesPage from "./admin/lessons/AdminUpdateWordsChoicesPage";
import UserLessonsPage from "./user/lesson/UserLessonsPage";
import UserLessonQuizPage from "./user/lesson/UserLessonQuizPage";
import UserLessonQuizResultPage from "./user/lesson/UserLessonQuizResultPage";
import UserProfilePage from "./shared/profile/UserProfilePage";
import MatchLearningsRoute from "./components/routes/MatchLearningsRoute";
import UserProfileSettingsPage from "./shared/profile/UserProfileSettingsPage";
import UserListPage from "./user/list/UserListPage";
import AdminUserListPage from "./admin/list/AdminUserListPage";
import ErrorPage from "./components/error/ErrorPage";

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
          <Route path="/user/lessons" element={<UserLessonsPage />} />
          <Route
            path="/user/lessons/:lessonID/take"
            element={<UserLessonQuizPage />}
          />
          <Route
            path="/user/lessons/:lessonID/result"
            element={<UserLessonQuizResultPage />}
          />
          <Route
            path="/profile/settings"
            element={<UserProfileSettingsPage />}
          />
          <Route path="/profile/:userID" element={<UserProfilePage />} />
          <Route path="/learned/:type" element={<MatchLearningsRoute />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/admins" element={<AdminUserListPage />} />
        </Route>
        <Route
          path="*"
          element={
            <ErrorPage
              errorStatus={404}
              errorType={"Page Not Found"}
              errorMessage={"We cannot find the page you are looking for."}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;


import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CoursesPage from "./pages/admin/CoursesPage";
import LearnerDashboard from "./pages/learner/LearnerDashboard";
import LearnerCoursesPage from "./pages/learner/CoursesPage";

import AppShell from "./components/layouts/AppShell";
import AdminLayout from "./components/layouts/AdminLayout";
import LearnerLayout from "./components/layouts/LearnerLayout";
import ProtectedView from "./components/guards/ProtectedView";

import { login, getProfile } from "./services/authService";

import {
  getCourses,
  getMyEnrollments,
  createCourse,
  updateCourse,
  publishCourse,
  unpublishCourse,
  archiveCourse
} from "./services/courseService";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forbidden, setForbidden] = useState(false);

  const [currentView, setCurrentView] = useState("dashboard");

  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const [coursesLoading, setCoursesLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [coursesError, setCoursesError] = useState("");

  function handleApiError(err) {
    if (err.status === 401) {
      setSession(null);
      setCourses([]);
      setMyCourses([]);
      setCurrentView("dashboard");
      setError("Session expired. Please login again.");
      setForbidden(false);
      return;
    }

    if (err.status === 403) {
      setForbidden(true);
      setError("Accès refusé");
      return;
    }

    setError(err.message);
  }

  async function handleLogin(credentials) {
    setLoading(true);
    setError("");

    try {
      const loginResponse = await login(credentials);
      const token = loginResponse.token;

      const profileResponse = await getProfile(token);
      const user = profileResponse.data.user;

      setSession({ token, user });
      setCurrentView("dashboard");
      setError("");
      setForbidden(false);

      if (user.role === "admin") {
        const response = await getCourses(token);
        const list = response.data?.courses ?? response.data;

        setCourses(Array.isArray(list) ? list : []);
      }

      if (user.role === "learner") {
        const response = await getMyEnrollments(token);
        const list =
          response.data?.enrollments ?? response.data;

        setMyCourses(Array.isArray(list) ? list : []);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setSession(null);
    setCourses([]);
    setMyCourses([]);
    setCurrentView("dashboard");
    setError("");
    setForbidden(false);
  }

  async function refreshCourses() {
    try {
      setCoursesLoading(true);
      setCoursesError("");

      const response = await getCourses(session.token);
      const list = response.data?.courses ?? response.data;

      setCourses(Array.isArray(list) ? list : []);
    } catch (err) {
      handleApiError(err);
      setCoursesError(err.message);
    } finally {
      setCoursesLoading(false);
    }
  }

  async function handleCourseAction(action) {
    try {
      setSaving(true);
      setError("");

      await action();
      await refreshCourses();
    } catch (err) {
      handleApiError(err);
    } finally {
      setSaving(false);
    }
  }

  if (!session) {
    return (
      <LoginPage
        onLogin={handleLogin}
        loading={loading}
        error={error}
      />
    );
  }

  const user = session.user;
  
  if (!["admin", "learner"].includes(user.role)) {
  return (
    <AppShell user={user} onLogout={handleLogout}>
      <p role="alert">Accès refusé</p>
    </AppShell>
  );
}

  return (
    <AppShell user={user} onLogout={handleLogout}>
      {forbidden && (
        <p role="alert">
          Accès refusé
        </p>
      )}

      {user.role === "admin" && (
        <ProtectedView
          session={session}
          allowedRoles={["admin"]}
        >
          <AdminLayout
            currentView={currentView}
            onNavigate={setCurrentView}
          >
            {currentView === "dashboard" && (
              <AdminDashboard />
            )}

            {currentView === "courses" && (
              <CoursesPage
                courses={courses}
                loading={coursesLoading}
                error={coursesError}
                saving={saving}
                onCreateCourse={(data) =>
                  handleCourseAction(() =>
                    createCourse(data, session.token)
                  )
                }
                onUpdateCourse={(id, data) =>
                  handleCourseAction(() =>
                    updateCourse(id, data, session.token)
                  )
                }
                onPublishCourse={(id) =>
                  handleCourseAction(() =>
                    publishCourse(id, session.token)
                  )
                }
                onUnpublishCourse={(id) =>
                  handleCourseAction(() =>
                    unpublishCourse(id, session.token)
                  )
                }
                onArchiveCourse={(id) =>
                  handleCourseAction(() =>
                    archiveCourse(id, session.token)
                  )
                }
              />
            )}
          </AdminLayout>
        </ProtectedView>
      )}

      {user.role === "learner" && (
        <ProtectedView
          session={session}
          allowedRoles={["learner"]}
        >
          <LearnerLayout user={user}>
            {currentView === "dashboard" && (
              <LearnerDashboard user={user} />
            )}

            {currentView === "courses" && (
              <LearnerCoursesPage
                courses={myCourses}
                loading={false}
                error={error}
              />
            )}

            <button
              type="button"
              onClick={() => setCurrentView("dashboard")}
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => setCurrentView("courses")}
            >
              Mes cours
            </button>
          </LearnerLayout>
        </ProtectedView>
      )}
    </AppShell>
  );
}

export default App;

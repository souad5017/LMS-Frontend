
function AdminLayout({ currentView, onNavigate, children }) {
  return (
    <div className="admin-layout">
      <nav aria-label="Admin navigation">
        <button
          type="button"
          onClick={() => onNavigate("dashboard")}
          aria-current={currentView === "dashboard" ? "page" : undefined}
        >
          Dashboard
        </button>

        <button
          type="button"
          onClick={() => onNavigate("courses")}
          aria-current={currentView === "courses" ? "page" : undefined}
        >
          Courses
        </button>
      </nav>

      <main>{children}</main>
    </div>
  );
}

export default AdminLayout;

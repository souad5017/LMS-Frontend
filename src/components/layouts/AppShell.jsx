
import Button from "../common/Button";

function AppShell({ user, onLogout, children }) {
  return (
    <div className="app-shell">
      <header>
        <div>
          <h1>EduLearn LMS</h1>
          <p>{user.name} ({user.role})</p>
        </div>

        <Button onClick={onLogout}>
          Logout
        </Button>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}

export default AppShell;

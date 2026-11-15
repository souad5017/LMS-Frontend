
import LoginForm from "../components/auth/LoginForm";

function LoginPage({ onLogin, loading, error }) {
  return (
    <main>
      <LoginForm
        onLogin={onLogin}
        loading={loading}
        error={error}
      />
    </main>
  );
}

export default LoginPage;

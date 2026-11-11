
import { useState } from "react";
import LoginForm from "./components/auth/LoginForm";

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(credentials) {
    console.log(credentials);
  }

  return (
    <div>
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <h1>Welcome {user.name}</h1>
      )}
    </div>
  );
}

export default App;

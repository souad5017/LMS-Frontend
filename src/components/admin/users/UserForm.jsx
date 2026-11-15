
import { useState } from "react";
import Button from "../../common/Button";

function UserForm({ initialData, onSubmit, onCancel, loading }) {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [role, setRole] = useState(initialData?.role || "learner");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      name,
      email,
      role
    };

    if (password) {
      userData.password = password;
    }

    onSubmit(userData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit User" : "Create User"}</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="role">Role</label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="trainer">Trainer</option>
        <option value="learner">Learner</option>
      </select>

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={!initialData}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>

      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
}

export default UserForm;

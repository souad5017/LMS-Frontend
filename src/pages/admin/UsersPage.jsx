
import { useState } from "react";
import UserList from "../../components/admin/users/UserList";
import UserForm from "../../components/admin/users/UserForm";

function UsersPage({
  users,
  loading,
  error,
  onCreateUser,
  onUpdateUser,
  saving
}) {
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "all" || user.accountStatus === statusFilter;

    return matchesRole && matchesStatus;
  });

  const selectedUser = users.find(
    (user) => user._id === selectedId
  );

  function handleSubmit(userData) {
    if (editingUser) {
      onUpdateUser(editingUser._id, userData);
    } else {
      onCreateUser(userData);
    }
  }

  return (
    <section>
      <h2>Manage Users</h2>

      <div>
        <label htmlFor="roleFilter">Filter by role</label>
        <select
          id="roleFilter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="trainer">Trainer</option>
          <option value="learner">Learner</option>
        </select>

        <label htmlFor="statusFilter">Filter by status</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <button
        type="button"
        onClick={() => {
          setEditingUser(null);
          setShowForm(true);
        }}
      >
        Create User
      </button>

      <UserList
        users={filteredUsers}
        selectedId={selectedId}
        onSelectUser={setSelectedId}
        loading={loading}
        error={error}
      />

      {selectedUser && (
        <div>
          <h3>User Details</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Role: {selectedUser.role}</p>
          <p>Status: {selectedUser.accountStatus}</p>

          <button
            type="button"
            onClick={() => {
              setEditingUser(selectedUser);
              setShowForm(true);
            }}
          >
            Edit User
          </button>
        </div>
      )}

      {showForm && (
        <UserForm
          initialData={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          loading={saving}
        />
      )}
    </section>
  );
}

export default UsersPage;

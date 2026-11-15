
function UserCard({ user, selected, onSelect }) {
  return (
    <article>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
      >
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
        <p>Status: {user.accountStatus}</p>
      </button>
    </article>
  );
}

export default UserCard;

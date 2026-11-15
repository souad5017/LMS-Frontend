
function LearnerDashboard({ user }) {
  return (
    <section>
      <h2>Bienvenue, {user.name} !</h2>

      <p>Welcome to your learning space.</p>

      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    </section>
  );
}

export default LearnerDashboard;

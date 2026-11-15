
function LearnerLayout({ user, children }) {
  return (
    <div className="learner-layout">
      <header>
        <h1>EduLearn LMS</h1>
        <p>Bienvenue, {user.name} !</p>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}

export default LearnerLayout;

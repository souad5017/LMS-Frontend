
function CoursesPage({ courses, loading, error }) {
  if (loading) {
    return <p>Loading your courses...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (courses.length === 0) {
    return (
      <section>
        <h2>Mes cours</h2>
        <p>You are not enrolled in any courses yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Mes cours</h2>

      <div>
        {courses.map((course) => (
          <article key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.category}</p>
            <p>{course.level}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CoursesPage;


import CourseCard from "./CourseCard";

function CourseList({
  courses,
  selectedId,
  onSelectCourse,
  loading,
  error
}) {
  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (courses.length === 0) {
    return <p>No courses found.</p>;
  }

  return (
    <section>
      <h2>Courses</h2>

      <div>
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            selected={selectedId === course._id}
            onSelect={() => onSelectCourse(course._id)}
          />
        ))}
      </div>
    </section>
  );
}

export default CourseList;

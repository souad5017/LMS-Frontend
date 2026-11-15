
function CourseCard({ course, selected, onSelect }) {
  return (
    <article>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
      >
        <h3>{course.title}</h3>

        <p>Category: {course.category}</p>
        <p>Level: {course.level}</p>
        <p>Description: {course.description}</p>
        <p>Duration: {course.estimatedDuration} minutes</p>
        <p>Status: {course.status}</p>
      </button>
    </article>
  );
}

export default CourseCard;

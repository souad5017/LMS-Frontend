
import { useState } from "react";
import CourseList from "../../components/admin/courses/CourseList";
import CourseForm from "../../components/admin/courses/CourseForm";

function CoursesPage({
  courses,
  loading,
  error,
  onCreateCourse,
  onUpdateCourse,
  onPublishCourse,
  onUnpublishCourse,
  onArchiveCourse,
  saving
}) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    ...new Set(courses.map((course) => course.category))
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      categoryFilter === "all" ||
      course.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" ||
      course.status === statusFilter;

    return matchesCategory && matchesStatus;
  });

  const selectedCourse = courses.find(
    (course) => course._id === selectedId
  );

  function handleSubmit(courseData) {
    if (editingCourse) {
      onUpdateCourse(editingCourse._id, courseData);
    } else {
      onCreateCourse(courseData);
    }
  }

  function confirmAction(action, courseId) {
    if (window.confirm("Are you sure?")) {
      action(courseId);
    }
  }

  return (
    <section>
      <h2>Manage Courses</h2>

      <label htmlFor="categoryFilter">Category</label>
      <select
        id="categoryFilter"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="all">All categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="statusFilter">Status</label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All statuses</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>

      <button
        type="button"
        onClick={() => {
          setEditingCourse(null);
          setShowForm(true);
        }}
      >
        Create Course
      </button>

      <CourseList
        courses={filteredCourses}
        selectedId={selectedId}
        onSelectCourse={setSelectedId}
        loading={loading}
        error={error}
      />

      {selectedCourse && (
        <div>
          <h3>{selectedCourse.title}</h3>
          <p>Category: {selectedCourse.category}</p>
          <p>Level: {selectedCourse.level}</p>
          <p>Status: {selectedCourse.status}</p>

          <button
            type="button"
            onClick={() => {
              setEditingCourse(selectedCourse);
              setShowForm(true);
            }}
          >
            Edit Course
          </button>

          <button
            type="button"
            onClick={() =>
              confirmAction(onPublishCourse, selectedCourse._id)
            }
          >
            Publish
          </button>

          <button
            type="button"
            onClick={() =>
              confirmAction(onUnpublishCourse, selectedCourse._id)
            }
          >
            Unpublish
          </button>

          <button
            type="button"
            onClick={() =>
              confirmAction(onArchiveCourse, selectedCourse._id)
            }
          >
            Archive
          </button>
        </div>
      )}

      {showForm && (
        <CourseForm
          initialData={editingCourse}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          loading={saving}
        />
      )}
    </section>
  );
}

export default CoursesPage;

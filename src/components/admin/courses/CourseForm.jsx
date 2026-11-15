
import { useState } from "react";
import Button from "../../common/Button";

function CourseForm({ initialData, onSubmit, onCancel, loading }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [level, setLevel] = useState(initialData?.level || "beginner");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [objectives, setObjectives] = useState(
    initialData?.objectives?.join("\n") || ""
  );
  const [estimatedDuration, setEstimatedDuration] = useState(
    initialData?.estimatedDuration || ""
  );

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      title,
      description,
      objectives: objectives
        .split("\n")
        .map((objective) => objective.trim())
        .filter(Boolean),
      level,
      category,
      estimatedDuration: Number(estimatedDuration)
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Course" : "Create Course"}</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <label htmlFor="level">Level</label>
      <select
        id="level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        required
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="objectives">Objectives (one per line)</label>
      <textarea
        id="objectives"
        value={objectives}
        onChange={(e) => setObjectives(e.target.value)}
        required
      />

      <label htmlFor="estimatedDuration">
        Estimated Duration (minutes)
      </label>
      <input
        id="estimatedDuration"
        type="number"
        min="1"
        value={estimatedDuration}
        onChange={(e) => setEstimatedDuration(e.target.value)}
        required
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

export default CourseForm;

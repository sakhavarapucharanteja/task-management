import React, { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSubmit: (task: Task) => void;
  editTask?: Task | null;
}

const TaskForm: React.FC<Props> = ({ onSubmit, editTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Done">(
    "To Do"
  );
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDueDate(editTask.dueDate);
      setPriority(editTask.priority);
      setStatus(editTask.status);
      setTags(editTask.tags.join(", "));
    }
  }, [editTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: editTask ? editTask.id : uuidv4(),
      title,
      description,
      dueDate,
      priority,
      status,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    onSubmit(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
    setStatus("To Do");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">{editTask ? "Update" : "Add"} Task</button>
    </form>
  );
};

export default TaskForm;

import React from "react";
import { Task } from "../types/Task";

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>
        <strong>Due:</strong> {task.dueDate}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags.join(", ")}
      </p>
      <div className="task-buttons">
        <button onClick={onEdit} className="edit-btn">
          Edit
        </button>
        <button onClick={onDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

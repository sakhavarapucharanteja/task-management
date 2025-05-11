import React, { useState } from "react";
import { Task } from "../types/Task";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

interface Props {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onUpdate, onDelete }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdate = (task: Task) => {
    onUpdate(task);
    setEditingTask(null);
  };

  return (
    <div>
      {editingTask && (
        <TaskForm onSubmit={handleUpdate} editTask={editingTask} />
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => handleEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;

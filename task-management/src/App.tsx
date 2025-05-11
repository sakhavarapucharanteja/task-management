import React, { useEffect, useState } from "react";
import "./App.css";
import { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks([...tasks, task]);

  const updateTask = (updated: Task) =>
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));

  const deleteTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;

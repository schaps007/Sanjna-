import React, { useEffect, useState } from "react";
import { Task } from "../types";
import { getTasks, createTask, updateTask, deleteTask } from "../api";

interface TaskListProps {
  token: string;
}

const TaskList: React.FC<TaskListProps> = ({ token }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const loadTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, [token]);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await createTask(token, newTitle, newDescription);
      setTasks((prev) => [...prev, res.data]);
      setNewTitle("");
      setNewDescription("");
    } catch {
      setError("Failed to add task");
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      const updated = await updateTask(token, task.id, {
        isComplete: !task.isComplete,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updated.data : t))
      );
    } catch {
      setError("Failed to update task");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const res = await updateTask(token, id, {
        title: editTitle,
        description: editDescription,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
      setEditingId(null); // exit edit mode
    } catch {
      setError("Failed to update task");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete task");
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="New task title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="New task description (optional)"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <br />
      <button onClick={handleAdd}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: "10px 0" }}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={() => toggleComplete(task)}
            />
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit title"
                />
                <br />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Edit description"
                />
                <br />
                <button onClick={() => handleUpdate(task.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{task.title}</strong> - {task.description}
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setEditTitle(task.title);
                    setEditDescription(task.description || "");
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

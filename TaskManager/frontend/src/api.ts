import axios from "axios";

const API_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
});

export const register = (username: string, password: string) =>
  api.post("/auth/register", { username, password });

export const login = (username: string, password: string) =>
  api.post("/auth/login", { username, password });

export const getTasks = (token: string) =>
  api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (token: string, title: string, description?: string) =>
  api.post(
    "/tasks",
    { title, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const updateTask = (
  token: string,
  id: number,
  updates: { title?: string; description?: string; isComplete?: boolean }
) =>
  api.put(`/tasks/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (token: string, id: number) =>
  api.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

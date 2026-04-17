import { authFetch } from "./api";

interface taskData {
  title: string;
}

export const createTask = async (task: taskData) => {
  try {
    const response = await authFetch(`/api/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
    });
    const data = await response.json();
   
    
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    return [];
  }
};

export const getTasks = async () => {
  try {
    const response = await authFetch(`/api/tasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getsingleTask = async (id: string|number) => {
  try {
    const response = await authFetch(`/api/tasks/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching task:", error);
    return [];
  }
};

export const deleteTask = async (id: string|number) => {
  try {
    const response = await authFetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    return [];
  }
};

export const updateTask = async (id: string|number, task: taskData) => {
  try {
    const response = await authFetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating task:", error);
    return [];
  }
};

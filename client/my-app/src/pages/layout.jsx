import { Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "../components/sideBar";
import { TaskForm } from "../components/taskModal";
import { API_URL, API_TOKEN } from "../constants/constants";

export default function Layout() {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const match = /\/projects\/([^/]+)/.exec(location.pathname);
  const activeProject = match ? match[1].toUpperCase() : "";

  // sluiter
  function closeForm() {
    setTaskToEdit(null);
  }

  // save en update
  async function saveTask(task) {
    const hasId = Boolean(task.documentId);
    const url = hasId
      ? `${API_URL}/tasks/${task.documentId}`
      : `${API_URL}/tasks`;
    const method = hasId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          title: task.title,
          description: task.description,
          task_types: task.task_types,
          state: task.state,
          project: task.project,
        },
      }),
    });

    if (response.ok) {
      setMessage("Task saved successfully.");
    } else {
      setMessage("Error saving task.");
    }

    closeForm();
  }

  // deletee
  async function deleteTask(task) {
    if (!task.documentId) return;

    const response = await fetch(`${API_URL}/tasks/${task.documentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (response.ok) {
      setMessage("Task deleted successfully.");
    } else {
      setMessage("Error deleting task.");
    }

    closeForm();
  }

  return (
    <>
      <aside>
        <Sidebar
          projects={["PGM-3", "PGM-4"]}
          activeProject={activeProject}
        />
      </aside>

      <main>
        <Outlet
          context={{
            setTaskToEdit,
          }}
        />
      </main>

      {taskToEdit && (
        <TaskForm
          task={taskToEdit}
          onClose={closeForm}
          onSubmit={saveTask}
          onDelete={deleteTask}
        />
      )}

      {message && <div className="notification">{message}</div>}
    </>
  );
}

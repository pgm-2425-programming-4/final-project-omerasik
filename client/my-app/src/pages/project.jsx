import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Outlet, useLocation } from "@tanstack/react-router";
import StatusBoard from "../components/boardLayout";
import TopBar from "../components/top";
import { TaskForm } from "../components/taskModal";
import { API_URL, API_TOKEN } from "../constants/constants";

export default function ProjectPage() {
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(null);
  const queryClient = useQueryClient();
  const location    = useLocation();

  const match     = location.pathname.match(/\/projects\/([^/]+)/);
  const projectId = match ? match[1] : "";
  const activeProject = projectId.toUpperCase();

  function closeForm() {
    setTaskToEdit(null);
  }

  function startAddTask() {
    setTaskToEdit({});
  }

  async function saveTask(task) {
    const id     = task.documentId;
    const url    = id ? `${API_URL}/tasks/${id}` : `${API_URL}/tasks`;
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ data: task }),
      });
      if (!res.ok) throw new Error();
      setNotification({ type: "success", message: "Task saved" });
    } catch {
      setNotification({ type: "error", message: "Could not save task" });
    } finally {
      closeForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  }

  async function deleteTask(task) {
    if (!task?.documentId) return;

    try {
      const res = await fetch(`${API_URL}/tasks/${task.documentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      if (!res.ok) throw new Error();
      setNotification({ type: "success", message: "Task deleted" });
    } catch {
      setNotification({ type: "error", message: "Could not delete task" });
    } finally {
      closeForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  }

  return (
    <>
      <header className="taskboard__header">
        <TopBar
          selectedLabel={selectedLabel}
          onLabelChange={setSelectedLabel}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={startAddTask}
          activeProject={activeProject}
        />
      </header>

      {!location.pathname.endsWith("/backlog") && (
        <StatusBoard
          project={activeProject}
          selectedLabel={selectedLabel}
          searchTerm={searchTerm}
          onEditTask={setTaskToEdit}
        />
      )}

      {taskToEdit && (
        <TaskForm
          task={taskToEdit}
          onClose={closeForm}
          onSubmit={saveTask}
          onDelete={deleteTask}
        />
      )}

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <Outlet />
    </>
  );
}

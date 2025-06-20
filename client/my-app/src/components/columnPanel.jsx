import React, { useState, useEffect } from 'react';
import { API_URL, API_TOKEN } from '../constants/constants';

export function StatusColumn({ status, project, selectedLabel, searchTerm, onEditTask }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}/tasks?filters[project][Name][$eq]=${encodeURIComponent(
        project
      )}&populate=*`,
      { headers: { Authorization: `Bearer ${API_TOKEN}` } }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setTasks(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [project]);

  // Filter by status, search term, and label
  const filteredTasks = tasks
    .filter((task) =>
      task.state?.title.toLowerCase() === status.toLowerCase()
    )
    .filter((task) => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        task.title?.toLowerCase().includes(term) ||
        (task.description || '').toLowerCase().includes(term)
      );
    })
    .filter((task) => {
      if (selectedLabel === 'All') return true;
      const names = (task.task_types || []).map((t) =>
        t.name.toLowerCase()
      );
      return names.includes(selectedLabel.toLowerCase());
    });

  return (
    <section className="StatusColumn-container">
      <h3 className="StatusColumn-title">{status}</h3>

      {loading && <p className="StatusColumn-message">Loading...</p>}
      {error && <p className="StatusColumn-message">Error: {error.message}</p>}
      {!loading && !error && filteredTasks.length === 0 && (
        <p className="StatusColumn-message">No tasks</p>
      )}

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="StatusColumn-card"
          onClick={() => onEditTask(task)}
        >
          <p className="StatusColumn-cardTitle">{task.title}</p>
          <div className="StatusColumn-taskTypes">
            {(task.task_types || []).map((type) => (
              <span key={type.id} className="StatusColumn-label">
                {type.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
export default function Backlog({ tasks }) {
  return (
    <div className="Backlog-wrapper">
      <table className="Backlog-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Update Date</th>
            <th>Status</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            const date = task.publishedAt
              ? new Date(task.publishedAt).toLocaleDateString()
              : "-";
            const labels = (task.task_types || [])
              .map(t => t.name)
              .join(", ") || "-";
            return (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description || "-"}</td>
                <td>{date}</td>
                <td>{task.state?.title || "-"}</td>
                <td>{labels}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

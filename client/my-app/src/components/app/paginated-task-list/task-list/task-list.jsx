export function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            {task.title}
          </li>
        );
      })}
    </ul>
  );
}
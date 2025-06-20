import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL, API_TOKEN } from "../constants/constants";
import Backlog from "./components_backlog";
import { Pagination } from "./pagination";

export function PaginatedBacklog({ projectId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["backlog", projectId, currentPage, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/tasks?filters[project][Name][$eq]=${projectId}` +
          `&populate=*` +
          `&pagination[page]=${currentPage}` +
          `&pagination[pageSize]=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Could not load tasks");
      }
      return res.json();
    },
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const tasks = data.data || [];
  const pageCount = data.meta?.pagination?.pageCount || 1;
  const totalTasks = data.meta?.pagination?.total || 0;

  return (
    <>
      <h2>Backlog: {projectId}</h2>
      <p>
        Showing {tasks.length} of {totalTasks} tasks
      </p>
      <Backlog tasks={tasks} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </>
  );
}

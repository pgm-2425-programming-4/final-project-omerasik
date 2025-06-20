import { useParams } from "@tanstack/react-router";
import { PaginatedBacklog } from "../components/backlogPagination";

export default function BacklogPage() {
  const { projectId } = useParams({ from: "/projects/$projectId/backlog" });
  console.log("Project ID:", projectId);

  return <PaginatedBacklog projectId={projectId} />;
}
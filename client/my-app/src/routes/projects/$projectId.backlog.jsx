import { createFileRoute } from "@tanstack/react-router";
import BacklogPage from "../../pages/backlogpage";

export const Route = createFileRoute("/projects/$projectId/backlog")({
  component: BacklogPage,
});
import { createFileRoute } from "@tanstack/react-router";
import ProjectPage from "../../pages/project";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPageWithParams,
});

function ProjectPageWithParams() {
  const { projectId } = Route.useParams();
  return <ProjectPage projectId={projectId} />;
}
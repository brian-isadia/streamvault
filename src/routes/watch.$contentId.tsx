import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/watch/$contentId")({
  component: WatchPage,
});

function WatchPage() {
  const { contentId } = Route.useParams();
  return <div>Playing {contentId}</div>;
}

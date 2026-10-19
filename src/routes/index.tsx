import { createFileRoute } from "@tanstack/react-router";
import { PortfolioView, PortfolioError, activityQuery } from "@/components/portfolio-view";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Vidit Sharma — Portfolio" },
    { name: "description", content: "Student and founder building thoughtful digital products." },
    { property: "og:title", content: "Vidit Sharma — Portfolio" },
    { property: "og:description", content: "Student and founder building thoughtful digital products." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  loader: ({context}) => context.queryClient.ensureQueryData(activityQuery),
  component: Page,
  errorComponent: PortfolioError,
  notFoundComponent: () => <div className="rail px-8 py-12">Page not found.</div>,
});

function Page() { return <PortfolioView page="home" />; }

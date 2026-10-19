import { createFileRoute } from "@tanstack/react-router";
import { PortfolioView, PortfolioError, activityQuery } from "@/components/portfolio-view";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [
    { title: "Vidit Sharma — Projects" },
    { name: "description", content: "Explore Vidit Sharma’s projects and technology stack." },
    { property: "og:title", content: "Vidit Sharma — Projects" },
    { property: "og:description", content: "Explore Vidit Sharma’s projects and technology stack." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  loader: ({context}) => context.queryClient.ensureQueryData(activityQuery),
  component: Page,
  errorComponent: PortfolioError,
  notFoundComponent: () => <div className="rail px-8 py-12">Page not found.</div>,
});

function Page() { return <PortfolioView page="projects" />; }

import { createFileRoute } from "@tanstack/react-router";
import { PortfolioView, PortfolioError, activityQuery } from "@/components/portfolio-view";

export const Route = createFileRoute("/writing")({
  head: () => ({ meta: [
    { title: "Vidit Sharma — Writing" },
    { name: "description", content: "Read Vidit Sharma’s writing and essays on Medium." },
    { property: "og:title", content: "Vidit Sharma — Writing" },
    { property: "og:description", content: "Read Vidit Sharma’s writing and essays on Medium." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  loader: ({context}) => context.queryClient.ensureQueryData(activityQuery),
  component: Page,
  errorComponent: PortfolioError,
  notFoundComponent: () => <div className="rail px-8 py-12">Page not found.</div>,
});

function Page() { return <PortfolioView page="writing" />; }

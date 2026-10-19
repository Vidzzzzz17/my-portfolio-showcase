import { createFileRoute } from "@tanstack/react-router";
import { PortfolioView, PortfolioError, activityQuery } from "@/components/portfolio-view";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Vidit Sharma — Contact" },
    { name: "description", content: "Get in touch with Vidit Sharma about ideas and collaborations." },
    { property: "og:title", content: "Vidit Sharma — Contact" },
    { property: "og:description", content: "Get in touch with Vidit Sharma about ideas and collaborations." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  loader: ({context}) => context.queryClient.ensureQueryData(activityQuery),
  component: Page,
  errorComponent: PortfolioError,
  notFoundComponent: () => <div className="rail px-8 py-12">Page not found.</div>,
});

function Page() { return <PortfolioView page="contact" />; }

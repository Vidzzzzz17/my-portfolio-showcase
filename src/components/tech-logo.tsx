import type { IconType } from "react-icons";
import { SiTypescript, SiJavascript, SiPython, SiCplusplus, SiSqlite, SiReact, SiNextdotjs, SiTailwindcss, SiShadcnui, SiRadixui, SiExpo, SiTanstack, SiNodedotjs, SiBun, SiPostgresql, SiMongodb, SiRedis, SiFastapi, SiFlask, SiPrisma, SiDrizzle, SiSupabase, SiDocker, SiKubernetes, SiClaude, SiCursor, SiLangchain, SiLanggraph, SiHuggingface, SiN8N, SiPosthog, SiFigma } from "react-icons/si";
import { TbBrandAws, TbBrandAdobePhotoshop, TbBrandFramerMotion } from "react-icons/tb";
import groq from "@/assets/groq.svg.asset.json";
import paper from "@/assets/paper.svg.asset.json";

const logoAssets: Record<string, string> = {
  Pinecone: "/pinecone-logo.svg",
  OpenPanel: "/openpanel-logo.svg",
};

const logos: Record<string, IconType> = {
  TypeScript: SiTypescript, JavaScript: SiJavascript, Python: SiPython, "C++": SiCplusplus, SQL: SiSqlite,
  React: SiReact, "Next.js": SiNextdotjs, "Tailwind CSS": SiTailwindcss,
  "shadcn/ui": SiShadcnui, "Radix UI": SiRadixui, Motion: TbBrandFramerMotion, Expo: SiExpo, TanStack: SiTanstack,
  "Node.js": SiNodedotjs, Bun: SiBun, PostgreSQL: SiPostgresql, MongoDB: SiMongodb, Redis: SiRedis,
  FastAPI: SiFastapi, Flask: SiFlask, Prisma: SiPrisma, "Drizzle ORM": SiDrizzle, Supabase: SiSupabase,
  Docker: SiDocker, Kubernetes: SiKubernetes, AWS: TbBrandAws, Claude: SiClaude, Cursor: SiCursor,
  LangChain: SiLangchain, LangGraph: SiLanggraph, "Hugging Face": SiHuggingface, n8n: SiN8N, PostHog: SiPosthog,
  Figma: SiFigma, Photoshop: TbBrandAdobePhotoshop,
};

// Names without a verified brand logo render a small monogram tile instead of a fake logo.
const marks: Record<string, string> = {
  "Base UI": "BU", "MobX-State-Tree": "MS", nginx: "N", "Express.js": "EJ", MySQL: "M", Firebase: "F",
  "REST APIs": "RA", JWT: "J", Vercel: "V", Gemini: "G", ChatGPT: "C", "AI SDK": "AS", Qdrant: "Q",
  "Scikit-Learn": "SL", Pydantic: "P", "Vector Embeddings": "VE", LLMs: "L", RAG: "R",
};

export function TechLogo({ name }: { name: string }) {
  const asset = name === "Groq" ? groq.url : name === "Paper" ? paper.url : logoAssets[name];
  if (asset) return <img src={asset} alt="" data-brand={name} className="tech-brand size-[22px] shrink-0 object-contain" />;
  const Logo = logos[name];
  if (Logo) return <Logo aria-hidden="true" data-brand={name} className="tech-brand size-[22px] shrink-0" />;
  const mark = marks[name] ?? name.split(" ").map((w) => w[0]).join("").toUpperCase();
  return (
    <span aria-hidden="true" data-brand={name} className="tech-brand flex size-[22px] shrink-0 items-center justify-center rounded-md bg-current/15 font-mono text-[8px] font-bold leading-none">{mark}</span>
  );
}

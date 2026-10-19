import type { IconType } from "react-icons";
import { SiTypescript, SiJavascript, SiPython, SiCplusplus, SiReact, SiNextdotjs, SiTailwindcss, SiShadcnui, SiRadixui, SiExpo, SiTanstack, SiNodedotjs, SiBun, SiPostgresql, SiMongodb, SiRedis, SiFastapi, SiFlask, SiPrisma, SiDrizzle, SiSupabase, SiDocker, SiKubernetes, SiClaude, SiCursor, SiLangchain, SiLanggraph, SiHuggingface, SiN8N, SiPosthog, SiFigma } from "react-icons/si";
import { TbBrandAws, TbBrandAdobePhotoshop, TbBrandFramerMotion } from "react-icons/tb";
import groq from "@/assets/groq.svg.asset.json";
import paper from "@/assets/paper.svg.asset.json";

const logos: Record<string, IconType> = {
  TypeScript: SiTypescript, JavaScript: SiJavascript, Python: SiPython, "C++": SiCplusplus,
  SQL: SiPostgresql, React: SiReact, "Next.js": SiNextdotjs, "Tailwind CSS": SiTailwindcss,
  "shadcn/ui": SiShadcnui, "Radix UI": SiRadixui, Motion: TbBrandFramerMotion, Expo: SiExpo, TanStack: SiTanstack,
  "Node.js": SiNodedotjs, Bun: SiBun, PostgreSQL: SiPostgresql, MongoDB: SiMongodb, Redis: SiRedis,
  FastAPI: SiFastapi, Flask: SiFlask, Prisma: SiPrisma, "Drizzle ORM": SiDrizzle, Supabase: SiSupabase,
  Docker: SiDocker, Kubernetes: SiKubernetes, AWS: TbBrandAws, Claude: SiClaude, Cursor: SiCursor,
  LangChain: SiLangchain, LangGraph: SiLanggraph, "Hugging Face": SiHuggingface, n8n: SiN8N, PostHog: SiPosthog,
  Figma: SiFigma, Photoshop: TbBrandAdobePhotoshop,
};

export function TechLogo({ name }: { name: string }) {
  const asset = name === "Groq" ? groq : name === "Paper" ? paper : null;
  if (asset) return <img src={asset.url} alt="" data-brand={name} className="tech-brand size-[22px] shrink-0 object-contain" />;
  const Logo = logos[name];
  return Logo ? <Logo aria-hidden="true" data-brand={name} className="tech-brand size-[22px] shrink-0" /> : null;
}
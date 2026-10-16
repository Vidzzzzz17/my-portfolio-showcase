import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getActivity, type Day } from "@/lib/activity.functions";

const activityQuery = queryOptions({ queryKey: ["activity"], queryFn: () => getActivity(), staleTime: 10 * 60_000 });
import logo from "@/assets/logo.png.asset.json";
import avatar from "@/assets/avatar.png.asset.json";
import banner from "@/assets/banner.png.asset.json";
import b1 from "@/assets/b1.png.asset.json";
import b2 from "@/assets/b2.png.asset.json";
import b3 from "@/assets/b3.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vidit Sharma — Portfolio" },
      { name: "description", content: "Student & founder in India building thoughtful digital products across AI and full-stack engineering." },
      { property: "og:title", content: "Vidit Sharma — Portfolio" },
      { property: "og:description", content: "Thoughtful digital products that make complicated ideas feel clear and useful." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(activityQuery),
  component: Index,
});

const projects = [
  { n: "01", t: "Folio — AI agent dashboard", d: "A shared runtime for tools, context, and execution — turning ambitious ideas into repeatable workflows.", tags: ["React", "TypeScript", "Vercel"], y: "2026" },
  { n: "02", t: "Gridline — AI-powered code editor", d: "A focused environment that makes the distance between an idea and a working prototype feel smaller.", tags: ["TypeScript", "React", "AI tooling"], y: "2025" },
  { n: "03", t: "Kernel — LLM-based chatbot", d: "A conversational layer for powerful tools, designed to feel direct, useful, and human.", tags: ["LLMs", "Shared runtime"], y: "2024" },
];
const writing = [
  ["ESSAY", "Building Substrate: one runtime, three products", "8 min · 2026"],
  ["PROCESS", "Designing Kernel’s mark", "5 min · 2026"],
  ["NOTES", "What a year on Folio taught me about scope", "7 min · 2025"],
  ["BUILD LOG", "A generative art experiment in Canvas", "6 min · 2025"],
  ["BUILD LOG", "Small tool, real use: building an attendance streak tracker", "4 min · 2025"],
  ["NOTES", "Dynamic programming patterns I keep coming back to", "9 min · 2025"],
];
const stack: [string, string[]][] = [
  ["01 Languages", ["TypeScript", "JavaScript", "Python", "C++", "SQL"]],
  ["02 Frontend", ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Radix UI", "Motion", "Expo", "TanStack"]],
  ["03 Backend & Database", ["Node.js", "Bun", "PostgreSQL", "MongoDB", "Redis", "FastAPI", "Flask", "Prisma", "Drizzle ORM", "Supabase", "Docker", "Kubernetes", "AWS"]],
  ["04 Workflow & AI", ["Claude", "Cursor", "LangChain", "LangGraph", "RAG", "Pinecone", "Hugging Face", "Groq", "n8n"]],
  ["05 Analytics · 06 Design", ["OpenPanel", "PostHog", "Figma", "Paper", "Photoshop"]],
];
const certs = [
  ["AI Fluency: Framework & Foundations", "Anthropic"],
  ["Agents and Workflows", "OpenAI Academy · Aug 8, 2026"],
  ["AI Fluency for students", "Anthropic"],
  ["AI Foundations", "OpenAI Academy · Aug 8, 2026"],
  ["Introduction to Claude Cowork", "Anthropic"],
];
const socials: [string, string][] = [
  ["GitHub", "https://github.com/Vidzzzzz17"],
  ["X", "https://x.com/vidit1727"],
  ["LinkedIn", "https://www.linkedin.com/in/vidit-sharma-914202380/"],
  ["YouTube", "https://www.youtube.com/channel/UCArPB2BlwPGY2ZioGhv0SOg"],
  ["Instagram", "https://www.instagram.com/vidit5791/"],
  ["Threads", "https://www.threads.com/@vidit5791"],
  ["Medium", "https://medium.com/@vidit1727"],
  ["Reddit", "https://www.reddit.com/user/Round_Worldliness583/"],
  ["LeetCode", "https://leetcode.com/u/Vidzzzzz17/"],
  ["Email", "mailto:vidit1727@gmail.com"],
];

const heat = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"];
function Heatmap({ days }: { days: Day[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-max">
        {days.map((d) => <div key={d.date} title={`${d.count} on ${d.date}`} className={`size-[10px] rounded-[2px] ${heat[Math.min(4, d.level)]}`} />)}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
        Less {heat.map((h) => <span key={h} className={`size-[10px] rounded-[2px] ${h}`} />)} More
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-border px-6 py-12 sm:px-10">
      <h2 className="label-mono mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Index() {
  const [sent, setSent] = useState(false);
  const { data } = useSuspenseQuery(activityQuery);
  const gh = data.github;
  const lc = data.leetcode;
  const solved = lc?.solved ?? { All: 177, Easy: 39, Medium: 98, Hard: 40 };
  return (
    <div id="top" className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="rail flex h-16 items-center justify-between px-6">
          <a href="#top" aria-label="Home"><img src={logo.url} alt="Vidit Sharma logo" className="size-9" /></a>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            {["Projects", "Writing", "Contact"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="transition-colors hover:text-foreground">{n}</a>
            ))}
          </nav>
        </div>
      </header>

      <main className="rail">
        <div className="relative h-48 overflow-hidden sm:h-56">
          <img src={banner.url} alt="Stay curious" className="size-full object-cover" />
          <div className="absolute bottom-4 left-6 flex gap-4 font-mono text-[10px] tracking-[0.14em] text-primary-foreground sm:left-10">
            01 / MAKE IT USEFUL · 02 / SWEAT THE DETAILS · 03 / STAY CURIOUS
          </div>
        </div>

        <section className="px-6 pb-12 sm:px-10">
          <img src={avatar.url} alt="Vidit Sharma" className="-mt-16 size-32 rounded-2xl border-4 border-background bg-card object-cover shadow-sm" />
          <p className="label-mono mt-6">◐ Student & Founder · India</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Vidit Sharma</h1>
          <p className="mt-2 text-lg text-muted-foreground">Building thoughtful digital products.</p>
          <div className="mt-8 max-w-xl space-y-4 leading-relaxed">
            <p>I build thoughtful digital products that make complicated ideas feel clear and useful.</p>
            <p className="text-muted-foreground">Right now I'm deep in AI, full-stack engineering, and building products from the first sketch to the shipped detail.</p>
            <p className="text-muted-foreground">Open to ambitious ideas, thoughtful collaborators, and hard problems worth solving.</p>
          </div>
          <div className="mt-8 inline-flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3">
            <span className="text-xs text-muted-foreground">♪</span>
            <div>
              <p className="text-sm font-medium">La Campanella (1826)</p>
              <p className="text-xs text-muted-foreground">Niccolò Paganini · the music I keep coming back to</p>
            </div>
          </div>
        </section>

        <Section id="projects" title="Selected work">
          <div className="divide-y divide-border">
            {projects.map((p) => (
              <a key={p.n} href="https://github.com/Vidzzzzz17" target="_blank" rel="noreferrer" className="group flex gap-6 py-6 first:pt-0">
                <span className="font-mono text-xs text-muted-foreground pt-1">{p.n}</span>
                <div className="flex-1">
                  <h3 className="font-medium group-hover:underline underline-offset-4">{p.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{t}</span>)}
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground pt-1">{p.y} ↗</span>
              </a>
            ))}
          </div>
        </Section>

        <Section id="activity" title="Activity">
          <div className="mb-3 flex justify-between text-sm">
            <span>{gh ? `${gh.total.toLocaleString()} contributions in the last year` : "GitHub activity unavailable right now"}</span>
            <a href="https://github.com/Vidzzzzz17" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">GitHub @Vidzzzzz17 ↗</a>
          </div>
          {gh && <Heatmap days={gh.days} />}

          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <div className="flex justify-between text-sm">
              <span className="font-medium">LeetCode</span>
              <a href="https://leetcode.com/u/Vidzzzzz17/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">Vidzzzzz17{lc ? ` · Rank ${lc.ranking.toLocaleString()}` : ""} ↗</a>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-semibold">{solved["All"]}<span className="text-base text-muted-foreground">/4082</span></p>
                <p className="text-xs text-muted-foreground">✓ Solved</p>
                <div className="mt-4 space-y-2 text-sm">
                  {[["Easy", solved["Easy"], 971], ["Med.", solved["Medium"], 2128], ["Hard", solved["Hard"], 983]].map(([l, a, b]) => (
                    <div key={l as string}>
                      <div className="flex justify-between"><span>{l}</span><span className="text-muted-foreground">{a}/{b}</span></div>
                      <div className="mt-1 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-accent" style={{ width: `${((a as number) / (b as number)) * 100 * 4}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Badges</p>
                <p className="text-2xl font-medium">3</p>
                <div className="my-3 flex items-center justify-around">
                  <img src={b1.url} alt="Badge" className="h-16" />
                  <img src={b3.url} alt="50 Days Badge 2026" className="h-20" />
                  <img src={b2.url} alt="Badge" className="h-16" />
                </div>
                <p className="text-xs text-muted-foreground">Most recent: 50 Days Badge 2026</p>
              </div>
            </div>
            <div className="mt-6 mb-3 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
              <span>{lc ? `${lc.submissions} submissions in the past one year` : "LeetCode activity unavailable right now"}</span>
              {lc && <span>Total active days: {lc.activeDays} · Max streak: {lc.streak}</span>}
            </div>
            {lc && <Heatmap days={lc.days} />}
          </div>
        </Section>

        <Section id="writing" title="Writing">
          <p className="mb-6 text-muted-foreground">Notes from building products, learning the craft, and following ideas a little further.</p>
          <div className="divide-y divide-border">
            {writing.map(([k, t, m]) => (
              <div key={t} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:gap-6">
                <span className="label-mono w-24 shrink-0">{k}</span>
                <span className="flex-1">{t}</span>
                <span className="font-mono text-xs text-muted-foreground">{m}</span>
              </div>
            ))}
          </div>
          <a href="https://medium.com/@vidit1727" target="_blank" rel="noreferrer" className="mt-6 inline-block text-sm underline underline-offset-4">Explore all writing ↗</a>
        </Section>

        <Section title="Technology stack">
          <div className="space-y-8">
            {stack.map(([g, items]) => (
              <div key={g}>
                <p className="label-mono mb-3">{g}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((i) => <span key={i} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Certificates">
          <div className="grid gap-3 sm:grid-cols-2">
            {certs.map(([t, o]) => (
              <div key={t} className="rounded-xl border border-border bg-card p-4">
                <p className="font-medium">{t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{o} ↗</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <h3 className="text-3xl font-semibold tracking-tight">Let's make something useful.</h3>
          <p className="mt-2 text-muted-foreground">Have a good idea? Send a note.</p>
          <form
            className="mt-8 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              window.location.href = `mailto:vidit1727@gmail.com?subject=${encodeURIComponent("Hello from " + f.get("name"))}&body=${encodeURIComponent(String(f.get("message")) + "\n\n— " + f.get("email"))}`;
              setSent(true);
            }}
          >
            {[["name", "Name", "text"], ["email", "Email", "email"]].map(([n, l, t]) => (
              <label key={n} className="grid gap-1.5">
                <span className="label-mono">{l}</span>
                <input required name={n} type={t} className="h-11 rounded-lg border border-input bg-card px-3 outline-none focus:ring-2 focus:ring-ring" />
              </label>
            ))}
            <label className="grid gap-1.5">
              <span className="label-mono">Message</span>
              <textarea required name="message" rows={5} className="rounded-lg border border-input bg-card p-3 outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <button className="h-11 w-fit rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              {sent ? "Opening your email…" : "Send message ↗"}
            </button>
          </form>
        </Section>

        <footer className="border-t border-border px-6 py-12 sm:px-10">
          <div className="grid gap-8 sm:grid-cols-[2fr_1fr_1fr]">
            <div>
              <p className="font-medium">Vidit Sharma</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">Student & founder in India. I build thoughtful digital products that make complicated ideas feel clear and useful.</p>
            </div>
            {[socials.slice(0, 5), socials.slice(5)].map((col, i) => (
              <div key={i}>
                <p className="label-mono mb-3">{i ? "More" : "Elsewhere"}</p>
                <ul className="space-y-1.5 text-sm">
                  {col.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">{n}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-between text-xs text-muted-foreground">
            <span>© 2026 Vidit Sharma</span>
            <a href="#top" className="hover:text-foreground">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

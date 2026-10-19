import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { BadgeCheck, Search } from "lucide-react";
import {
  SiGithub, SiX, SiYoutube, SiThreads, SiInstagram, SiMedium, SiReddit, SiLeetcode, SiDiscord,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import type { IconType } from "react-icons";
import { TextRoll } from "@/components/text-roll";
import { TechLogo } from "@/components/tech-logo";
import { getActivity, type Day } from "@/lib/activity.functions";
import logo from "@/assets/logo.png.asset.json";
import avatar from "@/assets/avatar.png.asset.json";
import banner from "@/assets/banner.png.asset.json";
import b1 from "@/assets/b1.png.asset.json";
import b2 from "@/assets/b2.png.asset.json";
import b3 from "@/assets/b3.png.asset.json";

const activityQuery = queryOptions({
  queryKey: ["activity"],
  queryFn: () => getActivity(),
  staleTime: 10 * 60_000,
  refetchInterval: 10 * 60_000,
});

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
const S = {
  github: "https://github.com/Vidzzzzz17",
  x: "https://x.com/vidit1727",
  linkedin: "https://www.linkedin.com/in/vidit-sharma-914202380/",
  youtube: "https://www.youtube.com/channel/UCArPB2BlwPGY2ZioGhv0SOg",
  instagram: "https://www.instagram.com/vidit5791/",
  threads: "https://www.threads.com/@vidit5791",
  medium: "https://medium.com/@vidit1727",
  reddit: "https://www.reddit.com/user/Round_Worldliness583/",
  leetcode: "https://leetcode.com/u/Vidzzzzz17/",
  email: "mailto:vidit1727@gmail.com",
};
const icons: [string, string, IconType][] = [
  ["GitHub", S.github, SiGithub], ["X", S.x, SiX], ["YouTube", S.youtube, SiYoutube],
  ["Threads", S.threads, SiThreads], ["LinkedIn", S.linkedin, FaLinkedinIn], ["Email", S.email, MdOutlineMail],
  ["Instagram", S.instagram, SiInstagram], ["Medium", S.medium, SiMedium], ["Reddit", S.reddit, SiReddit],
  ["LeetCode", S.leetcode, SiLeetcode], ["Discord", "https://discord.com", SiDiscord],
];
const nav = [["Home", "#top"], ["Projects", "#projects"], ["Writing", "#writing"], ["Contact", "#contact"]];

const heat = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Heatmap({ days }: { days: Day[] }) {
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  let last = -1;
  const labels = weeks.map((w) => {
    const m = new Date(w[0]?.date ?? 0).getUTCMonth();
    if (m === last) return "";
    last = m;
    return MONTHS[m];
  });
  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="flex w-max gap-2">
          <div className="grid grid-rows-[16px_repeat(7,12px)] gap-[3px] pr-1 font-mono text-[11px] text-muted-foreground">
            <span />
            {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => <span key={i} className="leading-[12px]">{d}</span>)}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((w, i) => (
              <div key={i} className="grid grid-rows-[16px_repeat(7,12px)] gap-[3px]">
                <span className="w-[12px] overflow-visible whitespace-nowrap font-mono text-[11px] text-muted-foreground">{labels[i]}</span>
                {w.map((d) => (
                  <div key={d.date} title={`${d.count} on ${d.date}`} className={`size-[12px] rounded-[2px] ${heat[Math.min(4, d.level)]}`} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[12px] text-muted-foreground">
        Less {heat.map((h) => <span key={h} className={`size-[12px] rounded-[2px] ${h}`} />)} More
      </div>
    </div>
  );
}

function Ring({ easy, med, hard, solved, total }: { easy: number; med: number; hard: number; solved: number; total: number }) {
  const r = 62, c = 2 * Math.PI * r, span = 0.75, gap = 0.025;
  const parts = [
    { v: easy, t: 971, cls: "stroke-easy" },
    { v: med, t: 2128, cls: "stroke-medium" },
    { v: hard, t: 983, cls: "stroke-hard" },
  ];
  const sum = parts.reduce((a, p) => a + p.t, 0);
  let offset = 0;
  return (
    <div className="relative size-40">
      <svg viewBox="0 0 160 160" className="size-full rotate-[135deg]">
        {parts.map((p) => {
          const len = (p.t / sum) * (span - gap * 2) * c;
          const prog = Math.max(len * (p.v / p.t), 4);
          const start = offset;
          offset += len + gap * c;
          return (
            <g key={p.cls} className={p.cls} fill="none" strokeLinecap="round" strokeWidth={5}>
              <circle cx={80} cy={80} r={r} strokeOpacity={0.25} strokeDasharray={`${len} ${c}`} strokeDashoffset={-start} />
              <circle cx={80} cy={80} r={r} strokeDasharray={`${prog} ${c}`} strokeDashoffset={-start} />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-medium">{solved}<span className="text-base text-muted-foreground">/{total}</span></p>
        <p className="font-mono text-sm text-muted-foreground">✓ Solved</p>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border">
      <div className="rail">
        <h2 className="border-b border-border px-8 pb-3 pt-6 font-mono text-4xl tracking-tight">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Ext({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>;
}

function SocialIcons({ wrap }: { wrap?: boolean }) {
  return (
    <div className={`flex gap-5 text-muted-foreground ${wrap ? "max-w-[360px] flex-wrap gap-y-4" : "flex-wrap"}`}>
      {icons.map(([n, u, I]) => (
        <Ext key={n} href={u} className="transition-colors hover:text-foreground"><I aria-label={n} className="size-[22px]" /></Ext>
      ))}
    </div>
  );
}

function SearchPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  const items = [["Home", "#top"], ["Projects", "#projects"], ["Activity", "#activity"], ["Writing", "#writing"], ["Contact", "#contact"], ...icons.map(([n, u]) => [n, u] as [string, string])] as [string, string][];
  return (
    <>
      <button onClick={() => setOpen(true)} className="hidden items-center gap-2 rounded-full border border-border px-4 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:flex">
        <Search className="size-4 sm:hidden" /> Search
        <kbd className="rounded border border-border px-1.5 font-mono text-xs">Ctrl</kbd>
        <kbd className="rounded border border-border px-1.5 font-mono text-xs">K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/20 pt-32 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">Jump to…</p>
            <ul className="max-h-80 overflow-y-auto p-2">
              {items.map(([n, u]) => (
                <li key={n}>
                  <a href={u} target={u.startsWith("#") ? undefined : "_blank"} rel="noreferrer" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"><TextRoll>{n ?? ""}</TextRoll></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function Index() {
  const [sent, setSent] = useState(false);
  const { data } = useSuspenseQuery(activityQuery);
  const gh = data.github;
  const lc = data.leetcode;
  const solved: Record<string, number> = lc?.solved ?? { All: 177, Easy: 39, Medium: 98, Hard: 40 };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="rail flex h-[83px] items-center justify-between px-5">
          <a href="#top" aria-label="Home"><img src={logo.url} alt="Vidit Sharma logo" className="size-12 rounded-lg" /></a>
          <nav className="flex items-center gap-6 text-[17px] text-muted-foreground">
            {nav.map(([n, h], i) => (
              <a key={n} href={h} className={`transition-colors hover:text-foreground ${i === 0 ? "text-foreground" : ""}`}>{n}</a>
            ))}
            <SearchPalette />
          </nav>
        </div>
      </header>

      <div className="rail p-9">
        <div className="relative h-[166px] overflow-hidden rounded-sm">
          <img src={banner.url} alt="Stay curious" className="size-full object-cover" />
          <div className="dots absolute inset-0" />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="rail flex flex-col gap-8 px-8 py-8 sm:flex-row sm:items-start sm:gap-12">
          <div className="size-[200px] shrink-0 rounded-2xl border border-border bg-card p-2 shadow-sm">
            <img src={avatar.url} alt="Vidit Sharma" className="size-full rounded-xl object-cover" />
          </div>
          <div className="pt-2">
            <p className="font-mono text-[15px] text-muted-foreground">◐ Student &amp; Founder · India</p>
            <h1 className="mt-5 flex items-center gap-3 font-mono text-5xl tracking-tight sm:text-[56px]">
              Vidit Sharma <BadgeCheck className="size-8 fill-verified text-background" />
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">Building thoughtful digital products.</p>
          </div>
        </div>
      </div>

      <div className="hatch h-10 border-y border-border" />

      <section>
        <div className="rail">
          <h2 className="border-b border-border px-8 pb-3 pt-4 font-mono text-4xl tracking-tight">About</h2>
          <ul className="list-disc space-y-4 px-8 py-8 pl-14 text-xl marker:text-muted-foreground">
            <li>I build thoughtful digital products that make complicated ideas feel clear and useful.</li>
            <li>Right now I'm deep in AI, full-stack engineering, and building products from the first sketch to the shipped detail.</li>
            <li>Open to ambitious ideas, thoughtful collaborators, and hard problems worth solving.</li>
          </ul>
          <p className="px-8 pb-8 font-mono text-xs tracking-[0.14em] text-muted-foreground">01 / MAKE IT USEFUL · 02 / SWEAT THE DETAILS · 03 / STAY CURIOUS</p>
          <div className="flex justify-center px-8 pb-10">
            <div className="w-full max-w-[600px]">
              <MusicPlayer />
              <p className="mt-2 font-mono text-xs tracking-[0.1em] text-muted-foreground">THE MUSIC I KEEP COMING BACK TO</p>
            </div>
          </div>
        </div>
      </section>

      <Section id="projects" title="Selected work">
        <div className="divide-y divide-border">
          {projects.map((p) => (
            <Ext key={p.n} href={S.github} className="group flex gap-6 px-8 py-6 transition-colors hover:bg-secondary/50">
              <span className="pt-1 font-mono text-muted-foreground">{p.n}</span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{p.t}</h3>
                <p className="mt-1 text-lg text-muted-foreground">{p.d}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => <span key={t} className="rounded-md border border-border px-2.5 py-0.5 font-mono text-sm text-muted-foreground">{t}</span>)}
                </div>
              </div>
              <span className="pt-1 font-mono text-muted-foreground">{p.y} ↗</span>
            </Ext>
          ))}
        </div>
      </Section>

      <Section id="activity" title="Activity">
        <div className="space-y-8 px-8 py-8">
          <div>
            <div className="mb-4 flex flex-wrap justify-between gap-2">
              <span className="text-xl font-medium">{gh ? `${gh.total.toLocaleString()} contributions in the last year` : "GitHub activity unavailable right now"}</span>
              <Ext href={S.github} className="font-mono text-muted-foreground hover:text-foreground">GitHub @Vidzzzzz17 ↗</Ext>
            </div>
            {gh && <div className="rounded-xl border border-border bg-card p-5"><Heatmap days={gh.days} /></div>}
          </div>

          <div>
            <div className="mb-4 flex flex-wrap justify-between gap-2">
              <span className="text-xl font-medium">LeetCode</span>
              <Ext href={S.leetcode} className="font-mono text-muted-foreground hover:text-foreground">Vidzzzzz17{lc ? ` · Rank ${lc.ranking.toLocaleString()}` : ""} ↗</Ext>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex items-center justify-around gap-6 rounded-xl border border-border bg-card p-8">
                <Ring easy={(solved["Easy"] ?? 0)} med={(solved["Medium"] ?? 0)} hard={(solved["Hard"] ?? 0)} solved={(solved["All"] ?? 0)} total={4082} />
                <div className="space-y-2">
                  {[["Easy", solved["Easy"], 971, "text-easy"], ["Med.", solved["Medium"], 2128, "text-medium"], ["Hard", solved["Hard"], 983, "text-hard"]].map(([l, a, b, c]) => (
                    <div key={l as string} className="w-28 rounded-lg bg-secondary py-2 text-center">
                      <p className={`font-mono text-sm ${c}`}>{l}</p>
                      <p className="text-lg">{a}/{b}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-muted-foreground">Badges</p>
                <p className="text-3xl font-medium">3</p>
                <div className="my-6 flex items-center justify-around">
                  <img src={b1.url} alt="9 September badge" className="h-[70px]" />
                  <img src={b3.url} alt="50 Days Badge 2026" className="h-[100px]" />
                  <img src={b2.url} alt="8 August badge" className="h-[70px]" />
                </div>
                <p className="font-mono text-sm text-muted-foreground">Most recent badge</p>
                <p className="text-xl">50 Days Badge 2026</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-border bg-card p-5">
              <div className="mb-4 flex flex-wrap justify-between gap-2">
                <span className="text-xl font-medium">{lc ? `${lc.submissions} submissions in the past one year` : "LeetCode activity unavailable right now"}</span>
                {lc && <span className="font-mono text-muted-foreground">Total active days: {lc.activeDays} · Max streak: {lc.streak}</span>}
              </div>
              {lc && <Heatmap days={lc.days} />}
            </div>
          </div>
        </div>
      </Section>

      <Section id="writing" title="Writing">
        <p className="px-8 pt-8 pb-4 text-lg text-muted-foreground">Notes from building products, learning the craft, and following ideas a little further.</p>
        <div className="px-8 pb-8">
          <Ext href={S.medium} className="group flex items-center justify-between gap-4 border-y border-border py-6 transition-colors hover:text-accent">
            <span className="flex items-center gap-4"><SiMedium className="size-8" /><span className="text-xl font-medium"><TextRoll>Writing on Medium</TextRoll></span></span>
            <span className="font-mono">@vidit1727 ↗</span>
          </Ext>
        </div>
      </Section>

      <Section title="Technology stack">
        <div className="space-y-7 px-8 py-8">
          {stack.map(([g, items]) => (
            <div key={g}>
              <p className="mb-3 font-mono uppercase text-muted-foreground">{g}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((name) => (
                  <span key={name} className="flex items-center gap-2 rounded-md border border-border bg-card px-1.5 py-1 pr-3 font-mono">
                    <TechLogo name={name} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Certificates">
        <div className="certificate-marquee overflow-hidden py-8" tabIndex={0} aria-label="Certificates">
          <div className="certificate-track flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1 ? true : undefined}>
                {certs.map(([title, issuer]) => (
                  <article key={title} className="flex w-[300px] shrink-0 flex-col justify-between gap-8 rounded-lg border border-border bg-card p-6">
                    <BadgeCheck className="size-8 text-verified" />
                    <h3 className="text-xl font-medium">{title}</h3>
                    <p className="font-mono text-sm text-muted-foreground">{issuer}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <div className="px-8 py-8">
          <h3 className="text-3xl font-semibold tracking-tight">Let's make something useful.</h3>
          <p className="mt-2 text-lg text-muted-foreground">Have a good idea? Send a note.</p>
          <form
            className="mt-8 grid max-w-[715px] gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              window.location.href = `mailto:vidit1727@gmail.com?subject=${encodeURIComponent("Hello from " + f.get("name"))}&body=${encodeURIComponent(String(f.get("message")) + "\n\n— " + f.get("email"))}`;
              setSent(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {[["name", "Name", "text"], ["email", "Email", "email"]].map(([n, l, t]) => (
                <label key={n} className="grid gap-1.5">
                  <span className="font-mono text-sm uppercase text-muted-foreground">{l}</span>
                  <input required name={n} type={t} className="h-12 rounded-lg border border-input bg-card px-3 outline-none focus:ring-2 focus:ring-ring" />
                </label>
              ))}
            </div>
            <label className="grid gap-1.5">
              <span className="font-mono text-sm uppercase text-muted-foreground">Message</span>
              <textarea required name="message" rows={5} className="rounded-lg border border-input bg-card p-3 outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <button className="h-14 w-fit rounded-lg bg-primary px-6 text-lg font-medium text-primary-foreground transition-opacity hover:opacity-90">
              {sent ? "Opening your email…" : "Send message ↗"}
            </button>
          </form>
          <div className="mt-10"><SocialIcons /></div>
        </div>
      </Section>

      <footer className="border-t border-border">
        <div className="rail">
          <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <img src={logo.url} alt="" className="size-14 rounded-lg" />
              <p className="mt-4 text-2xl font-medium">Vidit Sharma</p>
              <p className="mt-3 max-w-sm text-lg leading-relaxed text-muted-foreground">Student &amp; founder in India. I build thoughtful digital products that make complicated ideas feel clear and useful.</p>
              <div className="mt-6"><SocialIcons wrap /></div>
            </div>
            {[
              ["Navigate", [["Home", "#top"], ["Projects", "#projects"], ["Activity", "#activity"], ["Writing", "#writing"], ["Contact", "#contact"]]],
              ["Elsewhere", [["GitHub", S.github], ["X", S.x], ["LinkedIn", S.linkedin], ["YouTube", S.youtube], ["Instagram", S.instagram]]],
              ["More", [["Threads", S.threads], ["Medium", S.medium], ["Reddit", S.reddit], ["LeetCode", S.leetcode], ["Email", S.email]]],
            ].map(([title, links]) => (
              <div key={title as string}>
                <p className="mb-4 font-mono uppercase tracking-[0.1em] text-muted-foreground">{title as string}</p>
                <ul className="space-y-3 text-lg">
                  {(links as [string, string][]).map(([n, u]) => (
                    <li key={n}><a href={u} target={u.startsWith("#") ? undefined : "_blank"} rel="noreferrer" className="hover:underline">{n}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-border px-8 py-10 font-mono text-muted-foreground">
            <span>© 2026 Vidit Sharma · Crafted by Vidit Sharma<br /><Ext href="https://skiper-ui.com/v1/skiper58" className="text-xs hover:text-foreground">Text motion by Skiper UI ↗</Ext></span>
            <a href="#top" className="hover:text-foreground">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MusicPlayer() {
  return (
    <div>
    <iframe
      title="Vidit Sharma’s Spotify playlist"
      src="https://open.spotify.com/embed/playlist/6tq0RyOMHa4GWQd1rDpn4p?utm_source=generator"
      width="100%"
      height="352"
      className="block w-full rounded-lg border-0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
    <Ext href="https://open.spotify.com/playlist/6tq0RyOMHa4GWQd1rDpn4p" className="mt-3 inline-flex font-mono text-sm text-muted-foreground hover:text-foreground">Open playlist on Spotify ↗</Ext>
    </div>
  );
}

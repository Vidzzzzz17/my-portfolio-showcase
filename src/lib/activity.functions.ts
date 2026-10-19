import { createServerFn } from "@tanstack/react-start";

export type Day = { date: string; count: number; level: number };
export type Activity = {
  github: { total: number; days: Day[] } | null;
  leetcode: {
    ranking: number;
    solved: Record<string, number>;
    questionCounts: Record<string, number>;
    activeDays: number;
    streak: number;
    submissions: number;
    days: Day[];
  } | null;
};

const USER = "Vidzzzzz17";

function level(c: number) {
  return c === 0 ? 0 : c < 3 ? 1 : c < 6 ? 2 : c < 10 ? 3 : 4;
}

async function github() {
  const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`);
  if (!r.ok) throw new Error(`GitHub ${r.status}`);
  const j = (await r.json()) as { total: { lastYear: number }; contributions: Day[] };
  return { total: j.total.lastYear, days: j.contributions };
}

async function leetcode() {
  const r = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({
      query: `{allQuestionsCount{difficulty count} matchedUser(username:"${USER}"){profile{ranking} submitStatsGlobal{acSubmissionNum{difficulty count}} userCalendar{totalActiveDays streak submissionCalendar}}}`,
    }),
  });
  if (!r.ok) throw new Error(`LeetCode ${r.status}`);
  const payload = (await r.json()) as {
    data?: {
      allQuestionsCount?: { difficulty: string; count: number }[];
      matchedUser?: {
        profile: { ranking: number };
        submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number }[] };
        userCalendar: { totalActiveDays: number; streak: number; submissionCalendar: string };
      } | null;
    };
    errors?: { message: string }[];
  };
  if (payload.errors?.length) throw new Error(payload.errors.map((error) => error.message).join("; "));
  const u = payload.data?.matchedUser;
  const allQuestionsCount = payload.data?.allQuestionsCount;
  if (!u || !allQuestionsCount) throw new Error("LeetCode profile data is incomplete");
  const cal: Record<string, number> = JSON.parse(u.userCalendar.submissionCalendar);
  const byDate = new Map<string, number>();
  for (const [ts, c] of Object.entries(cal)) byDate.set(new Date(+ts * 1000).toISOString().slice(0, 10), c);
  const days: Day[] = [];
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const start = new Date(Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate()));
  let submissions = 0;
  for (const d = start; d <= now; d.setUTCDate(d.getUTCDate() + 1)) {
    const k = d.toISOString().slice(0, 10);
    const c = byDate.get(k) ?? 0;
    submissions += c;
    days.push({ date: k, count: c, level: level(c) });
  }
  const solved: Record<string, number> = {};
  for (const s of u.submitStatsGlobal.acSubmissionNum) solved[s.difficulty] = s.count;
  return {
    ranking: u.profile.ranking,
    solved,
    questionCounts: Object.fromEntries(allQuestionsCount.map((item) => [item.difficulty, item.count])),
    activeDays: u.userCalendar.totalActiveDays,
    streak: u.userCalendar.streak,
    submissions,
    days,
  };
}

export const getActivity = createServerFn({ method: "GET" }).handler(async (): Promise<Activity> => {
  const [g, l] = await Promise.allSettled([github(), leetcode()]);
  if (g.status === "rejected") console.error(g.reason);
  if (l.status === "rejected") console.error(l.reason);
  return {
    github: g.status === "fulfilled" ? g.value : null,
    leetcode: l.status === "fulfilled" ? l.value : null,
  };
});

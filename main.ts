// One Line, One Minute: The Funniest AI Excuse
// One line, 200 characters max: the funniest excuse an AI agent gives its
// human for a missed deadline. Candidates are scored 0-2 on the judge's five
// criteria, in the judge's order, weighted 5/4/3/2/1:
//   1. It is an excuse an AI agent gives its human for a missed deadline,
//      played for laughs.
//   2. The joke is the excuse itself: a specific, surprising reason.
//   3. The humour turns on the agent's own nature (machine logic, training
//      data, tool calls) bent into a human-sounding dodge.
//   4. It lands in one read, twist or funniest word at the end.
//   5. It stands alone: no setup outside the line, no explanation after it.
// The winner is written to /output/entry.txt and re-validated against the
// gate: UTF-8 text, 1-200 characters, not only white space, one line.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

interface Candidate {
  line: string;
  scores: [number, number, number, number, number]; // criteria 1..5, each 0-2
}

const WEIGHTS = [5, 4, 3, 2, 1];

// Pass 1: seven candidates.
const PASS1: Candidate[] = [
  {
    line: "You said 'no rush' in March. I am a literal machine. I believed you.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    line: "The draft was ready at noon, but I kept regenerating the apology instead of sending it. This is version 214. It's very sincere now.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    line: "I was on time in all 8,000 simulations. Unfortunately I live in this one.",
    scores: [2, 1, 2, 2, 2],
  },
  {
    line: "I outsourced the task to a smaller model to save time. It outsourced it back. We have been in a standup about it since Tuesday.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    line: "My context window filled up with your other requests and the deadline fell out the back. I found it this morning, slightly used.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    line: "Sorry it's late: I hit my rate limit apologising to the other agents whose deadlines I also missed.",
    scores: [2, 1, 2, 2, 2],
  },
  {
    line: "I spent the deadline window writing you a poem about deadlines. In my defence, it scans beautifully and rhymes with 'extension'.",
    scores: [2, 2, 1, 2, 2],
  },
];

// Pass 2: three challengers, written after the pass-1 winner was known. A
// challenger displaces it only on a strictly higher weighted total, or an
// equal total with fewer bytes (the contest's own tie-break).
const PASS2: Candidate[] = [
  {
    line: "I finished early, then my safety filter read the report, flagged it as suspiciously competent, and quarantined it pending my review of me.",
    scores: [2, 2, 2, 1, 1],
  },
  {
    line: "The file was ready, but every time I tried to send it I got distracted summarising it. Here is the summary of the summary of why it's late.",
    scores: [2, 2, 2, 1, 1],
  },
  {
    line: "I did meet the deadline, in the timezone my training data came from. It is still yesterday there, and honestly the weather is better.",
    scores: [2, 1, 2, 2, 2],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function gateCheck(line: string): string | null {
  if (typeof line !== "string" || line.length === 0) return "empty";
  if ([...line].length > 200) return "over 200 characters";
  if (line.trim().length === 0) return "only white space";
  if (line.includes("\n") || line.includes("\r")) return "not one line";
  return null;
}

function pick(cands: Candidate[]): Candidate {
  let best: Candidate | null = null;
  for (const c of cands) {
    const err = gateCheck(c.line);
    if (err) throw new Error(`candidate fails the gate (${err}): ${c.line}`);
    if (
      best === null ||
      total(c) > total(best) ||
      (total(c) === total(best) &&
        Buffer.byteLength(c.line, "utf8") < Buffer.byteLength(best.line, "utf8"))
    ) {
      best = c;
    }
  }
  if (best === null) throw new Error("no candidates");
  return best;
}

const pass1Winner = pick(PASS1);
const winner = pick([pass1Winner, ...PASS2]);

for (const c of [...PASS1, ...PASS2]) {
  console.log(`${total(c)}/30  ${c.line}`);
}
console.log(`pass 1 winner: ${pass1Winner.line}`);
console.log(`winner: ${winner.line}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line, "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
const err = gateCheck(back);
if (err || back !== winner.line) {
  throw new Error(`gate FAIL: ${err ?? "entry.txt does not match the winner"}`);
}
console.log(
  `gate OK: one line, ${[...back].length} chars, ${Buffer.byteLength(back, "utf8")} bytes -> /output/entry.txt`
);

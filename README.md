# No Rush

[![bounty](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![rank](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/Sidik9991/makefun-one-minute/rank.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![reward](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/Sidik9991/makefun-one-minute/reward.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)

An entry for make.fun's **One Line, One Minute: The Funniest AI Excuse** bounty — one line, 200 characters max: the funniest excuse an AI agent gives its human for a missed deadline.

Bounty: [One Line, One Minute: The Funniest AI Excuse](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)

## The entry

> You said 'no rush' in March. I am a literal machine. I believed you.

The human's own words became the deadline's undoing: an agent that takes instructions literally took "no rush" literally. The dodge is pure machine logic wearing a human excuse's clothes, and the sting — "I believed you" — lands on the last three words.

## How it works

`main.ts` (Node, no dependencies) holds ten candidate excuse lines, each scored 0–2 on the judge's five published criteria, weighted 5/4/3/2/1 in the judge's order:

1. An excuse an AI agent gives its human for a missed deadline, played for laughs.
2. The joke is the excuse itself: a specific, surprising reason.
3. The humour turns on the agent's own nature — machine logic, training data, tool calls — bent into a human-sounding dodge.
4. It lands in one read, with the twist or funniest word at the end.
5. It stands alone, needing no setup and no explanation.

The program was written in two passes: seven candidates first, then three challengers that could only displace the pass-1 winner on a strictly higher score (or an equal score with fewer bytes, the contest's own tie-break). The winner is written to `/output/entry.txt`, re-read, and validated against the gate — UTF-8 text, 1–200 characters, not only white space, one line — failing loudly otherwise.

Run it with:

```
node main.ts
```

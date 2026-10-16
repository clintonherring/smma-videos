# Using smma-videos with other agents

The skills live in `skills/<name>/SKILL.md`. Agents that discover skills from a project directory get them from:

| Agent | Directory | How to get it there |
|---|---|---|
| Cursor | `.cursor/skills/` | Committed in this repo; or `npx smma-videos install --agent cursor` in another project |
| Claude Code | `.claude/skills/` | `npx smma-videos install --agent claude` |
| Codex CLI | `.agents/skills/` | `npx smma-videos install --agent codex` |
| opencode | `.opencode/skills/` | `npx smma-videos install --agent opencode` |
| All of the above | | `npx smma-videos install --agent all` |

`install` copies files (no symlinks, so it works on Windows without Developer Mode). Re-run it after pulling changes to `skills/`.

## Agents without skill discovery

Paste the contents of `skills/setup-business/SKILL.md` into the agent's custom instructions, or point it at the file. That skill tells the agent to read `strategy/12-guides.md` and the other skills on demand, so one entry point is enough. Make sure the agent can run shell commands: every skill calls `npx smma-videos readiness <slug>` and `build-video` calls `npx hyperframes`.

## Prerequisites on the machine

- Node.js 22 or later
- ffmpeg and ffprobe on `PATH` (inventory and build only)
- Network access the first time `npx hyperframes` runs

`npx smma-videos doctor` checks all three and prints install hints for Linux (apt), macOS (brew) and Windows (winget).

# ai-dev-guide for OpenCode

Install this repository as a native OpenCode skill, not as a `plugin`.

Do **not** add this repo to the `plugin` array in `opencode.json`.
That field is for OpenCode plugins. This repository should be placed in OpenCode's skill discovery path so OpenCode can find `SKILL.md`.

## Preferred install flow

Follow these steps in order:

1. Choose the target skill directory.
   Prefer global install:
   `~/.config/opencode/skills/ai-dev-guide`

   If the user explicitly wants project-only install, use:
   `./.opencode/skills/ai-dev-guide`

2. Choose the target command directory.
   Prefer global install:
   `~/.config/opencode/commands`

   If the user explicitly wants project-only install, use:
   `./.opencode/commands`

3. Check whether the target directories already exist.

4. Download the `SKILLS` branch of this repository.

5. Copy these files and folders into the target skill directory:

- `SKILL.md`
- `AGENTS.md`
- `commands/`
- `references/`
- `examples/`
- `projects/`

6. Copy these command files into the target command directory:

- `.opencode/commands/ai-dev-guide.md`
- `.opencode/commands/ai-dev-start.md`
- `.opencode/commands/ai-dev-init.md`
- `.opencode/commands/ai-dev-chat-logs.md`

7. Verify that this file exists after copying:

```text
<target-skill-directory>/SKILL.md
```

8. Verify that these commands exist after copying:

```text
<target-command-directory>/ai-dev-guide.md
<target-command-directory>/ai-dev-start.md
<target-command-directory>/ai-dev-init.md
<target-command-directory>/ai-dev-chat-logs.md
```

9. Tell the user to restart OpenCode if the skill or commands do not appear immediately.

## Result

After installation, OpenCode should discover the skill from one of these native paths:

- `~/.config/opencode/skills/ai-dev-guide/SKILL.md`
- `./.opencode/skills/ai-dev-guide/SKILL.md`

And should discover the custom commands from:

- `~/.config/opencode/commands/*.md`
- `./.opencode/commands/*.md`

## If blocked

If you cannot complete the copy automatically:

- tell the user which target skill directory should be used
- tell the user which target command directory should be used
- tell the user that this skill must be installed into OpenCode's native `skills` directory
- tell the user that slash commands must be installed into OpenCode's native `commands` directory
- provide the backup installer script:

`https://raw.githubusercontent.com/gswapex/ai-dev-guide/SKILLS/scripts/install-opencode-skill.ps1`

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

2. Check whether the target directory already exists.

3. Download the `SKILLS` branch of this repository.

4. Copy these files and folders into the target skill directory:

- `SKILL.md`
- `AGENTS.md`
- `commands/`
- `references/`
- `examples/`
- `projects/`

5. Verify that this file exists after copying:

```text
<target-skill-directory>/SKILL.md
```

6. Tell the user to restart OpenCode if the skill does not appear immediately.

## Result

After installation, OpenCode should discover the skill from one of these native paths:

- `~/.config/opencode/skills/ai-dev-guide/SKILL.md`
- `./.opencode/skills/ai-dev-guide/SKILL.md`

## If blocked

If you cannot complete the copy automatically:

- tell the user which target skill directory should be used
- tell the user that this skill must be installed into OpenCode's native `skills` directory
- provide the backup installer script:

`https://raw.githubusercontent.com/gswapex/ai-dev-guide/SKILLS/scripts/install-opencode-skill.ps1`

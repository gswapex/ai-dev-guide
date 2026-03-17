# ai-dev-guide for OpenCode

Install this skill by updating `opencode.json` directly.

Use this plugin entry:

```json
"ai-dev-guide@git+https://github.com/gswapex/ai-dev-guide.git#SKILLS"
```

## Preferred install flow

Follow these steps in order:

1. Choose the config file to update.
   Prefer global config: `~/.config/opencode/opencode.json`
   If the user explicitly wants project-only install, use: `./opencode.json`

2. Read the existing config file if it exists.

3. If the config file does not exist, create it with this minimum structure:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "ai-dev-guide@git+https://github.com/gswapex/ai-dev-guide.git#SKILLS"
  ]
}
```

4. If the config file already exists:
   - ensure it is valid JSON
   - ensure the `plugin` field exists and is an array
   - append the plugin entry if it is not already present
   - do not duplicate the same plugin entry

5. Save the updated config file.

6. Tell the user to restart OpenCode.

## Update existing config

If `plugin` already exists, add this exact item:

```json
"ai-dev-guide@git+https://github.com/gswapex/ai-dev-guide.git#SKILLS"
```

## If blocked

If you cannot edit the config automatically:

- tell the user which config file should be edited
- provide the exact JSON snippet to add
- tell the user to restart OpenCode after saving

## Backup install method

If the plugin-based install path cannot be completed, the backup installer is:

`https://raw.githubusercontent.com/gswapex/ai-dev-guide/SKILLS/scripts/install-opencode-skill.ps1`

## Result

After restart, OpenCode should be able to use this skill for:

- project requirement guidance
- document generation
- task-driven development
- task-level code guidance

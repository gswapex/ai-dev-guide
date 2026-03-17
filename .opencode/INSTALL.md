# ai-dev-guide for OpenCode

To install this skill in OpenCode, add it to your `opencode.json` file in the `plugin` array:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "ai-dev-guide@git+https://github.com/gswapex/ai-dev-guide.git#SKILLS"
  ]
}
```

You can add this to either:

- Global config: `~/.config/opencode/opencode.json`
- Project config: `./opencode.json`

If your `plugin` array already exists, append this item to it:

```json
"ai-dev-guide@git+https://github.com/gswapex/ai-dev-guide.git#SKILLS"
```

After saving the config, restart OpenCode.

After restart, you can ask OpenCode to use this skill for:

- project requirement guidance
- document generation
- task-driven development
- task-level code guidance

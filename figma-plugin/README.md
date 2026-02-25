# figma-claude-demo — Figma Plugin

Generates the full design system inside a Figma file: color variables, token pages, and component frames — all driven by the same token definitions as the React webapp.

## How to install

1. Open Figma Desktop (the plugin API requires the desktop app).
2. Create a new empty Figma file (or open an existing one).
3. Go to **Plugins → Development → Import plugin from manifest…**
4. Browse to this `figma-plugin/` folder and select `manifest.json`.
5. The plugin now appears under **Plugins → Development → figma-claude-demo**.

## How to run

1. Open the plugin: **Plugins → Development → figma-claude-demo — Design System Generator**
2. Click **Generate Design System**.
3. Watch the log — it takes a few seconds to load fonts and build all frames.
4. When done, two new pages appear in your Figma file:
   - **🎨 Design Tokens** — color swatches, typography scale, spacing scale
   - **🧩 Components** — Button variants, Cards, Badges, Inputs
5. A **`figma-claude-demo / Colors`** variable collection is also created with all 18 color tokens.

## Figma → Code (with Figma MCP)

Once you have the design system in Figma:
1. Tweak colors, sizes, or component properties in Figma.
2. Run Claude locally (with the Figma MCP server configured).
3. Point Claude at your Figma file key and ask it to sync changes back to `tokens/tokens.json` and the React components.

The Figma MCP server reads the file via the Figma REST API and gives Claude structured access to every node, style, and variable — enabling precise code generation from your Figma source of truth.

## Token structure

All token values live in one place: **`tokens/tokens.json`** (W3C Design Token format).

| Category   | Count | Example                         |
|------------|-------|---------------------------------|
| Colors     | 18    | `primary: #2563EB`              |
| Type sizes | 8     | `size-base: 16px`               |
| Spacing    | 10    | `spacing-4: 16px`               |
| Radii      | 6     | `radius-md: 8px`                |
| Shadows    | 3     | `shadow-md: 0 4px 6px …`        |

To regenerate `app/globals.css` from tokens:
```bash
node tokens/tokens-to-css.js
```

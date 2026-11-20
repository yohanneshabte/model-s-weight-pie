# model-s-weight-pie

An animated doughnut chart of the 2024 Tesla Model S Long Range weight breakdown, built to load reliably in the Tesla in-car browser.

`#grok-build` `#wonder` `#tesla` `#model-s` `#car-viz` (a car viz toy, not a business)

## Grok Build project
Grok-generated and owned by the user, set up the same way as the Wonder repo. AI-generated code is tracked in `AGENT_STUDY.md`.

## Layout
| Path | What it holds |
|---|---|
| `data/weight-breakdown.json` | **Your car's data.** Edit it after mods; no code changes needed. |
| `themes/themes.js` | Theme tokens (Dark, Gold). Add a theme by adding a key. |
| `src/chart.js` | Zero-dependency SVG doughnut renderer. |
| `src/style.css` | Layout only; colors come from the theme. |
| `index.html` | Page shell. |

## Use
- Open `index.html` from any static host. Fetching the JSON needs `http(s)`, so it won't work from a local `file://` path.
- Use `?theme=gold` or `?theme=dark` in the URL, or tap the Theme button. Your choice is remembered on that device.

## Why no Chart.js or Vue
The Tesla browser crashes easily and often fails to load CDNs. This page has no external requests and no framework, and the whole page is under 10 KB.

## Optional sign-in
Not included. A static page doesn't need it. If it's added later, it stays optional.

## License
MIT, matching the Wonder app repo. See `LICENSE`.

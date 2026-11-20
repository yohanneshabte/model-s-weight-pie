# AGENT_STUDY

AI-generated code in this repo, and what to study in each part.

| File / section | What it does | Concepts to study | Confidence |
|---|---|---|---|
| `src/chart.js` `arc()` / `pt()` | Builds each doughnut slice as an SVG path from polar angles | SVG path commands (M, A, L, Z), the large-arc flag, degrees to radians | high |
| `src/chart.js` `draw()` | Sweep animation with ease-out cubic | `requestAnimationFrame`, easing functions | high |
| `src/chart.js` theme picking | Chooses the theme from the URL, then saved value, then default | `URLSearchParams`, `localStorage`, CSS custom properties | high |
| `src/chart.js` `fetch` | Loads the JSON data and computes the total | Promises, `fetch`, `Array.reduce` | high |
| `src/chart.js` legend building | Uses `textContent`, not HTML, for data values | XSS-safe DOM updates | high |
| `themes/themes.js` | Design tokens adapted from the Wonder repo | Design tokens, theming without touching component code | medium (gold palette is new, not from Wonder) |

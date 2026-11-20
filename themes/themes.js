// Theme config, kept separate from the chart code so themes swap without touching src/.
// Token names follow the Wonder repo's design tokens (bg, fg, surface, muted, border, primary).
// "dark" reuses Wonder's dark-mode values; "gold" is an ink, bone and amber variant for in-car use.
// Add a theme by adding a key here. The page picks it via ?theme=<key> or the toggle button.
window.THEMES = {
  dark: {
    name: "Dark",
    bg: "#121714", fg: "#efe8d8", surface: "#1c2420", muted: "#a39a88", border: "#334038", primary: "#6b8f72",
    slices: ["#6b8f72", "#e4d7bb", "#8fa88e", "#c5d6c4", "#a39a88", "#4f6b55", "#d5e0d3"]
  },
  gold: {
    name: "Gold",
    bg: "#0d0b08", fg: "#f3ebdd", surface: "#1a160f", muted: "#a8987a", border: "#3a3122", primary: "#d4a64a",
    slices: ["#d4a64a", "#b8862b", "#f0d28a", "#8a6a2e", "#e6bf6a", "#5e4a26", "#fbeac0"]
  }
};

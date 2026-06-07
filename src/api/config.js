// Default Theme
const DEFAULT_THEME = "dracula";

// KittyChef Version
export const VERSION = "0.0.1";

// Get theme from localStorage or Default Theme
export function getTheme() {
  return localStorage.getItem("pastix-theme") || DEFAULT_THEME;
}

// Apply theme to #main element
export const applyTheme = theme => {
  localStorage.setItem("pastix-theme", theme);
  document.getElementById("pastix-main")?.setAttribute("data-theme", theme);
};

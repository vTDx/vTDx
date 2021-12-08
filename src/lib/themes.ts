import { ErrorManagement, ToastData } from "./error";
import { ThemeSelectorUI } from "./pages/themeselector";
import { colorSchemes, themeStore } from "./themestore";

class TM {
  applyTheme(theme: string, setLS: boolean) {
    console.log(`ThemeManagement: applying ${theme}`);
    if (themeStore.has(theme)) {
      const styleSheets = document.styleSheets[0];

      for (let i = 0; i < styleSheets.cssRules.length; i++) {
        if (styleSheets.cssRules[i].cssText.startsWith("body { --")) {
          document.styleSheets[0].deleteRule(i);
        }
      }

      const themeData = themeStore.get(theme);
      const colorData = themeData?.colors;

      let innerRule = "";

      for (const color in colorData) {
        innerRule += `--${color}: ${colorData[color]}; `;
      }

      if (themeStore.get(theme)?.scheme == colorSchemes.lightmode) {
        innerRule += `--topbar-bg: #0001; --sidebar-bg: #00000004; --input-bg: #00000006`;
      }

      let rule = `body { ${innerRule.trimEnd()} }`;
      document.styleSheets[0].insertRule(rule, 0);

      if (setLS) localStorage.setItem("theme", theme);

      ThemeSelectorUI.refreshAll(true);
    } else {
      const toastData: ToastData = {
        title: "Unable to load theme",
        text: `Failed to load theme "${theme}": it does not exist.\n\nThe default theme has been loaded.`,
        delay: 3000,
      };

      ErrorManagement.toast(toastData);

      this.applyTheme("default", true);
    }
  }

  getThemes(): any[] {
    let list: [[string, Theme]?] = [];

    for (let theme of themeStore) {
      list.push(theme);
    }

    return list;
  }

  init() {
    let savedTheme = localStorage.getItem("theme")!;

    this.applyTheme(savedTheme, false);
  }

  loadedTheme = "";
}

export const ThemeManagement = new TM();

export interface Theme {
  name: string;
  author: string;
  colors: ThemeColors;
  userSelectable: boolean;
  default?: boolean;
  scheme: colorSchemes;
}

export interface ThemeColors {
  red: string;
  green: string;
  yellow: string;
  blue: string;
  purple: string;
  aqua: string;
  orange: string;
  gray: string;
  bg: string;
  fg: string;
  [key: string]: string;
}

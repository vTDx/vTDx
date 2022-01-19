import { ErrorManagement, ToastData } from "./error";
import { ThemeSelectorUI } from "./pages/themeselector";
import { colorSchemes, themeStore } from "./themestore";

class TM {
  applyTheme(theme: string, setLS: boolean) {
    if (themeStore.has(theme)) {
      const ruleIdentifier = "body *, body { ";

      const styleSheets = this.getBottomStyleSheet();

      for (let i = 0; i < styleSheets.cssRules.length; i++) {
        if (styleSheets.cssRules[i].cssText.startsWith(ruleIdentifier + "--")) {
          this.getBottomStyleSheet().deleteRule(i);
        }
      }

      const themeData = themeStore.get(theme);
      const colorData = themeData?.colors;

      let innerRule = "";

      for (const color in colorData) {
        innerRule += `--${color}: ${colorData[color]}; `;
      }

      if (themeStore.get(theme)?.scheme == colorSchemes.lightmode) {
        innerRule += `--topbar-bg: #0002; --sidebar-bg: #00000011; --input-bg: #00000006`;
      }

      let rule = `${ruleIdentifier}${innerRule.trimEnd()} }`;

      this.getBottomStyleSheet().insertRule(rule, 0);

      if (setLS) localStorage.setItem("theme", theme);

      ThemeSelectorUI.refreshAll(true);
    } else {
      if (localStorage.getItem("theme")) {
        const toastData: ToastData = {
          title: "Unable to load theme",
          text: `Failed to load theme "${theme}": it does not exist.\n\nThe default theme has been loaded.`,
          delay: 3000,
        };

        ErrorManagement.toast(toastData);
      }
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
    document.body.append(document.createElement("style"));

    let savedTheme = localStorage.getItem("theme")!;

    this.applyTheme(savedTheme, false);
  }

  getBottomStyleSheet() {
    return document.styleSheets[document.styleSheets.length - 1];
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

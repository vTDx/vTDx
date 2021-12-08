import { ThemeManagement } from "../themes";
import { colorSchemes, themeStore } from "../themestore";

class TSUI {
  refreshAll(clear?: boolean) {
    const themes = ThemeManagement.getThemes();
    const darkmodeTarget = document.querySelectorAll(
      "div#page-themeselector #darkmode"
    )![0];
    const lightmodeTarget = document.querySelectorAll(
      "div#page-themeselector #lightmode"
    )![0];

    if (clear) {
      darkmodeTarget.innerHTML = "";
      lightmodeTarget.innerHTML = "";
    }

    let darkmodeCounter = 0;
    let lightmodeCounter = 0;

    for (let i = 0; i < themes.length; i++) {
      const div = document.createElement("div");
      const title = document.createElement("h3");
      const titleText = document.createTextNode(themes[i][1]?.name);
      const author = document.createElement("p");
      const authorText = document.createTextNode(`By ${themes[i][1]?.author}`);
      const applyButton = document.createElement("button");
      const colorPreviewDiv = document.createElement("div");
      const appliedCheckmark = document.createElement("span");

      if (
        localStorage.getItem("theme") &&
        localStorage.getItem("theme") == themes[i][0]
      ) {
        appliedCheckmark.className = "material-icons green";
        appliedCheckmark.innerText = "check";
        div.append(appliedCheckmark);
      }

      applyButton.className = "apply";
      applyButton.innerText =
        localStorage.getItem("theme") == themes[i][0] ? `Applied` : `Apply`;
      applyButton.addEventListener("click", () => {
        ThemeManagement.applyTheme(themes[i][0], true);
      });
      if (localStorage.getItem("theme") == themes[i][0]) {
        applyButton.setAttribute("disabled", "true");
      }

      colorPreviewDiv.className = "color-preview";

      const colorData = themeStore.get(themes[i][0])?.colors;

      for (const color in colorData) {
        const segment = document.createElement("div");

        segment.className = "segment";
        segment.style.background = colorData[color];

        colorPreviewDiv.append(segment);
      }

      div.className = "theme";

      title.className = "header";
      title.append(titleText);

      author.className = "author";
      author.append(authorText);

      div.append(title, author, applyButton, colorPreviewDiv);

      if (themes[i][1].userSelectable == true) {
        if (colorSchemes[themes[i][1]!.scheme] == "darkmode") {
          darkmodeCounter++;
          darkmodeTarget.append(div);
          if (darkmodeCounter == 3) {
            darkmodeCounter = 0;
            darkmodeTarget.append(document.createElement("br"));
          }
        } else if (colorSchemes[themes[i][1]!.scheme] == "lightmode") {
          lightmodeCounter++;
          lightmodeTarget.append(div);
          if (lightmodeCounter == 3) {
            lightmodeCounter = 0;
            lightmodeTarget.append(document.createElement("br"));
          }
        }
      }
    }
  }
}

export const ThemeSelectorUI = new TSUI();

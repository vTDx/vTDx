import { colors } from "./ui";
import { pages } from "./pages";
import { Error, ErrorManagement } from "./error";

class PM {
  switch(page: string, button?: HTMLElement) {
    const pgHTML = document.getElementById(`page-${page}`);
    const buttons = document.querySelectorAll("div.sidebar>#pages>button");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = "option page";
      buttons[i].classList.add(
        buttons[i] == button ? "selected" : "unselected"
      );

      if (buttons[i] == button) {
        buttons[i].children[0].classList.add(colors[pages.get(page)?.color!]);
      } else {
        for (const color in colors) {
          buttons[i].children[0].classList.remove(colors[color]);
        }
      }
    }

    let dispName: string = `Page Not Found: ${
      pages.get(page)?.dispName || "Unknown Page"
    }`;
    let colorValue: string = "var(--red)";

    if (pgHTML && pages.has(page)) {
      const pagedivs = document.querySelectorAll("div.page");

      for (let i = 0; i < pagedivs.length; i++) {
        if (pagedivs[i] != pgHTML) {
          pagedivs[i].classList.add("hidden");
          continue;
        }
        pagedivs[i].classList.remove("hidden");
      }

      colorValue = `var(--${colors[pages.get(page)?.color!]})`;
      dispName = pages.get(page)?.dispName!;
      document.title = `vTDx - ${pages.get(page)?.dispName}`;
    } else {
      this.switch("error");
      const data: Error = {
        message: "Sorry, that page doesn't seem to exist.",
        materialIcon: "web_asset_off",
        buttonCaption: "Go Home",
        buttonAction: () => {
          this.switch("home", document.getElementById("button-page-home")!);
        },
        id: "page-error",
      };
      ErrorManagement.newError(data);
      document.getElementById("page-dot")!.style.color = colorValue;
      document.getElementById("page-disp")!.innerText = dispName;
      document.title = `vTDx - Page Not Found`;
    }
    document.getElementById("page-dot")!.style.color = colorValue;
    document.getElementById("page-disp")!.innerText = dispName;
  }
}

export const PageManagement = new PM();

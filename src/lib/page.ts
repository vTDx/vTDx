import { colors } from "./ui";
import { pages } from "./pages";

class PM {
  switch(page: string, button?: HTMLElement) {
    const target = document.getElementById("target")!;
    const pgHTML = document.getElementById(`page-${page}`);
    const erHTML = document.getElementById("page-error")!;
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

    if (pgHTML && pages.has(page)) {
      const pages = document.querySelectorAll("div.page");

      for (let i = 0; i < pages.length; i++) {
        if (pages[i] != pgHTML) {
          pages[i].classList.add("hidden");
          continue;
        }
        pages[i].classList.remove("hidden");
      }
    } else {
      target.innerHTML = erHTML?.innerHTML;

      document.getElementById(
        "page-error-queryselector"
      )!.innerText = `div#page-${page}`;
    }

    document.title = `vTDx - ${pages.get(page)?.dispName}`;

    document.getElementById("page-dot")!.style.color = `var(--${
      colors[pages.get(page)?.color!]
    })`;
    document.getElementById("page-disp")!.innerText =
      pages.get(page)?.dispName!;
  }
}

export const PageManagement = new PM();

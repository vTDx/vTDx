import { PageManagement } from "./page";
import { colors } from "./ui";
import { pages } from "./pages";
import { actions } from "./actions";

class SBUI {
  populatePages() {
    const sidebar = document.querySelector("div.sidebar>span#pages");

    for (const page of pages) {
      if (page[1].onSidebar) {
        const icon = document.createElement("span");
        const button = document.createElement("button");
        const text = document.createElement("span");

        text.innerText = page[1].dispName;

        icon.innerText = page[1].materialIcon;
        icon.className = "material-icons";

        button.className = "page unselected option";
        button.id = `button-page-${page[0]}`;

        button.append(icon);
        button.append(text);
        button.addEventListener("click", () =>
          PageManagement.switch(page[0], button)
        );
        button.addEventListener("mouseenter", () => {
          icon.style.color = `var(--${colors[page[1].color]})`;
          text.style.color = `var(--${colors[page[1].color]})`;
        });
        button.addEventListener("mouseleave", () => {
          icon.style.color = ``;
          text.style.color = ``;
        });

        sidebar?.append(button);
      }
    }
  }

  populateActions() {
    const sidebar = document.querySelector("div.sidebar>span#actions");

    for (const action of actions) {
      const icon = document.createElement("span");
      const button = document.createElement("button");
      const text = document.createElement("span");
      const id = `${Math.floor(Math.random() * 32768)}`;

      text.innerText = action[1].dispName;

      icon.innerText = action[1].materialIcon;
      icon.className = "material-icons";
      icon.id = id;

      button.className = "action option";

      button.append(icon);
      button.append(text);
      button.addEventListener("click", action[1].action);
      button.addEventListener("mouseenter", () => {
        icon.style.color = `var(--${colors[action[1].color]})`;
        text.style.color = `var(--${colors[action[1].color]})`;
      });
      button.addEventListener("mouseleave", () => {
        icon.style.color = ``;
        text.style.color = ``;
      });

      sidebar?.append(button);
    }
  }
}

export const SideBarUI = new SBUI();

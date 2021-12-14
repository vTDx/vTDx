import { PageManagement } from "./page";
import { colors } from "./ui";
import { pages } from "./pages";
import { actions } from "./actions";

class SBUI {
  populatePages() {
    const sidebar = document.querySelector("div.sidebar>#pages");
    const topbar = document.querySelector("div.headerbar #pages")!;

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
        button.title = page[1].dispName;

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

        if (!page[1].inTopBar) {
          sidebar?.append(button);

          if (page[1].addBreak) {
            sidebar?.append(document.createElement("hr"));
          }
        } else {
          text.style.display = "none";

          topbar?.append(button);
        }

        if (page[1].hasCountableContent) {
          const numberSpan = document.createElement("span");

          numberSpan.className = "counter";
          numberSpan.innerText = "0";

          button.append(numberSpan);
        }
      }
    }

    this.trimHRs();
  }

  populateActions() {
    const sidebar = document.querySelector("div.sidebar>div#actions");
    const topbar = document.querySelector("div.headerbar #actions")!;

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
      button.title = action[1].dispName;

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

      if (!action[1].inTopBar) {
        sidebar?.append(button);
        if (action[1].addBreak) {
          sidebar?.append(document.createElement("hr"));
        }
      } else {
        text.style.display = "none";

        topbar?.append(button);
      }
    }

    this.trimHRs();
  }

  toggleSidebar() {
    const sidebarCollapsed =
      localStorage.getItem("sidebar-collapsed") || "false";

    if (sidebarCollapsed == "true") {
      SideBarUI.expandSidebar();
    } else {
      SideBarUI.collapseSidebar();
    }
  }

  expandSidebar() {
    document.body.classList.remove("sidebar-collapsed");

    localStorage.setItem("sidebar-collapsed", "false");
  }

  collapseSidebar() {
    document.body.classList.add("sidebar-collapsed");

    localStorage.setItem("sidebar-collapsed", "true");
  }

  init() {
    this.syncSidebarState();

    document.getElementById("sidebar-toggle")!.addEventListener("click", () => {
      SideBarUI.toggleSidebar();
      SideBarUI.syncSidebarState();
    });
  }

  syncSidebarState() {
    const sidebarCollapsed =
      localStorage.getItem("sidebar-collapsed") || "false";

    if (sidebarCollapsed == "true") {
      SideBarUI.collapseSidebar();
    } else {
      SideBarUI.expandSidebar();
    }
  }

  trimHRs() {
    const pages = document.querySelector("div.sidebar>#pages")!;    
    const actns = document.querySelector("div.sidebar>#actions")!;

    if (pages.lastChild instanceof HTMLHRElement) {
      pages.removeChild(pages.lastChild);
    }

    if (actns.lastChild instanceof HTMLHRElement) {
      actns.removeChild(actns.lastChild);
    }
  }
}

export const SideBarUI = new SBUI();

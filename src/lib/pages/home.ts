import { PageManagement } from "../page";
import { pages } from "../pages";

class HPUI {
  populateHomeButtons() {
    const target = document.querySelectorAll(
      "#page-home>div.centered-absolute"
    );
    for (const page of pages) {
      if (page[1].onSidebar && !page[1].default) {
        const button = document.createElement("button");
        const icon = document.createElement("span");
        const textHolder = document.createElement("span");
        const text = document.createTextNode(page[1].dispName);

        icon.className = "material-icons";
        icon.innerText = page[1].materialIcon;

        textHolder.className = "nomargin";

        textHolder.append(text);

        button.append(icon, textHolder);
        button.addEventListener("click", () => {
          PageManagement.switch(
            page[0],
            document.getElementById(`button-page-${page[0]}`)!
          );
        });

        target[0].append(button);
        if (page[1].addBreak) {
          target[0].append(document.createElement("hr"));
        }
      }
    }
  }
}

export const HomePageUserInterface = new HPUI();

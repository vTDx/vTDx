import { PageManagement } from "../page";
import { pages } from "../pages";
import { colors } from "../ui";

class HPUI {
  populateHomeButtons() {
    const target = document.querySelectorAll(
      "#page-home>div.centered-absolute"
    );

    let counter = 0;
    
    for (const page of pages) {
      if (page[1].onHome && !page[1].default) {
        counter++;

        const button = document.createElement("button");
        const icon = document.createElement("span");
        const textHolder = document.createElement("p");
        const text = document.createTextNode(page[1].dispName);

        icon.className = "material-icons big";
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

        button.addEventListener("mouseenter", () => {
          icon.style.color = `var(--${colors[page[1].color]!})`;
        });
        
        button.addEventListener("mouseleave", () => {
          icon.style.color = "";
        });

        target[0].append(button);

        if (counter >= 3) {
          counter = 0;
          target[0].append(document.createElement("br"));
        }
      }
    }
  }
}

export const HomePageUserInterface = new HPUI();

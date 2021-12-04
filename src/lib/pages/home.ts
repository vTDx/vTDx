import { PageManagement } from "../page";
import { pages } from "../pages";

class HPUI {
    populateHomeButtons() {
        const target = document.querySelectorAll("#page-home>div.centered-absolute")
        for (const page of pages) {
            if (page[1].onSidebar && !page[1].default) {
                const button = document.createElement("button");
                const icon = document.createElement("span");
                const textHolder = document.createElement("p");
                const text = document.createTextNode(page[1].dispName);
    
                icon.className = "material-icons big";
                icon.innerText = page[1].materialIcon;
    
                textHolder.className = "nomargin";
    
                textHolder.append(text);
    
                button.append(icon,textHolder);
                button.addEventListener("click", () => {
                    PageManagement.switch(page[0],document.getElementById(`button-page-${page[0]}`)!);
                })
    
                target[0].append(button);
            }
        }
    }
}

export const HomePageUserInterface = new HPUI();
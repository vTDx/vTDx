class HBUI {
    init() {
        const button = document.createElement("button");
        const icon = document.createElement("span");

        button.className = "action";
        button.id = "sidebar-toggle";

        icon.className = "material-icons";
        icon.innerText = "more_vert";

        button.append(icon);

        (document.querySelectorAll("div.headerbar .header")[0] as HTMLDivElement).append(button);
    }
}

export const HeaderBarUserInterface = new HBUI();
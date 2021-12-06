import { NoteManagement } from "./notes";

class NND {
    init() {
        const dialog = document.createElement("div");
        const shade = document.createElement("div");

        const header = document.createElement("h3");

        const textTitle = document.createElement("p")
        const textContent = document.createElement("p");

        const titleInput = document.createElement("input");
        const contentInput = document.createElement("textarea");

        const controls = document.createElement("span");
        const createButton = document.createElement("button");
        const cancelButton = document.createElement("button");

        dialog.id = "create-note-dialog";
        dialog.className = "hidden";

        shade.id = "create-note-dialog-shade";
        shade.className = "hidden";

        header.innerText = `Create new {{type}}`;

        textTitle.className = "nomargin";
        textTitle.innerText = "Title";

        textContent.className = "nomargin";
        textContent.innerText = "Content";

        titleInput.className = "fullwidth";
        contentInput.className = "fullwidth";

        controls.className = "bottomright";

        cancelButton.id = "cancel-button";
        createButton.id = "create-button"

        cancelButton.innerText = "Cancel";
        createButton.innerText = "Create {{type}}";

        cancelButton.addEventListener("click", this.hide);
        createButton.addEventListener("click", this.processNote);

        controls.append(cancelButton,createButton);

        dialog.append(header,textTitle,titleInput,textContent,contentInput,controls);

        document.querySelector("div.content")?.append(shade,dialog);

        this.initDone = true;
    }

    show(type:dialogTypes,clearFields?:boolean) {
        if (this.initDone) {
            const titleInput = (document.querySelector("div#create-note-dialog input") as HTMLInputElement)!;
            const contentInput = (document.querySelector("div#create-note-dialog textarea") as HTMLTextAreaElement)!;
            const shade = document.getElementById("create-note-dialog-shade")!;
            const dialog = document.getElementById("create-note-dialog")!;
            const header = document.querySelector("div#create-note-dialog h3") as HTMLElement;
            const createButton = document.querySelector("div#create-note-dialog button#create-button") as HTMLButtonElement;

            const typeName = typeNames.get(dialogTypes[type]);

            if (clearFields) {
                titleInput.value = "";
                contentInput.value = "";
            }

            header.innerText = `Create New ${typeName}`

            createButton.innerText = `Create ${typeName}`;

            shade.classList.remove("hidden");
            dialog.classList.remove("hidden");
        }
    }

    hide() {
        const shade = document.getElementById("create-note-dialog-shade")!;
        const dialog = document.getElementById("create-note-dialog")!;

        shade.classList.add("hidden");
        dialog.classList.add("hidden");
    }

    processNote() {
        const titleInput = (document.querySelector("div#create-note-dialog input") as HTMLInputElement)!;
        const contentInput = (document.querySelector("div#create-note-dialog textarea") as HTMLTextAreaElement)!;

        NoteManagement.createNote(titleInput.value,contentInput.value);
        NoteManagement.refreshAll();

        NewNoteDialog.hide();
    }

    initDone:boolean = false;
}

const typeNames = new Map<string,string>([
    [
        "note","Note"
    ],
    [
        "todo","ToDo"
    ]
]);


export enum dialogTypes { 
    todo,
    note
  }

export const NewNoteDialog = new NND();
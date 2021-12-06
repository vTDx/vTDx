import { ErrorManagement } from "./error";
import { NoteManagement } from "./notes";
import { taskManagement } from "./tasks";

class NND {
  init() {
    const dialog = document.createElement("div");
    const shade = document.createElement("div");

    const header = document.createElement("h3");

    const textTitle = document.createElement("p");
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
    createButton.id = "create-button";

    cancelButton.innerText = "Cancel";
    createButton.innerText = "Create {{type}}";

    cancelButton.addEventListener("click", this.hide);

    controls.append(cancelButton, createButton);

    dialog.append(
      header,
      textTitle,
      titleInput,
      textContent,
      contentInput,
      controls
    );

    document.querySelector("div.content")?.append(shade, dialog);

    this.initDone = true;
  }

  show(type: dialogTypes, clearFields?: boolean) {
    if (this.initDone) {
      const titleInput = (document.querySelector(
        "div#create-note-dialog input"
      ) as HTMLInputElement)!;
      const contentInput = (document.querySelector(
        "div#create-note-dialog textarea"
      ) as HTMLTextAreaElement)!;
      const shade = document.getElementById("create-note-dialog-shade")!;
      const dialog = document.getElementById("create-note-dialog")!;
      const header = document.querySelector(
        "div#create-note-dialog h3"
      ) as HTMLElement;
      const createButton = document.querySelector(
        "div#create-note-dialog button#create-button"
      ) as HTMLButtonElement;
      const paraphs = document.querySelectorAll(
        "div#create-note-dialog p.nomargin"
      );

      const typeName = typeNames.get(dialogTypes[type]);

      if (clearFields) {
        titleInput.value = "";
        contentInput.value = "";
      }

      header.innerText = `Create New ${typeName}`;

      createButton.innerText = `Create ${typeName}`;

      shade.classList.remove("hidden");
      dialog.classList.remove("hidden");

      if (dialogTypes[type] == "task") {
        contentInput.style.display = "none";
        (paraphs[1] as HTMLParagraphElement).style.display = "none";
        titleInput.style.marginBottom = "40px";
        createButton.addEventListener("click", this.processtask);
        (paraphs[0] as HTMLParagraphElement).innerText = "Content";
      } else {
        contentInput.style.display = "";
        (paraphs[1] as HTMLParagraphElement).style.display = "";
        titleInput.style.marginBottom = "";
        createButton.addEventListener("click", this.processNote);
        (paraphs[0] as HTMLParagraphElement).innerText = "Title";
      }
    }
  }

  hide() {
    const shade = document.getElementById("create-note-dialog-shade")!;
    const dialog = document.getElementById("create-note-dialog")!;

    shade.classList.add("hidden");
    dialog.classList.add("hidden");
  }

  processNote() {
    const titleInput = (document.querySelector(
      "div#create-note-dialog input"
    ) as HTMLInputElement)!;
    const contentInput = (document.querySelector(
      "div#create-note-dialog textarea"
    ) as HTMLTextAreaElement)!;

    if (titleInput.value && contentInput.value) {
      NoteManagement.createNote(titleInput.value, contentInput.value);
      NewNoteDialog.hide();
    } else {
      ErrorManagement.toast({
        text: "title or content fields are not filled out.",
        title: "Unable to create note",
        delay: 3000,
      });
    }
    NoteManagement.refreshAll();
  }

  processtask() {
    const titleInput = (document.querySelector(
      "div#create-note-dialog input"
    ) as HTMLInputElement)!;

    if (titleInput.value) {
      taskManagement.createtask(titleInput.value);
      NewNoteDialog.hide();
    } else {
      ErrorManagement.toast({
        text: "Content field is not filled out.",
        title: "Unable to create task",
        delay: 3000,
      });
    }

    taskManagement.refreshAll();
  }

  initDone: boolean = false;
}

const typeNames = new Map<string, string>([
  ["note", "Note"],
  ["task", "task"],
]);

export enum dialogTypes {
  task,
  note,
}

export const NewNoteDialog = new NND();

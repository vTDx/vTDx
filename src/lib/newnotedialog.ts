import { ErrorManagement } from "./error";
import { NoteManagement } from "./notes";
import { TaskManagement } from "./tasks";

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

    titleInput.id = "title-inp";

    contentInput.id = "content-inp";

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

  show(data: NewNoteDialogData) {
    if (this.initDone) {
      const titleInput = document.querySelector(
        "div#create-note-dialog input"
      ) as HTMLInputElement;

      const contentInput = document.querySelector(
        "div#create-note-dialog textarea"
      ) as HTMLTextAreaElement;

      const shade = document.getElementById("create-note-dialog-shade");
      const dialog = document.getElementById("create-note-dialog");
      
      const header = document.querySelector(
        "div#create-note-dialog h3"
      ) as HTMLElement;
      
      const createButton = document.querySelector(
        "div#create-note-dialog button#create-button"
      ) as HTMLButtonElement;
      
      const paraphs = document.querySelectorAll(
        "div#create-note-dialog p.nomargin"
      );

      if (data.clearFields) {
        titleInput.value = "";
        contentInput.value = "";
      } else {
        titleInput.value = data.titleFieldText || "";
        contentInput.value = data.contentFieldText || "";
      }

      header.innerText = data.windowTitle;

      createButton.innerText = data.buttonText;

      shade!.classList.remove("hidden");
      dialog!.classList.remove("hidden");

      contentInput.style.display = data.hideContentField ? "none" : "";

      titleInput.style.display = data.hideTitleField ? "none" : "";

      (paraphs[1] as HTMLParagraphElement).style.display = data.hideContentField
        ? "none"
        : "";

      titleInput.style.marginBottom = data.hideContentField ? "50px" : "";

      createButton.addEventListener("click", x);

      function x(e:Event) {
        createButton.removeEventListener("click", x);
        e.stopPropagation();
        e.stopImmediatePropagation();

        const title =
          (document.getElementById("title-inp") as HTMLInputElement).value ||
          "";

        const cntnt =
          (document.getElementById("content-inp") as HTMLTextAreaElement)
            .value || "";

        data.buttonAction(title, cntnt);

        NewNoteDialog.hide();
      }

      (paraphs[0] as HTMLParagraphElement).innerText = data.nodeTitle;
    }
  }

  hide() {
    const shade = document.getElementById("create-note-dialog-shade");
    const dialog = document.getElementById("create-note-dialog");

    shade?.classList.add("hidden");
    dialog?.classList.add("hidden");
  }

  processNote() {
    const titleInput = document.querySelector(
      "div#create-note-dialog input"
    ) as HTMLInputElement;

    const contentInput = document.querySelector(
      "div#create-note-dialog textarea"
    ) as HTMLTextAreaElement;

    if (titleInput.value && contentInput.value) {
      NoteManagement.createNote(titleInput.value, contentInput.value);

      NewNoteDialog.hide();
      
      ErrorManagement.toast({
        text: "Note created!",
        title: "",
        delay: 3000,
      });
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
    const titleInput = document.querySelector(
      "div#create-note-dialog input"
    ) as HTMLInputElement;

    if (titleInput.value) {
      TaskManagement.createTask(titleInput.value);

      NewNoteDialog.hide();
    } else {
      ErrorManagement.toast({
        text: "Content field is not filled out.",
        title: "Unable to create task",
        delay: 3000,
      });
    }

    TaskManagement.refreshAll();
  }

  initDone = false;
}

export interface NewNoteDialogData {
  windowTitle: string;
  nodeTitle: string;
  nodeContent?: string;
  hideTitleField: boolean;
  hideContentField: boolean;
  buttonText: string;
  buttonAction: (title: string, content: string) => void;
  clearFields: boolean;
  contentFieldText?: string;
  titleFieldText?: string;
}

export const NewNoteDialog = new NND();

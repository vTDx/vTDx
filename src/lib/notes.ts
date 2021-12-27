import hljs from "highlight.js/lib/core";
import { ErrorManagement } from "./error";
import { Error } from "./error";
import { PageManagement } from "./page";
import { NewNoteDialog, NewNoteDialogData } from "./newnotedialog";
import { MarkDown } from "./markdown";
import { TrashManagement } from "./trash";

class NM {
  countPinned(): number {
    let pinned = 0;

    const data = this.getNotes();

    for (let i = 0; i < data.length; i++) {
      if (data[i]!.pinned && !data[i]!.deleted) pinned++;
    }

    return pinned;
  }

  countUnpinned(): number {
    return this.getNotes().length - this.countPinned();
  }

  countNotes(): number {
    let pinned = 0;

    const data = this.getNotes();

    for (let i = 0; i < data.length; i++) {
      if (!data[i]!.deleted) {
        pinned++;
      }
    }

    return pinned;
  }

  populateAllNotes(clear?: boolean, target?: HTMLElement) {
    if (!target) target = document.getElementById("page-allnotes")!;

    if (clear) target.innerHTML = "";

    const notes = this.getNotes();

    let noteCounter = 0;

    for (let i = 0; i < notes.length; i++) {
      if (!notes[i]?.deleted) {
        this.displayNote(i, target);

        noteCounter++;
      }
    }

    if (!noteCounter) {
      const messageData: Error = {
        materialIcon: "description",
        message: "You have no notes.",
        id: "page-allnotes",
        buttonCaption: "Create a note",
        buttonAction: () => {
          const data: NewNoteDialogData = {
            windowTitle: "Create new Note",
            nodeTitle: "Title",
            hideTitleField: false,
            hideContentField: false,
            buttonText: "Create note",
            buttonAction: (title: string, content: string) => {
              NoteManagement.createNote(title, content);
              NoteManagement.refreshAll();
            },
            clearFields: true,
          };

          NewNoteDialog.show(data);
        },
      };

      ErrorManagement.newError(messageData);
    }
  }

  populatePinnedNotes(clear?: boolean, target?: HTMLElement) {
    if (!target) target = document.getElementById("page-pinned")!;

    if (clear) target.innerHTML = "";

    const notes = this.getNotes();
    let pinnedAmount = 0;

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].pinned && !notes[i].deleted) {
        this.displayNote(i, target);
        pinnedAmount++;
      }
    }

    if (!pinnedAmount) {
      const messageData: Error = {
        materialIcon: "bookmark",
        message: "You have no pinned notes.",
        id: "page-pinned",
        buttonCaption: "Goto your notes",
        buttonAction: () => {
          PageManagement.switch(
            "allnotes",
            document.getElementById("button-page-allnotes") ||
              document.createElement("div")
          );
        },
      };

      ErrorManagement.newError(messageData);
    }
  }

  refreshAll() {
    this.populateAllNotes(true);
    this.populatePinnedNotes(true);

    const allNotesCounter = (document.querySelector(
      "button#button-page-allnotes span.counter"
    ) || document.createElement("div")) as HTMLSpanElement;

    const PinNotesCounter = (document.querySelector(
      "button#button-page-pinned span.counter"
    ) || document.createElement("div")) as HTMLSpanElement;

    allNotesCounter.innerText = `${this.countNotes()}`;
    PinNotesCounter.innerText = `${this.countPinned()}`;

    this.updatePageButtonTitles();
  }

  updatePageButtonTitles() {
    const buttons = document.querySelectorAll("button.option.page");

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons?.[i] as HTMLButtonElement;
      const counter = button.lastChild as HTMLSpanElement;
      const innerText = (button.children[1] as HTMLSpanElement).innerText!;

      if (counter.className == "counter") {
        button.title = `${innerText} (${counter.innerText})`;
      }
    }
  }

  createNote(title: string, content: string) {
    const json: Note[] = this.getNotes();

    const newNote: Note = {
      title,
      content,
      pinned: false,
      deleted: false,
      priority: priorities.low
    };

    json.push(newNote);

    localStorage.setItem("notestore", JSON.stringify(json));

    ErrorManagement.toast({
      text: `Note Created!`,
      title: "",
      delay: 3000,
    });
  }

  deleteNote(i: number) {
    const notes = this.getNotes();

    if (i <= notes.length) {
      TrashManagement.moveNoteToTrash(i);

      ErrorManagement.toast({
        text: `Note #${i + 1} moved to trash.`,
        title: "",
        delay: 3000,
      });
    }
  }

  pinNote(i: number) {
    const notes = this.getNotes();

    if (i <= notes.length) {
      notes[i].pinned = true;

      ErrorManagement.toast({
        text: `Pinned Note #${i + 1}.`,
        title: "",
        delay: 3000,
      });
    }

    localStorage.setItem("notestore", JSON.stringify(notes));
  }

  unPinNote(i: number) {
    const notes = this.getNotes();

    if (i <= notes.length) {
      notes[i].pinned = false;

      ErrorManagement.toast({
        text: `Unpinned Note #${i + 1}.`,
        title: "",
        delay: 3000,
      });
    }

    localStorage.setItem("notestore", JSON.stringify(notes));
  }

  togglePinnedNote(i: number) {
    const notes = this.getNotes();

    if (i <= notes.length) {
      if (notes[i].pinned) {
        this.unPinNote(i);
      } else {
        this.pinNote(i);
      }

      this.refreshAll();
    }
  }

  getNotes() {
    const notes = JSON.parse(localStorage.getItem("notestore")!) || [];

    return notes;
  }

  displayNote(i: number, target: HTMLElement) {
    if (!target) target = document.getElementById("page-allnotes")!;

    const notes = this.getNotes();

    const note = document.createElement("div");
    const header = document.createElement("h3");
    const content = document.createElement("p");
    const deleteButton = document.createElement("button");
    const deleteButtonIcon = document.createElement("span");
    const pinButton = document.createElement("button");
    const pinButtonIcon = document.createElement("span");
    const editButton = document.createElement("button");
    const editButtonIcon = document.createElement("span");

    header.className = "header";
    content.className = "content";

    deleteButton.className = "delete";
    deleteButton.title = "Delete Note";
    deleteButton.addEventListener("click", () => {
      this.deleteNote(i);
      this.refreshAll();
    });

    pinButton.className = `pin${notes[i].pinned ? " unpin" : ""}`;
    pinButton.title = `${notes[i].pinned ? "Unpin" : "Pin"} this Note`;
    pinButton.addEventListener("click", () => {
      this.togglePinnedNote(i);
      this.refreshAll();
    });

    editButton.className = "edit";
    editButton.title = "Edit this Note";
    editButton.addEventListener("click", () => {
      this.editNote(i);
      this.refreshAll();
    });

    deleteButtonIcon.className = "material-icons";
    deleteButtonIcon.innerText = "delete";

    pinButtonIcon.className = "material-icons";
    pinButtonIcon.innerText = `bookmark${notes[i].pinned ? "_remove" : "_add"}`;

    editButtonIcon.className = "material-icons";
    editButtonIcon.innerText = "edit";

    header.innerHTML = MarkDown.toHTML(notes[i]!.title);
    content.innerHTML = MarkDown.toHTML(notes[i]!.content);

    deleteButton.append(deleteButtonIcon);
    pinButton.append(pinButtonIcon);
    editButton.append(editButtonIcon);

    note.className = "note";
    note.append(header, content, deleteButton, pinButton, editButton);

    target.append(note);

    document.querySelectorAll("code.ts.language-ts").forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });
  }

  editNote(i: number) {
    const json: Note[] = this.getNotes();
    const data: NewNoteDialogData = {
      windowTitle: "Edit Note",
      nodeTitle: "Title",
      hideTitleField: false,
      hideContentField: false,
      buttonText: "edit note",
      contentFieldText: json[i]?.content,
      titleFieldText: json[i]?.title,
      buttonAction: (title: string, content: string) => {
        const note: Note = {
          title,
          content,
          pinned: json[i]?.pinned,
          deleted: json[i]?.deleted,
          priority: json[i]?.priority
        };

        json[i] = note;

        localStorage.setItem("notestore", JSON.stringify(json));

        NoteManagement.refreshAll();

        ErrorManagement.toast({
          text: `Note #${i + 1} saved.`,
          title: "",
          delay: 3000,
        });
      },
      clearFields: false,
    };

    NewNoteDialog.show(data);
  }
}

export interface Note {
  title: string;
  content: string;
  pinned: boolean;
  deleted: boolean;
  priority: priorities;
}

export enum priorities {
  low,
  high,
}

export const NoteManagement = new NM();

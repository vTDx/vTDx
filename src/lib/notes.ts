import { ErrorManagement } from "./error";
import { Error } from "./error";
import { PageManagement } from "./page";
class NM {
  populateAllNotes(clear?: boolean, target?: HTMLElement) {
    if (!target) target = document.getElementById("page-allnotes")!;

    if (clear) target.innerHTML = "";

    const notes = this.getNotes();

    for (let i = 0; i < notes.length; i++) {
      this.displayNote(i, target);
    }

    if (!notes.length) {
      const messageData: Error = {
        materialIcon: "warning",
        message: "You have no notes.",
        id: "page-allnotes",
        buttonCaption: "Create a note",
        buttonAction: () => {
          PageManagement.switch("newnote")
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
      console.log(notes[i].pinned);
      if (notes[i].pinned) {
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
            document.getElementById("button-page-allnotes")!
          );
        },
      };
      ErrorManagement.newError(messageData);
    }
  }

  refreshAll() {
    this.populateAllNotes(true);
    this.populatePinnedNotes(true);
  }

  createNote(title: string, content: string) {
    let json: Note[] = this.getNotes();

    const newNote: Note = {
      title,
      content,
      pinned: false,
    };

    json.push(newNote);

    localStorage.setItem("notestore", JSON.stringify(json));
  }

  deleteNote(i: number) {
    let notes = this.getNotes();

    if (i <= notes.length) {
      notes.splice(i, 1);
    }

    localStorage.setItem("notestore", JSON.stringify(notes));
  }

  pinNote(i: number) {
    let notes = this.getNotes();

    if (i <= notes.length) {
      notes[i].pinned = true;
    }

    localStorage.setItem("notestore", JSON.stringify(notes));
  }

  unPinNote(i: number) {
    let notes = this.getNotes();

    if (i <= notes.length) {
      notes[i].pinned = false;
    }

    localStorage.setItem("notestore", JSON.stringify(notes));
  }

  togglePinnedNote(i: number) {
    let notes = this.getNotes();

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
    let notes = JSON.parse(localStorage.getItem("notestore")!) || [];

    return notes;
  }

  displayNote(i: number, target: HTMLElement) {
    if (!target) target = document.getElementById("page-allnotes")!;
    const notes = this.getNotes();

    const note = document.createElement("div");
    const header = document.createElement("h3");
    const headerText = document.createTextNode(notes[i]!.title);
    const content = document.createElement("p");
    const contentText = document.createTextNode(notes[i]!.content);
    const deleteButton = document.createElement("button");
    const deleteButtonIcon = document.createElement("span");
    const pinButton = document.createElement("button");
    const pinButtonIcon = document.createElement("span");

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

    deleteButtonIcon.className = "material-icons";
    deleteButtonIcon.innerText = "delete";

    pinButtonIcon.className = "material-icons";
    pinButtonIcon.innerText = `bookmark${notes[i].pinned ? "_remove" : "_add"}`;

    header.append(headerText);
    content.append(contentText);
    deleteButton.append(deleteButtonIcon);
    pinButton.append(pinButtonIcon);

    note.className = "note";
    note.append(header, content, deleteButton, pinButton);

    target.append(note);
  }

  showCreateNoteDialog(type:getUserInputDialogTargets, action:() => void) {
    const titleField = document.getElementById("new-note-title") as HTMLInputElement;
    const contentField = document.getElementById("new-note-content") as HTMLTextAreaElement;
    const button = document.getElementById("new-note-create");

    button?.addEventListener("click",action)
    
    titleField.value = "";
    contentField.value = "";
  }
}

export interface Note {
  title: string;
  content: string;
  pinned: boolean;
}

export enum getUserInputDialogTargets { 
  todo,
  note
}

export const NoteManagement = new NM();

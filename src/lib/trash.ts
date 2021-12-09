import hljs from "highlight.js";
import { ErrorManagement, Error } from "./error";
import { MarkDown } from "./markdown";
import { NoteManagement } from "./notes";
import { PageManagement } from "./page";
import { TaskManagement } from "./tasks";

class TM {
  moveTaskToTrash(i: number) {
    const tasks = TaskManagement.getTasks();

    if (i <= tasks.length) {
      tasks[i]!.deleted = true;

      localStorage.setItem("taskstore", JSON.stringify(tasks));
    }

    this.populateTrashPage();
  }

  moveNoteToTrash(i: number) {
    const notes = NoteManagement.getNotes();

    if (i <= notes.length) {
      notes[i]!.deleted = true;

      localStorage.setItem("notestore", JSON.stringify(notes));
    }
    this.populateTrashPage();
  }

  restoreNoteFromTrash(i: number) {
    const notes = NoteManagement.getNotes();

    if (i <= notes.length) {
      notes[i]!.deleted = false;

      localStorage.setItem("notestore", JSON.stringify(notes));
    }

    this.populateTrashPage();
    NoteManagement.refreshAll();
  }

  restoreTaskFromTrash(i: number) {
    const tasks = TaskManagement.getTasks();

    if (i <= tasks.length) {
      tasks[i]!.deleted = false;

      console.log(tasks[i]);
      localStorage.setItem("taskstore", JSON.stringify(tasks));
    }

    this.populateTrashPage();
    NoteManagement.refreshAll();
  }

  populateTrashPage() {
    const target = document.getElementById("page-trash")!;
    const tasks = TaskManagement.getTasks();
    const notes = NoteManagement.getNotes();

    const notesHeader = document.createElement("h2");
    const tasksHeader = document.createElement("h2");

    const noNotesText = document.createElement("p");
    const noTasksText = document.createElement("p");

    let taskCounter = 0;
    let noteCounter = 0;

    target.innerText = "";

    notesHeader.innerText = "Deleted Notes";
    tasksHeader.innerText = "Deleted Tasks";

    noNotesText.innerText = "There are no deleted notes.";
    noTasksText.innerText = "There are no deleted tasks.";

    target.append(tasksHeader);

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].deleted) {
        this.displayTrashTask(i, target);
        taskCounter++;
        tasksHeader.style.display = "";
      }
    }

    if (!taskCounter) tasksHeader.style.display = "none";

    target.append(notesHeader);

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].deleted) {
        this.displayTrashNote(i, target);
        noteCounter++;
        tasksHeader.style.display = "";
      }
    }

    if (!noteCounter) notesHeader.style.display = "none";

    if (!noteCounter && !taskCounter) {
      const messageData: Error = {
        materialIcon: "delete_sweep",
        message: "Trash is empty",
        id: "page-trash",
        buttonCaption: "Go Home",
        buttonAction: () => {
          PageManagement.switch("home");
        },
      };
      ErrorManagement.newError(messageData);
    }
  }

  displayTrashNote(i: number, target: HTMLElement) {
    if (!target)
      target =
        document.getElementById("page-trash") || document.createElement("div");

    const notes = NoteManagement.getNotes();

    const note = document.createElement("div");
    const header = document.createElement("h3");
    const content = document.createElement("p");
    const restoreButton = document.createElement("button");
    const restoreButtonIcon = document.createElement("span");
    const deleteButton = document.createElement("button");
    const deleteButtonIcon = document.createElement("span");

    header.className = "header";
    content.className = "content";

    restoreButton.className = "delete";
    restoreButton.title = "Restore Note";

    restoreButton.addEventListener("click", () => {
      this.restoreNoteFromTrash(i);
      NoteManagement.refreshAll();
    });

    restoreButtonIcon.className = "material-icons";
    restoreButtonIcon.innerText = "restore_from_trash";

    deleteButton.className = "pin unpin";
    deleteButton.title = "Delete Note Forever";
    deleteButton.addEventListener("click", () => {
      this.deleteNoteForever(i);
      NoteManagement.refreshAll();
    });

    deleteButtonIcon.className = "material-icons";
    deleteButtonIcon.innerText = "delete_forever";

    deleteButton.append(deleteButtonIcon);

    header.innerHTML = MarkDown.toHTML(notes[i]!.title);
    content.innerHTML = MarkDown.toHTML(notes[i]!.content);

    restoreButton.append(restoreButtonIcon);

    note.className = "note";
    note.append(header, content, restoreButton, deleteButton);

    target.append(note);

    document.querySelectorAll("code.ts.language-ts").forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });
  }

  displayTrashTask(i: number, target: HTMLElement) {
    if (!target)
      target =
        document.getElementById("page-trash") || document.createElement("div");

    const tasks = TaskManagement.getTasks();

    const task = document.createElement("div");
    const header = document.createElement("h3");
    const restoreButton = document.createElement("button");
    const restoreButtonIcon = document.createElement("span");
    const deleteButton = document.createElement("button");
    const deleteButtonIcon = document.createElement("span");

    header.className = "header";

    restoreButton.className = "delete";
    restoreButton.title = "Restore Task";

    restoreButton.addEventListener("click", () => {
      this.restoreTaskFromTrash(i);
      TaskManagement.refreshAll();
    });

    restoreButtonIcon.className = "material-icons";
    restoreButtonIcon.innerText = "restore_from_trash";

    deleteButton.className = "edit";
    deleteButton.title = "Edit task";
    deleteButton.addEventListener("click", () => {
      this.deleteTaskForever(i);
      TaskManagement.refreshAll();
    });

    deleteButtonIcon.className = "material-icons";
    deleteButtonIcon.innerText = "delete_forever";

    deleteButton.append(deleteButtonIcon);

    header.innerHTML = MarkDown.toHTML(tasks[i]!.text);

    restoreButton.append(restoreButtonIcon);

    task.className = "task";
    task.append(header, restoreButton, deleteButton);

    target.append(task);

    document.querySelectorAll("code.ts.language-ts").forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });
  }

  init() {
    this.populateTrashPage();
  }

  deleteNoteForever(i: number) {
    const notes = NoteManagement.getNotes();

    if (i <= notes.length) {
      notes.splice(i, 1);
    }

    localStorage.setItem("notestore", JSON.stringify(notes));

    this.populateTrashPage();
  }

  deleteTaskForever(i: number) {
    const json = TaskManagement.getTasks();

    if (i <= json.length) {
      json.splice(i, 1);
      ErrorManagement.toast({
        text: `Task #${i + 1} deleted.`,
        title: "",
        delay: 3000,
      });
    }

    localStorage.setItem("taskstore", JSON.stringify(json));

    this.populateTrashPage();
  }

  emptyTrash() {
    const tasks = TaskManagement.getTasks();
    const notes = NoteManagement.getNotes();

    for (let t = 0; t < tasks.length; t++) {
      this.deleteTaskForever(t);
    }

    for (let n = 0; n < notes.length; n++) {
      this.deleteNoteForever(n);
    }

    this.populateTrashPage();
  }

  countDeletedNotes() {

  }

  countDeletedTasks() {
    
  }
}

export const TrashManagement = new TM();

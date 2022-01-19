import { Error, ErrorManagement } from "./error";
import { MarkDown } from "./markdown";
import { NewNoteDialog, NewNoteDialogData } from "./newnotedialog";
import { PageManagement } from "./page";
import { TrashManagement } from "./trash";

class TDM {
  countFinished(): number {
    let counter = 0;

    const data = this.getTasks();

    for (let i = 0; i < data.length; i++) {
      if (data[i]?.finished && !data[i]?.deleted) counter++;
    }

    return counter;
  }

  countUnfinished(): number {
    const counter = this.countFinished();

    return this.countTasks() - counter;
  }

  countTasks(): number {
    let counter = 0;

    const data = this.getTasks();

    for (let i = 0; i < data.length; i++) {
      if (!data[i]?.deleted) counter++;
    }

    return counter;
  }

  populateTaskPage(clear?: boolean, target?: HTMLElement) {
    if (!target)
      target =
        document.getElementById("page-task") || document.createElement("div");

    if (target) {
      if (clear) target.innerHTML = "";

      const Tasks = this.getTasks();

      let taskCounter = 0;

      for (let i = 0; i < Tasks.length; i++) {
        if (!Tasks[i]?.deleted) {
          this.displayTask(i, target);
          taskCounter++;
        }
      }

      if (!taskCounter) {
        const messageData: Error = {
          materialIcon: "broken_image",
          message: "You have no Tasks",
          id: "page-task",
          buttonCaption: "Create a task",
          buttonAction: () => {
            const data: NewNoteDialogData = {
              windowTitle: "Create new Task",
              nodeTitle: "Content",
              hideTitleField: false,
              hideContentField: true,
              buttonText: "Create task",
              buttonAction: (title: string) => {
                this.createTask(title);
                this.refreshAll();
              },
              clearFields: true,
            };
            NewNoteDialog.show(data);
          },
        };
        ErrorManagement.newError(messageData);
      }
    }
  }

  populateUnFinishedTasksPage(clear?: boolean, target?: HTMLElement) {
    if (!target)
      target =
        document.getElementById("page-unftasks") ||
        document.createElement("div");

    if (target) {
      if (clear) target.innerHTML = "";

      const Tasks = this.getTasks();
      let unfinishedTaskCount = 0;

      for (let i = 0; i < Tasks.length; i++) {
        if (!Tasks[i].finished && !Tasks[i]?.deleted) {
          this.displayTask(i, target);
          unfinishedTaskCount++;
        }
      }

      if (!unfinishedTaskCount) {
        const messageData: Error = {
          materialIcon: Tasks.length ? "check" : "broken_image",
          message: Tasks.length
            ? "All your Tasks are finished!"
            : "You don't have any Tasks!",
          id: "page-unftasks",
          buttonCaption: "Goto your Tasks",
          buttonAction: () => {
            PageManagement.switch(
              "task",
              document.getElementById("button-page-task") ||
                document.createElement("div")
            );
          },
        };
        ErrorManagement.newError(messageData);
      }
    }
  }

  populateFinishedTasksPage(clear?: boolean, target?: HTMLElement) {
    if (!target)
      target =
        document.getElementById("page-fintasks") ||
        document.createElement("div");

    if (target) {
      if (clear) target.innerHTML = "";

      const Tasks = this.getTasks();
      let finishedTaskCount = 0;

      for (let i = 0; i < Tasks.length; i++) {
        if (Tasks[i].finished && !Tasks[i]?.deleted) {
          this.displayTask(i, target);
          finishedTaskCount++;
        }
      }

      if (!finishedTaskCount) {
        const messageData: Error = {
          materialIcon: Tasks.length ? "error_outline" : "broken_image",
          message: Tasks.length
            ? "You haven't completed any of your Tasks!"
            : "You don't have any Tasks!",
          id: "page-fintasks",
          buttonCaption: "Goto your Tasks",
          buttonAction: () => {
            PageManagement.switch(
              "task",
              document.getElementById("button-page-task") ||
                document.createElement("div")
            );
          },
        };

        ErrorManagement.newError(messageData);
      }
    }
  }

  createTask(text: string) {
    const json: Task[] = this.getTasks();

    const data: Task = {
      text,
      finished: false,
      deleted: false,
    };

    json.push(data);

    localStorage.setItem("taskstore", JSON.stringify(json));

    ErrorManagement.toast({
      title: "",
      text: "Task Created!",
      delay: 3000,
    });
  }

  displayTask(i: number, target: HTMLElement) {
    const Tasks = this.getTasks();

    if (i <= Tasks.length) {
      if (!target)
        target =
          document.getElementById("page-task") || document.createElement("div");

      const task = document.createElement("div");
      const header = document.createElement("p");
      const deleteButton = document.createElement("button");
      const deleteButtonIcon = document.createElement("span");
      const finishedButton = document.createElement("button");
      const finishedButtonIcon = document.createElement("span");
      const editButton = document.createElement("button");
      const editButtonIcon = document.createElement("span");

      header.className = "header";

      deleteButton.className = "delete";
      deleteButton.title = "Delete task";
      deleteButton.addEventListener("click", () => {
        this.deleteTask(i);
        this.refreshAll();
      });

      finishedButton.className = "finish";
      finishedButton.title = `${
        Tasks[i].finished ? "Mark not done" : "Mark done"
      }`;

      finishedButton.addEventListener("click", () => {
        this.toggletaskFinished(i);
        this.refreshAll();
      });

      header.addEventListener("click", () => {
        this.toggletaskFinished(i);
        this.refreshAll();
      });

      editButton.className = "edit";
      editButton.title = "Edit task";
      editButton.addEventListener("click", () => {
        this.editTask(i);
        this.refreshAll();
      });

      finishedButtonIcon.className = "material-icons";
      finishedButtonIcon.innerText = `${
        Tasks[i].finished ? "check_box" : "check_box_outline_blank"
      }`;

      deleteButtonIcon.className = "material-icons";
      deleteButtonIcon.innerText = "delete";

      editButtonIcon.className = "material-icons";
      editButtonIcon.innerText = "edit";

      header.innerHTML = MarkDown.toHTML(Tasks[i]?.text);

      deleteButton.append(deleteButtonIcon);
      finishedButton.append(finishedButtonIcon);
      editButton.append(editButtonIcon);

      task.className = "task";
      task.append(header, finishedButton, deleteButton, editButton);

      target.append(task);
    }
  }

  getTasks() {
    const Tasks = JSON.parse(localStorage.getItem("taskstore")!) || [];

    return Tasks;
  }

  deleteTask(i: number) {
    const json = this.getTasks();

    if (i <= json.length) {
      TrashManagement.moveTaskToTrash(i);

      ErrorManagement.toast({
        text: `Task #${i + 1} moved to trash.`,
        title: "",
        delay: 3000,
      });
    }
  }

  refreshAll() {
    this.populateTaskPage(true);
    this.populateUnFinishedTasksPage(true);
    this.populateFinishedTasksPage(true);

    const tasksCounter = (document.querySelector(
      "button#button-page-task span.counter"
    ) || document.createElement("div")) as HTMLSpanElement;

    const finishedTasksCounter = (document.querySelector(
      "button#button-page-fintasks span.counter"
    ) || document.createElement("div")) as HTMLSpanElement;

    const unfinishedTasksCounter = (document.querySelector(
      "button#button-page-unftasks span.counter"
    ) || document.createElement("div")) as HTMLSpanElement;

    tasksCounter.innerText = `${this.countTasks()}`;
    finishedTasksCounter.innerText = `${this.countFinished()}`;
    unfinishedTasksCounter.innerText = `${this.countUnfinished()}`;
  }

  toggletaskFinished(i: number) {
    const data = this.getTasks();

    if (i <= data.length) {
      if (data[i]?.finished) {
        this.markUnfinished(i);
      } else {
        this.markFinished(i);
      }
    }
  }

  markUnfinished(i: number) {
    const data = this.getTasks();

    if (i <= data.length) {
      data[i].finished = false;

      ErrorManagement.toast({
        text: `Marked task #${i + 1} as unfinished.`,
        title: "",
        delay: 3000,
      });
    }

    localStorage.setItem("taskstore", JSON.stringify(data));
  }

  markFinished(i: number) {
    const data = this.getTasks();

    if (i <= data.length) {
      data[i].finished = true;

      ErrorManagement.toast({
        text: `Marked task #${i + 1} as finished.`,
        title: "",
        delay: 3000,
      });
    }

    localStorage.setItem("taskstore", JSON.stringify(data));
  }

  completeAll() {
    const data = this.getTasks();

    for (let i = 0; i < data.length; i++) {
      data[i].finished = true;
    }

    ErrorManagement.toast({
      text: `Marked all Tasks as finished.`,
      title: "",
      delay: 3000,
    });

    localStorage.setItem("taskstore", JSON.stringify(data));

    this.refreshAll();
  }

  editTask(i: number) {
    const json: Task[] = this.getTasks();

    const data: NewNoteDialogData = {
      windowTitle: "Edit Task",
      nodeTitle: "Content",
      hideTitleField: false,
      hideContentField: true,
      buttonText: "edit Task",
      titleFieldText: json[i]?.text,
      buttonAction: (text: string) => {
        const Task: Task = {
          text,
          finished: json[i]?.finished,
          deleted: json[i]?.deleted,
        };

        json[i] = Task;

        localStorage.setItem("taskstore", JSON.stringify(json));
        TaskManagement.refreshAll();

        ErrorManagement.toast({
          text: `Task #${i + 1} saved.`,
          title: "",
          delay: 3000,
        });
      },
      clearFields: false,
    };

    NewNoteDialog.show(data);
  }
}

interface Task {
  text: string;
  finished: boolean;
  deleted: boolean;
}

export const TaskManagement = new TDM();

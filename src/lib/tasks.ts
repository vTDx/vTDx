import { Error, ErrorManagement } from "./error";
import { dialogTypes, NewNoteDialog } from "./newnotedialog";
import { PageManagement } from "./page";

class TDM {
  populatetaskPage(clear?: boolean, target?: HTMLElement) {
    if (!target) target = document.getElementById("page-task")!;

    if (target) {
      if (clear) target.innerHTML = "";

      const tasks = this.gettasks();
  
      for (let i = 0; i < tasks.length; i++) {
        this.displaytask(i, target);
      }
  
      if (!tasks.length) {
        const messageData: Error = {
          materialIcon: "task",
          message: "You have no tasks.",
          id: "page-task",
          buttonCaption: "Create a task",
          buttonAction: () => {
            NewNoteDialog.show(dialogTypes.task, true);
          },
        };
        ErrorManagement.newError(messageData);
      }
    }
  }

  populateUnFinishedTasksPage(clear?:boolean,target?:HTMLElement) {
    if (!target) target = document.getElementById("page-unftasks")!;

    if (target) {
      if (clear) target.innerHTML = "";

      const tasks = this.gettasks();
      let unfinishedTaskCount = 0;
  
      for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].finished) {
          this.displaytask(i, target);
          unfinishedTaskCount++;
        }
      }
  
      if (!unfinishedTaskCount) {
        const messageData: Error = {
          materialIcon: "task",
          message: "All your tasks are finished!",
          id: "page-unftasks",
          buttonCaption: "Goto your tasks",
          buttonAction: () => {
            PageManagement.switch("task",document.getElementById("button-page-task")!);
          },
        };
        ErrorManagement.newError(messageData);
      }
    }
  }

  createtask(text: string) {
    let json: task[] = this.gettasks();

    const data: task = {
      text,
      finished: false,
    };

    json.push(data);

    localStorage.setItem("taskstore", JSON.stringify(json));
  }

  displaytask(i: number, target: HTMLElement) {
    const tasks = this.gettasks();
    if (i <= tasks.length) {
      if (!target) target = document.getElementById("page-task")!;

      const task = document.createElement("div");
      const header = document.createElement("p");
      const headerText = document.createTextNode(tasks[i]!.text);
      const deleteButton = document.createElement("button");
      const deleteButtonIcon = document.createElement("span");
      const finishedButton = document.createElement("button");
      const finishedButtonIcon = document.createElement("span");

      header.className = "header";

      deleteButton.className = "delete";
      deleteButton.title = "Delete task";
      deleteButton.addEventListener("click", () => {
        this.deletetask(i);
        this.refreshAll();
      });

      finishedButton.className = "finish";
      finishedButton.title = `${
        tasks[i].finished ? "Mark not done" : "Mark done"
      }`;

      finishedButton.addEventListener("click", () => {
        this.toggletaskFinished(i);
        this.refreshAll();
      });

      finishedButtonIcon.className = "material-icons";
      finishedButtonIcon.innerText = `${
        tasks[i].finished ? "check_box" : "check_box_outline_blank"
      }`;

      deleteButtonIcon.className = "material-icons";
      deleteButtonIcon.innerText = "delete";

      header.append(headerText);
      deleteButton.append(deleteButtonIcon);
      finishedButton.append(finishedButtonIcon);

      task.className = "task";
      task.append(header, finishedButton, deleteButton);

      target.append(task);
    }
  }

  gettasks() {
    let tasks = JSON.parse(localStorage.getItem("taskstore")!) || [];

    return tasks;
  }

  deletetask(i: number) {
    const json = this.gettasks();

    if (i <= json.length) {
      json.splice(i, 1);
    }

    localStorage.setItem("taskstore", JSON.stringify(json));
  }

  refreshAll() {
    this.populatetaskPage(true);
    this.populateUnFinishedTasksPage(true);
  }

  toggletaskFinished(i: number) {
    const data = this.gettasks();

    if (i <= data.length) {
      if (data[i]!.finished) {
        this.markUnfinished(i);
      } else {
        this.markFinished(i);
      }
    }
  }

  markUnfinished(i: number) {
    const data = this.gettasks();

    if (i <= data.length) {
      data[i]!.finished = false;
    }

    localStorage.setItem("taskstore", JSON.stringify(data));
  }

  markFinished(i: number) {
    const data = this.gettasks();

    if (i <= data.length) {
      data[i]!.finished = true;
    }

    localStorage.setItem("taskstore", JSON.stringify(data));
  }

  completeAll() {
    const data = this.gettasks();

    for (let i=0;i<data.length;i++) {
      data[i]!.finished = true;
    }

    localStorage.setItem("taskstore", JSON.stringify(data));

    this.refreshAll();
  }
}

interface task {
  text: string;
  finished: boolean;
}

export const taskManagement = new TDM();

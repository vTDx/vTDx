import { Confirmation, ConfirmationBox } from "./confirm";
import { ErrorManagement } from "./error";
import { NewNoteDialog, NewNoteDialogData } from "./newnotedialog";
import { NoteManagement } from "./notes";
import { TaskManagement } from "./tasks";
import { TrashManagement } from "./trash";
import { colors, Action } from "./ui";

export const actions = new Map<string, Action>([
  [
    "newnote",
    {
      dispName: "New Note",
      materialIcon: "add_circle",
      action: () => {
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
      color: colors.purple,
      inTopBar: true,
    },
  ],
  [
    "clearall",
    {
      dispName: "Clear All Notes",
      materialIcon: "clear_all",
      action: () => {
        const data: ConfirmationBox = {
          title: "Clear All Notes",
          message:
            "Are you sure you want to clear all notes? There is no going back!",
          confirmButtonAction: () => {
            ErrorManagement.toast({
              title: "",
              text: "Cleared all notes",
              delay: 3000,
            });

            localStorage.removeItem("notestore");
            NoteManagement.refreshAll();
          },
          confirmButtonText: "Clear",
        };

        Confirmation.display(data);
      },
      color: colors.red,
      addBreak: true,
    },
  ],
  [
    "newtask",
    {
      dispName: "New Task",
      materialIcon: "note_add",
      action: () => {
        const data: NewNoteDialogData = {
          windowTitle: "Create new Task",
          nodeTitle: "Content",
          hideTitleField: false,
          hideContentField: true,
          buttonText: "Create task",
          buttonAction: (title: string) => {
            TaskManagement.createTask(title);
            TaskManagement.refreshAll();
          },
          clearFields: true,
        };
        NewNoteDialog.show(data);
      },
      color: colors.yellow,
      inTopBar: true,
    },
  ],
  [
    "clearalltasks",
    {
      dispName: "Clear All Tasks",
      materialIcon: "clear_all",
      action: () => {
        const data: ConfirmationBox = {
          title: "Clear All Tasks",
          message:
            "Are you sure you want to clear all Tasks? There is no going back!",
          confirmButtonAction: () => {
            ErrorManagement.toast({
              title: "",
              text: "Cleared all Tasks",
              delay: 3000,
            });

            localStorage.removeItem("taskstore");
            TaskManagement.refreshAll();
          },
          confirmButtonText: "Clear",
        };

        Confirmation.display(data);
      },
      color: colors.red,
    },
  ],
  [
    "finishalltasks",
    {
      dispName: "Complete All Tasks",
      materialIcon: "done_all",
      action: () => {
        const data: ConfirmationBox = {
          title: "Complete All Tasks",
          message: "Are you sure you want to complete all Tasks?",
          confirmButtonAction: () => {
            TaskManagement.completeAll();
          },
          confirmButtonText: "OK",
        };

        Confirmation.display(data);
      },
      color: colors.green,
      addBreak: true,
    },
  ],
  [
    "emptytrash",
    {
      dispName: "Empty Trash",
      materialIcon: "delete_sweep",
      action: () => {
        const data: ConfirmationBox = {
          title: "Empty Trash",
          message: "Are you sure you want to empty the trash?",
          confirmButtonAction: () => {
            ErrorManagement.toast({
              title: "",
              text: "Trash emptied",
              delay: 3000,
            });

            TrashManagement.emptyTrash();
          },
          confirmButtonText: "Empty Trash",
        };

        Confirmation.display(data);
      },
      color: colors.red,
      addBreak: true,
    },
  ],
]);

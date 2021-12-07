import { ErrorManagement } from "./error";
import { dialogTypes, NewNoteDialog } from "./newnotedialog";
import { NoteManagement } from "./notes";
import { taskManagement } from "./tasks";
import { colors, Action } from "./ui";

export const actions = new Map<string, Action>([
  [
    "newnote",
    {
      dispName: "New Note",
      materialIcon: "add_circle",
      action: () => {
        NewNoteDialog.show(dialogTypes.note, true);
      },
      color: colors.purple,
    },
  ],
  [
    "clearall",
    {
      dispName: "Clear All Notes",
      materialIcon: "clear_all",
      action: () => {
        if (
          confirm(
            "Are you sure you want to clear all notes?\n\nDoing this will clear all notes without return."
          )
        ) {
          ErrorManagement.toast({
            title: "",
            text: "Cleared all notes",
            delay: 3000,
          });
          localStorage.removeItem("notestore");
          NoteManagement.refreshAll();
        }
      },
      color: colors.red,
      addBreak: true,
    },
  ],
  [
    "newtask",
    {
      dispName: "New task",
      materialIcon: "note_add",
      action: () => {
        NewNoteDialog.show(dialogTypes.task, true);
      },
      color: colors.purple,
    },
  ],
  [
    "clearalltasks",
    {
      dispName: "Clear All tasks",
      materialIcon: "clear_all",
      action: () => {
        if (
          confirm(
            "Are you sure you want to clear all tasks?\n\nDoing this will clear all tasks without return."
          )
        ) {
          ErrorManagement.toast({
            title: "",
            text: "Cleared all tasks",
            delay: 3000,
          });
          localStorage.removeItem("taskstore");
          taskManagement.refreshAll();
        }
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
        taskManagement.completeAll();
      },
      color: colors.green,
    },
  ],
]);

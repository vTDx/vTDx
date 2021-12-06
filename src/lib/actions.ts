import { dialogTypes, NewNoteDialog } from "./newnotedialog";
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
      materialIcon: "delete",
      action: () => {
        if (
          confirm(
            "Are you sure you want to clear all notes?\n\nDoing this will clear all notes without return."
          )
        ) {
          localStorage.removeItem("notestore");
        }
      },
      color: colors.red,
      addBreak:true
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
      color: colors.orange,
      
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
          localStorage.removeItem("taskstore");
        }
      },
      color: colors.orange,
      
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

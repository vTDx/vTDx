import { dialogTypes, NewNoteDialog } from "./newnotedialog";
import { colors, Action } from "./ui";

export const actions = new Map<string, Action>([
  [
    "newnote",
    {
      dispName: "New Note",
      materialIcon: "add_circle",
      action: () => {
        NewNoteDialog.show(dialogTypes.note,true);
      },
      color: colors.purple,
    },
  ],
  [
    "newtodo",
    {
      dispName: "New Todo",
      materialIcon: "note_add",
      action: () => {
        alert("Not implemented!");
      },
      color: colors.orange,
    },
  ],
  [
    "clearall",
    {
      dispName: "Clear All Notes",
      materialIcon: "delete",
      action: () => {
        if (confirm("Are you sure you want to clear all notes?\n\nDoing this will clear all notes without return.")) {
          localStorage.removeItem("notestore");
        }
      },
      color: colors.red,
    },
  ]
]);

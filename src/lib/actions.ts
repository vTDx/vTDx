import { colors, action } from "./ui";

export const actions = new Map<string, action>([
  [
    "newnote",
    {
      dispName: "New Note",
      materialIcon: "add_circle",
      action: () => {
        alert("Not implemented!");
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
]);

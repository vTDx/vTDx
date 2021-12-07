import { colors, Page } from "./ui";

export const pages = new Map<string, Page>([
  [
    "home",
    {
      dispName: "Home",
      materialIcon: "home",
      onSidebar: true,
      color: colors.blue,
      default: true,
      addBreak:true,
      onHome:false,
    },
  ],
  [
    "allnotes",
    {
      dispName: "Notes",
      materialIcon: "description",
      onSidebar: true,
      color: colors.purple,
      hasCountableContent:true,
      onHome:true,
    },
  ],
  [
    "pinned",
    {
      dispName: "Pinned Notes",
      materialIcon: "bookmark",
      onSidebar: true,
      color: colors.green,
      addBreak:true,
      hasCountableContent:true,
      onHome:true,
    },
  ],
  [
    "task",
    {
      dispName: "Tasks",
      materialIcon: "insert_drive_file",
      onSidebar: true,
      color: colors.yellow,
      hasCountableContent:true,
      onHome:true,
    },
  ],
  [
    "unftasks",
    {
      dispName: "Unfinished Tasks",
      materialIcon: "file_open",
      onSidebar: true,
      color: colors.orange,
      hasCountableContent:true,
      onHome:true,
    },
  ],
  [
    "fintasks",
    {
      dispName: "Finished Tasks",
      materialIcon: "task",
      onSidebar: true,
      color: colors.green,
      hasCountableContent:true,
      addBreak:true,
      onHome:true,
    },
  ],
  [
    "themeselector",
    {
      dispName: "Themes",
      materialIcon:"palette",
      onSidebar:true,
      color:colors.purple,
      onHome:true,
    }
  ],
  [
    "settings",
    {
      dispName: "Settings",
      materialIcon: "settings",
      onSidebar: false,
      color: colors.gray,
    },
  ],
  [
    "error",
    {
      dispName: "Error",
      materialIcon: "error",
      onSidebar: false,
      color: colors.red,
    },
  ],
]);

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
      addBreak:true
    },
  ],
  [
    "allnotes",
    {
      dispName: "All Notes",
      materialIcon: "apps",
      onSidebar: true,
      color: colors.purple,
      hasCountableContent:true,
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
    },
  ],
  [
    "task",
    {
      dispName: "All Tasks",
      materialIcon: "insert_drive_file",
      onSidebar: true,
      color: colors.yellow,
      hasCountableContent:true,
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
    },
  ],
  [
    "themeselector",
    {
      dispName: "Themes",
      materialIcon:"palette",
      onSidebar:true,
      color:colors.purple
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

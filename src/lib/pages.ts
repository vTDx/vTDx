import { colors, page } from "./ui";

export const pages = new Map<string, page>([
  [
    "dashboard",
    {
      dispName: "Dashboard",
      materialIcon: "dashboard",
      onSidebar: true,
      color: colors.blue,
    },
  ],
  [
    "allnotes",
    {
      dispName: "All Notes",
      materialIcon: "apps",
      onSidebar: true,
      color: colors.purple,
    },
  ],
  [
    "pinned",
    {
      dispName: "Pinned Notes",
      materialIcon: "bookmark",
      onSidebar: true,
      color: colors.green,
    },
  ],
  [
    "todo",
    {
      dispName: "ToDo",
      materialIcon: "task",
      onSidebar: true,
      color: colors.orange,
    },
  ],
  [
      "settings",
      {
          dispName:"Settings",
          materialIcon:"settings",
          onSidebar:false,
          color:colors.gray
      }
  ]
]);

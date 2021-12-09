import hljs from 'highlight.js/lib/core';
import "./style/main.scss";
import { NewNoteDialog } from "./lib/newnotedialog";
import { NoteManagement } from "./lib/notes";
import { PageManagement } from "./lib/page";
import { HomePageUserInterface } from "./lib/pages/home";
import { SideBarUI } from "./lib/sidebar";
import { UserInterface } from "./lib/ui";
import { TaskManagement } from "./lib/tasks";
import { ErrorManagement } from "./lib/error";
import { HeaderBarUserInterface } from "./lib/headerbar";
import { ThemeManagement } from "./lib/themes";
import { ThemeSelectorUI } from "./lib/pages/themeselector";

import javascript from 'highlight.js/lib/languages/typescript';
import typescript from 'highlight.js/lib/languages/javascript';
import { DOM } from './lib/dom';
import { TrashManagement } from './lib/trash';

hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('js', javascript);
hljs.highlightAll();

// Add color classes from `colors` enum
UserInterface.registerColorClasses();

const startPage = "home";

// Init sequence
HeaderBarUserInterface.init();
NewNoteDialog.init();
SideBarUI.init();
ErrorManagement.init();
ThemeManagement.init();
DOM.init();
TrashManagement.init();

// Sidebar
SideBarUI.populateActions();
SideBarUI.populatePages();

// Refresh all pages that need refreshing
NoteManagement.refreshAll();
TaskManagement.refreshAll();
ThemeSelectorUI.refreshAll(true);

// load start page
PageManagement.switch(
  startPage,
  document.getElementById(`button-page-${startPage}`)!
);

// Populate home screen buttons
HomePageUserInterface.populateHomeButtons();
/* 
for (let i=0;i<10;i++) {
  NoteManagement.createNote(`${Math.floor(Math.random() * 10000)}`,`${Math.floor(Math.random() * 10000)}`)
}

for (let i=0;i<10;i++) {
  TaskManagement.createTask(`${Math.floor(Math.random() * 10000)}`)
} */
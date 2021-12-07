import './style/main.scss';
import { NewNoteDialog } from './lib/newnotedialog';
import { NoteManagement } from './lib/notes';
import { PageManagement } from './lib/page';
import { HomePageUserInterface } from './lib/pages/home';
import { SideBarUI } from './lib/sidebar'
import { UserInterface } from './lib/ui'
import { taskManagement } from './lib/tasks';
import { ErrorManagement } from './lib/error';
import { HeaderBarUserInterface } from './lib/headerbar';
import { ThemeManagement } from './lib/themes';
import { ThemeSelectorUI } from './lib/pages/themeselector';

// Add color classes from `colors` enum
UserInterface.addColorClasses();

const startPage = "home";

// Init sequence
HeaderBarUserInterface.init();
NewNoteDialog.init();
SideBarUI.init();
ErrorManagement.init();
ThemeManagement.init();

// Sidebar
SideBarUI.populateActions();
SideBarUI.populatePages();

// Refresh all pages that need refreshing
NoteManagement.refreshAll();
taskManagement.refreshAll();
ThemeSelectorUI.refreshAll(true);

// load start page
PageManagement.switch(startPage,document.getElementById(`button-page-${startPage}`)!);

// Populate home screen buttons
HomePageUserInterface.populateHomeButtons();
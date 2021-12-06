import './style/main.scss';
import { NewNoteDialog } from './lib/newnotedialog';
import { NoteManagement } from './lib/notes';
import { PageManagement } from './lib/page';
import { HomePageUserInterface } from './lib/pages/home';
import { SideBarUI } from './lib/sidebar'
import { UserInterface } from './lib/ui'
import { taskManagement } from './lib/tasks';
import { ErrorManagement } from './lib/error';

// Add color classes from `colors` enum
UserInterface.addColorClasses();

const startPage = "home";

// Init sequence
NewNoteDialog.init();
SideBarUI.init();
ErrorManagement.init();

// Sidebar
SideBarUI.populateActions();
SideBarUI.populatePages();

// Note Management
NoteManagement.refreshAll();

// Task Management
taskManagement.refreshAll();

// load start page
PageManagement.switch(startPage,document.getElementById(`button-page-${startPage}`)!);

// Populate home screen buttons
HomePageUserInterface.populateHomeButtons();

async function test() {
    for (let i=0;i<20;i++) {
        taskManagement.createtask(`titleltlttiuiiele ${Math.floor(Math.random() * (i*1000))}`);
    }
}

test(); 
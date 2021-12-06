import './style/main.scss';
import { NewNoteDialog } from './lib/newnotedialog';
import { NoteManagement } from './lib/notes';
import { PageManagement } from './lib/page';
import { HomePageUserInterface } from './lib/pages/home';
import { SideBarUI } from './lib/sidebar'
import { UserInterface } from './lib/ui'

UserInterface.addColorClasses();

const startPage = "home";

NewNoteDialog.init();
SideBarUI.init();

SideBarUI.populateActions();
SideBarUI.populatePages();
NoteManagement.populateAllNotes();
NoteManagement.populatePinnedNotes(true);
PageManagement.switch(startPage,document.getElementById(`button-page-${startPage}`)!);
HomePageUserInterface.populateHomeButtons();
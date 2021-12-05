import { note, NoteManagement } from './lib/notes';
import { PageManagement } from './lib/page';
import { HomePageUserInterface } from './lib/pages/home';
import { SideBarUI } from './lib/sidebar'
import { UserInterface } from './lib/ui'
import './style/main.scss'

const startPage = "home"

const notestore:note = {
    title: "test",
    content:"hello world",
    pinned:false
}

const json = [
    notestore
]

localStorage.setItem("notestore",JSON.stringify(json));

SideBarUI.populateActions();
SideBarUI.populatePages();
PageManagement.switch(startPage,document.getElementById(`button-page-${startPage}`)!);
HomePageUserInterface.populateHomeButtons();
NoteManagement.populateAllNotes();
UserInterface.addColorClasses();
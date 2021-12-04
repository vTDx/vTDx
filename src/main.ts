import { PageManagement } from './lib/page';
import { HomePageUserInterface } from './lib/pages/home';
import { SideBarUI } from './lib/sidebar'
import { UserInterface } from './lib/ui'
import './style/main.scss'

const startPage = "home"

SideBarUI.populateActions();
SideBarUI.populatePages();
PageManagement.switch(startPage,document.getElementById(`button-page-${startPage}`)!);
HomePageUserInterface.populateHomeButtons();
UserInterface.addColorClasses();
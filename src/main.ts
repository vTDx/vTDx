import { PageManagement } from './lib/page';
import { SideBarUI } from './lib/sidebar'
import { UserInterface } from './lib/ui'
import './style/main.scss'

const startPage = "dashboard"

SideBarUI.populateActions();
SideBarUI.populatePages();
PageManagement.switch(startPage,document.getElementById(`button-page-${startPage}`)!);
UserInterface.addColorClasses();
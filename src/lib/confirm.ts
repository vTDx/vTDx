import { NewNoteDialog, NewNoteDialogData } from "./newnotedialog";

class C {
  display(data: ConfirmationBox) {
    const dialog: NewNoteDialogData = {
      windowTitle: data.title,
      nodeTitle: data.message,
      hideTitleField: true,
      hideContentField: true,
      buttonText: data.confirmButtonText,
      buttonAction: data.confirmButtonAction,
      clearFields: true,
    };
    
    NewNoteDialog.show(dialog);
  }
}

export interface ConfirmationBox {
  title: string;
  message: string;
  confirmButtonText: string;
  confirmButtonAction: () => void;
}

export const Confirmation = new C();

class NM {
  populateAllNotes(target?: HTMLElement) {
    if (!target) target = document.getElementById("page-allnotes")!;

    const notes = JSON.parse(localStorage.getItem("notestore")!);

    console.log(notes);

    for (let i=0;i<notes.length;i++) {
        const note = document.createElement("div");
        const header = document.createElement("h3");
        const headerText = document.createTextNode(notes[i]!.title);
        const content = document.createElement("p");
        const contentText = document.createTextNode(notes[i]!.content);
        const deleteButton = document.createElement("button");
        const deleteButtonIcon = document.createElement("span");
        const pinButton = document.createElement("button");
        const pinButtonIcon = document.createElement("span");

        header.className = "header";
        content.className = "content";

        deleteButton.className = "delete";
        pinButton.className = "bookmark";

        deleteButtonIcon.className = "material-icons";
        deleteButtonIcon.innerText = "delete";

        pinButtonIcon.className = "material-icons";
        pinButtonIcon.innerText = "bookmark";

        header.append(headerText);
        content.append(contentText);
        deleteButton.append(deleteButtonIcon);
        pinButton.append(pinButtonIcon);

        note.className = "note";
        note.append(header,content,deleteButton,pinButton);

        target.append(note);
    }
  }
}

export interface note {
  title: string;
  content: string;
  pinned: boolean;
}

export const NoteManagement = new NM();

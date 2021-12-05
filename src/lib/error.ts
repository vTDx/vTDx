class EM {
  newError(data: Error) {
    const id = data.id;
    const message = data.message;

    let target = document.getElementById(id!);
    if (!target) target = document.getElementById("page-allnotes")!;

    target.innerHTML = "";

    const div = document.createElement("div");
    const icon = document.createElement("span");
    const text = document.createElement("h3");
    const textNode = document.createTextNode(message);
    const button = document.createElement("button");

    button.innerText = data.buttonCaption;
    button.addEventListener("click", data.buttonAction);

    icon.className = "material-icons big-x2";
    icon.innerText = data.materialIcon;

    div.className = "centered-absolute";

    text.append(textNode);

    div.append(icon, text, button);

    target.append(div);
  }
}

export const ErrorManagement = new EM();

export interface Error {
  message: string;
  materialIcon: string;
  buttonCaption: string;
  buttonAction: () => void;
  id: string;
}

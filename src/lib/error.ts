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

  toast(data: ToastData) {
    clearTimeout(this.toastTimeout);
    this.hideToast();
    setTimeout(() => {
      const title = data.title;
      const text = data.text;
      const delay = data.delay || 0;
      const toastDiv = document.getElementById("toast-div")!;
      const titleDiv = document.getElementById("toast-title")!;
      const cntntDiv = document.getElementById("toast-content")!;

      toastDiv?.classList.remove("hidden");
      titleDiv.innerText = title;
      cntntDiv.innerText = text;

      if (delay) {
        this.toastTimeout = setTimeout(this.hideToast, delay);
      }
    }, 250);
  }

  init() {
    const toast = document.createElement("div");
    const title = document.createElement("h3");
    const cntnt = document.createElement("p");

    toast.className = "toast hidden";
    toast.id = "toast-div";

    title.innerText = "{{title}}";
    title.className = "nomargin";
    title.id = "toast-title";

    cntnt.innerText = "{{content}}";
    cntnt.className = "nomargin";
    cntnt.id = "toast-content";

    toast.append(title, cntnt);

    document.body.append(toast);
  }

  hideToast() {
    const toastDiv = document.getElementById("toast-div")!;

    toastDiv.classList.add("hidden");
  }

  toastTimeout: any;
}

export const ErrorManagement = new EM();

export interface Error {
  message: string;
  materialIcon: string;
  buttonCaption: string;
  buttonAction: () => void;
  id: string;
}

export interface ToastData {
  text: string;
  title: string;
  delay?: number;
}

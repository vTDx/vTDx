class UI {
  addColorClasses() {
    for (let color in colors) {
      const colorString = colors[color];
      const rule = `.${colorString} { color: var(--${colorString}); }`

      document.styleSheets[0].insertRule(rule,0);
      console.log(rule);
    }
  }
}

export enum colors {
  red,
  green,
  yellow,
  blue,
  purple,
  aqua,
  gray,
  orange,
}

export interface page {
  dispName: string;
  materialIcon: string;
  onSidebar: boolean;
  color: colors;
  default?:boolean;
}

export interface action {
  dispName: string;
  materialIcon: string;
  page?: string;
  action: () => void;
  color: colors;
}

export const UserInterface = new UI();

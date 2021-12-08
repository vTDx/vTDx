class UI {
  addColorClasses() {
    for (let color in colors) {
      const colorString = colors[color];
      const rule = `.${colorString} { color: var(--${colorString}); }`;

      try {
        document.styleSheets[0].insertRule(rule, 0);
      } catch {}
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

export interface Page {
  dispName: string;
  materialIcon: string;
  onSidebar: boolean;
  color: colors;
  default?: boolean;
  addBreak?:boolean;
  hasCountableContent?:boolean;
  onHome?:boolean;
  inTopBar?:boolean;
}

export interface Action {
  dispName: string;
  materialIcon: string;
  page?: string;
  action: () => void;
  color: colors;
  addBreak?:boolean;
  inTopBar?:boolean;
}

export const UserInterface = new UI();

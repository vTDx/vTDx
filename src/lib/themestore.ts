import { Theme } from "./themes";


export enum colorSchemes {
    darkmode,
    lightmode,
  }

export const themeStore = new Map<string, Theme>([
  [
    "default",
    {
      name: "One Dark Pro",
      author: "Atom",
      colors: {
        red: "#e06c75",
        green: "#98c379",
        yellow: "#e5c07b",
        blue: "#61afef",
        purple: "#c678dd",
        aqua: "#56b6c2",
        orange: "#c48e49",
        gray: "#51565f",
        fg: "#abb2bf",
        bg: "#232936",
      },
      userSelectable: true,
      default: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "gruvboxdark",
    {
      name: "Gruvbox Dark",
      author: "GitHub/morhetz",
      colors: {
        red: "#cc241d",
        green: "#98971a",
        yellow: "#d79921",
        blue: "#458588",
        purple: "#b16286",
        aqua: "#689d6a",
        orange: "#d65d0e",
        gray: "#504945",
        fg: "#ebdbb2",
        bg: "#282828",
      },
      userSelectable: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "nord",
    {
      name: "Nord",
      author: "Arctic Ice Studios",
      colors: {
        red: "#bf616a",
        green: "#a3be8b",
        yellow: "#ebcb8b",
        blue: "#5e81ac",
        purple: "#b48ead",
        aqua: "#8fbcbb",
        orange: "#d0a770",
        gray: "rgb(109,109,109)",
        fg: "rgb(216,222,233)",
        bg: "rgb(46,52,64)",
      },
      userSelectable: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "deepocean",
    {
      name: "Deep Ocean",
      author: "Material Theme",
      colors: {
        red: "#f07178",
        green: "#c3e88d",
        yellow: "#ffcb6b",
        blue: "#82aaff",
        purple: "#c792ea",
        aqua: "#89ddff",
        orange: "#f78c6c",
        gray: "#546e7a",
        fg: "#B0BEC5",
        bg: "#263238",
      },
      userSelectable: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "dracula",
    {
      name: "Dracula",
      author: "Zeno Rocha",
      colors: {
        red: "#ff5555",
        green: "#50FA7B",
        yellow: "#F1FA8C",
        blue: "#BD93F9",
        purple: "#BD93F9",
        aqua: "#8BE9FD",
        orange: "#FFB86C",
        gray: "#555",
        fg: "#A4A4A1",
        bg: "#282A36",
      },
      userSelectable: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "nightowl",
    {
      name: "Night Owl",
      author: "GitHub/sdras",
      colors: {
        red: "#EF5350",
        green: "#22da6e",
        yellow: "#c5e478",
        blue: "#82AAFF",
        purple: "#C792EA",
        aqua: "#21c7a8",
        orange: "#FFB458",
        gray: "#637777",
        fg: "#d6deeb",
        bg: "#011627",
      },
      userSelectable: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "monokaipro",
    {
      name: "Monokai Extended",
      author: "SuperPaintman",
      colors: {
        red: "#F92672",
        green: "#A6E22E",
        yellow: "#E6DB74",
        blue: "#66D9EF",
        purple: "#AE81FF",
        aqua: "#21c7a8",
        orange: "#FFB458",
        gray: "#75715E",
        fg: "#F8F8F2",
        bg: "#272822",
      },
      userSelectable: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "palenight",
    {
      name: "Pale Night",
      author: "Olaolu Olawuyi",
      colors: {
        red: "#ff5572",
        green: "#a9c77d",
        yellow: "#FFCB6B",
        blue: "#82AAFF",
        purple: "#C792EA",
        aqua: "#89DDFF",
        orange: "#FFB42A",
        gray: "#697098",
        fg: "#BFC7D5",
        bg: "#292D3E",
      },
      userSelectable: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "atomonedark",
    {
      name: "Atom One Dark",
      author: "Atom",
      colors: {
        red: "#E06C75",
        green: "#98C379",
        yellow: "#E5C07B",
        blue: "#61AFEF",
        purple: "#C678DD",
        aqua: "#56B6C2",
        orange: "#c48e49",
        gray: "#51565f",
        fg: "#ABB2BF",
        bg: "#282C34",
      },
      userSelectable: true,
      scheme: colorSchemes.darkmode,
    },
  ],
  [
    "gruvboxlight",
    {
      name: "Gruvbox Light",
      author: "GitHub/morhetz",
      colors: {
        red: "#cc241d",
        green: "#98971a",
        yellow: "#d79921",
        blue: "#458588",
        purple: "#b16286",
        aqua: "#689d6a",
        orange: "#d65d0e",
        gray: "#bdae93",
        fg: "#3c3836",
        bg: "#fbf1c7",
      },
      userSelectable: true,
      scheme: colorSchemes.lightmode,
    },
  ],
  [
    "onelightpro",
    {
      name: "One Light Pro",
      author: "Atom",
      colors: {
        red: "#e06c75",
        green: "#98c379",
        yellow: "#e5c07b",
        blue: "#61afef",
        purple: "#c678dd",
        aqua: "#56b6c2",
        orange: "#c48e49",
        gray: "#51565f",
        fg: "#232936",
        bg: "#dee5ef",
      },
      userSelectable: true,
      default: true,
      scheme: colorSchemes.lightmode,
    },
  ],
]);

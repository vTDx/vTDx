import { Theme } from "./themes";

export const themeStore = new Map<string,Theme>(
    [
        ["default",{
            name:"One Dark Pro",
            author:"Atom",
            colors: {
                red:"#e06c75",
                green:"#98c379",
                yellow:"#e5c07b",
                blue:"#61afef",
                purple:"#c678dd",
                aqua:"#56b6c2",
                orange:"#c48e49",
                gray:"#51565f",
                fg:"#abb2bf",
                bg:"#232936"
            },
            userSelectable:true,
            default:true
        }],
        ["gruvbox",{
            name:"Gruvbox Dark",
            author:"GitHub/morhetz",
            colors: {
                red:"#cc241d",
                green:"#98971a",
                yellow:"#d79921",
                blue:"#458588",
                purple:"#b16286",
                aqua:"#689d6a",
                orange:"#d65d0e",
                gray:"#504945",
                fg:"#ebdbb2",
                bg:"#282828"
            },
            userSelectable:true
        }],
        ["nord", {
            name:"Nord",
            author:"Arctic Ice Studios",
            colors: {
                red:"#bf616a",
                green:"#a3be8b",
                yellow:"#ebcb8b",
                blue:"#5e81ac",
                purple:"#b48ead",
                aqua:"#8fbcbb",
                orange:"#d0a770",
                gray:"rgb(109,109,109)",
                bg:"rgb(46,52,64)",
                fg:"rgb(216,222,233)"
            },
            userSelectable:true
        }],
        ["deepocean", {
            name:"Deep Ocean",
            author:"Material Theme",
            colors: {
                red:"#f07178",
                green:"#c3e88d",
                yellow:"#ffcb6b",
                blue:"#82aaff",
                purple:"#c792ea",
                aqua:"#89ddff",
                orange:"#f78c6c",
                gray:"#546e7a",
                bg:"#263238",
                fg:"#B0BEC5"
            },
            userSelectable:true
        }],
    ]
);
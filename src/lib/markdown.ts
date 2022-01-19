import showdown from "showdown";

class MD {
  toHTML(md: string) {
    const converter = new showdown.Converter();

    return converter.makeHtml(md);
  }

  toMD(md: string) {
    const converter = new showdown.Converter();

    return converter.makeMarkdown(md);
  }
}

export const MarkDown = new MD();

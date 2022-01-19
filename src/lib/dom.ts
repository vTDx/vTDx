class dom {
  init() {
    console.warn = () => {};
  }
}

export const DOM = new dom();

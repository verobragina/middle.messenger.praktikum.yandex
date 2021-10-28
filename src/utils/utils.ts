type TStyles = { [key: string]: string };

export const getErrorField = (arr: HTMLElement[], name: string): HTMLElement[] => {
  return arr.filter((el) => {
    return el.dataset.name === name;
  });
};

export const render = (tag: string, block: string) => {
  const root = document.querySelector(tag) as HTMLElement;
  root.innerHTML = block;
  return root;
};

export const css = (el: any, styles: TStyles = {}) => {
  Object.keys(styles).forEach((key) => {
    el.style[key] = styles[key];
  });
};

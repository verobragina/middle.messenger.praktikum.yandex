type TStyles = { [key: string]: string };

export const render = (tag: string, block) => {
  const root = document.querySelector(tag) as HTMLElement;
  if (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(block);
  return root;
};

export const css = (el: any, styles: TStyles = {}) => {
  Object.keys(styles).forEach((key) => {
    el.style[key] = styles[key];
  });
};

export default function isEqual(lhs, rhs) {
  return lhs === rhs;
}

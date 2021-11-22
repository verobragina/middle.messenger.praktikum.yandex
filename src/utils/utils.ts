type TStyles = { [key: string]: string };

export const render = (tag: string, block) => {
  const root = document.querySelector(tag) as HTMLElement;
  root.innerHTML = '';
  root.appendChild(block);
  return root;
};

export const css = (el: any, styles: TStyles = {}) => {
  Object.keys(styles).forEach((key) => {
    el.style[key] = styles[key];
  });
};

export const isEqual = (lhs, rhs) => {
  return lhs === rhs;
};

export const isEmptyObject = (obj) => {
  return (Object.keys(obj).length !== 0);
};

export const toLowerCase = (str: string) => {
  return str.toLowerCase();
};


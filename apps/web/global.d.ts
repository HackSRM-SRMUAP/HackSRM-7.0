// Fix for CSS Modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Fix for Global CSS (like globals.css)
declare module '*.css' {
  const content: void;
  export default content;
}
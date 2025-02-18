export function convertStyles(view, styles) {
  Object.keys(styles).forEach(key => {
	view[key] = styles[key];
  });
}

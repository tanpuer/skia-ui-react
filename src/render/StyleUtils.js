export function convertStyles(view, styles) {
  Object.keys(styles).forEach(key => {
	view[key] = styles[key];
  });
}

export function comparePrevStylesAndNextStyles(view, prevStyles, nextStyles) {
	Object.keys(nextStyles).forEach(key => {
	  if (nextStyles[key] !== prevStyles[key]) {
		view[key] = nextStyles[key];
	  }
	})
}

import {TAG} from "./const";

export function convertStyles(view, styles) {
  Object.keys(styles).forEach(key => {
	view[key] = styles[key];
  });
}

export function comparePrevStylesAndNextStyles(view, type, prevStyles, nextStyles) {
  Object.keys(nextStyles).forEach(key => {
	if (nextStyles[key] !== prevStyles[key]) {
	  // console.log(TAG, "commitUpdate-style", type, key, nextStyles[key]);
	  view[key] = nextStyles[key];
	}
  });
}

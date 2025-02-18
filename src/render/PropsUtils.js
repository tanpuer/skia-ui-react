export function convertProps(view, props) {
  if (props.onClick) {
	view.setOnClickListener((_view) => {
	  props.onClick();
	});
  }
}

export function convertLottieProps(lottie, props) {
  if (props.src) {
	lottie.src = props.src;
  }
  convertProps(lottie, props);
}

import {TAG} from "./const";

export function convertProps(view, props) {
  if (props.onClick) {
	view.setOnClickListener((_view) => {
	  props.onClick();
	});
  }
}

export function convertLottieProps(lottieView, props) {
  if (props.src) {
	lottieView.src = props.src;
  }
  convertProps(lottieView, props);
}

export function convertVideoProps(videoView, props) {
  if (props.src) {
	videoView.src = props.src;
  }
  convertProps(videoView, props);
}

export function convertShaderProps(shaderView, props) {
  if (props.path) {
	shaderView.setShaderPath(props.path, props.textures || []);
  }
  convertProps(shaderView, props);
}

export function convertButtonProps(buttonView, props) {
  if (props.text) {
	buttonView.text = props.text;
  }
  convertProps(buttonView, props);
}

export function convertSVGProps(svgView, props) {
  if (props.src) {
	svgView.src = props.src;
  }
  convertProps(svgView, props);
}

export function convertPageProps(page, props) {
  if (props.onCreate) {
	page.onCreate(props.onCreate);
  }
  if (props.onDestroy) {
	page.onDestroy(props.onDestroy);
  }
  if (props.onShow) {
	page.onShow(props.onShow);
  }
  if (props.onHide) {
	page.onHide(props.onHide);
  }
}

export function convertTextProps(textView, props) {
  if (props.text) {
	textView.text = props.text;
  } else if (props.textGradients) {
	textView.setTextGradient(props.textGradients.colors, props.textGradients.positions);
  }
  convertProps(textView, props);
}

export function convertImageProps(imageView, props) {
  if (props.src) {
	imageView.src = props.src;
  }
  convertProps(imageView, props);
}

export function comparePrePropsAndNextProps(view, type, prevProps, nextProps) {
  Object.keys(prevProps).forEach(key => {
	if (key !== "style" && nextProps[key] !== prevProps[key]) {
	  console.log(TAG, "commitUpdate-prop", type, key, nextProps[key]);
	  updateViewProp(view, type, key, prevProps, nextProps);
	}
  });
}

function updateViewProp(view, type, key, prevProps, nextProps) {
  if (type === "view") {

  } else if (type === "page") {

  } else if (type === "scroll") {

  } else if (type === "lottie") {

  } else if (type === "video") {

  } else if (type === "shader") {

  } else if (type === "button") {

  } else if (type === "svg") {

  } else if (type === "text") {
	if (key === "textGradients") {
	  view.setTextGradient(nextProps[key].colors, nextProps[key].positions);
	} else if (key === "text") {
	  view.text = nextProps[key].text;
	}
  } else if (type === "flexbox") {

  } else if (type === "img") {

  }
}

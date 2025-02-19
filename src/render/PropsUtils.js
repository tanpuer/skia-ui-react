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
  }
}

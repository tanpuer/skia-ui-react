import {convertStyles} from "./StyleUtils";
import {
  convertButtonProps,
  convertLottieProps,
  convertProps,
  convertShaderProps,
  convertVideoProps
} from "./PropsUtils";

const {
  View, ScrollView, LottieView, YUVVideoView, Page, EnterExitInfo, innerWidth, ShaderView, Button
} = SkiaUI;

export function createView(type, props) {
  if (type === "view") {
	let view = new View();
	convertStyles(view, props.style);
	convertProps(view, props);
	return view;
  } else if (type === "page") {
	let page = new Page();
	convertStyles(page, props.style)
	page.push(new EnterExitInfo(innerWidth, 0));
	return page;
  } else if (type === "scroll") {
	let scrollView = new ScrollView();
	convertStyles(scrollView, props.style);
	return scrollView;
  } else if (type === "lottie") {
	let lottieView = new LottieView();
	convertStyles(lottieView, props.style);
	convertLottieProps(lottieView, props);
	return lottieView;
  } else if (type === "video") {
	let videoView = new YUVVideoView();
	convertStyles(videoView, props.style);
	convertVideoProps(videoView, props);
	return videoView;
  } else if (type === "shader") {
	let shaderView = new ShaderView();
	convertStyles(shaderView, props.style);
	convertShaderProps(shaderView, props);
	return shaderView;
  } else if (type === "button") {
	let button = new Button();
	convertStyles(button, props.style);
	convertButtonProps(button, props);
	return button;
  }
}

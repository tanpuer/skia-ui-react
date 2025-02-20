import {convertStyles} from "./StyleUtils";
import {
  convertButtonProps,
  convertLottieProps, convertPageProps,
  convertProps,
  convertShaderProps, convertSVGProps, convertTextProps,
  convertVideoProps
} from "./PropsUtils";

const {
  View, ScrollView, LottieView, VideoView, Page, EnterExitInfo, innerWidth, ShaderView, Button, SVGView, TextView
} = SkiaUI;

export function createView(type, props) {
  if (type === "view") {
	let view = new View();
	convertStyles(view, props.style);
	convertProps(view, props);
	return view;
  } else if (type === "page") {
	let page = new Page();
	convertStyles(page, props.style);
	convertPageProps(page, props);
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
	let videoView = new VideoView();
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
  } else if (type === "svg") {
	let svgView = new SVGView();
	convertStyles(svgView, props.style);
	convertSVGProps(svgView, props);
	return svgView;
  } else if (type === "text") {
	let textView = new TextView();
	convertStyles(textView, props.style);
	convertTextProps(textView, props);
	return textView;
  }
}

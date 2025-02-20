import React from 'react';

export default class SkiaApp extends React.Component {

  constructor(props) {
	super(props);
	this.state = {
	  viewBg: "#ff0000"
	}
	this.innerWidth = SkiaUI ? SkiaUI.innerWidth : 1920;
	this.innerHeight = SkiaUI ? SkiaUI.innerHeight : 1080;
	this.lottieRef = React.createRef();
	this.lottieFlag = true;
	this.shaderRef = React.createRef();
	this.shaderFlag = true;
  }

  changeBg() {
	console.log("changeBg");
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);
	const redHex = (red < 16 ? '0' : '') + red.toString(16);
	const greenHex = (green < 16 ? '0' : '') + green.toString(16);
	const blueHex = (blue < 16 ? '0' : '') + blue.toString(16);
	this.setState({
	  viewBg: `#${redHex}${greenHex}${blueHex}`
	});
  }

  render() {
	return (
		<page
			style={{width: this.innerWidth, height: this.innerHeight}}
			onCreate={() => {
			  console.log("page onCreate");
			}}
			onDestroy={() => {
			  console.log("page onDestroy");
			}}
			onShow={() => {
			  console.log("page onShow");
			}}
			onHide={() => {
			  console.log("page onHide");
			}}
		>
		  <scroll style={{
			flex: 1, flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center'
		  }}>
			<text
				style={{textColor: "#00ff00", textSize: 50}}
				text={"React Demo:\nusing react-reconciler!"}
			/>
			<svg
				style={{width: 300, height: 300}}
				src={"react.svg"}
			/>
			<view
				style={{width: 200, height: 200, backgroundColor: this.state.viewBg}}
				onClick={() => {
				  this.changeBg();
				}}
			/>
			<button
				style={{width: 500, height: 100, textSize: 50, backgroundColor: "#00ff00"}}
				text={"go to music page"}
				onClick={() => {
				  console.log("go to music page!");
				  console.log(this.props.navigate);
				  this.props.navigate('/music');
				}}
			/>
			<lottie
				style={{width: 375, height: 420}}
				src={"WorkspacePlanet.json"}
				ref={this.lottieRef}
				onClick={() => {
				  if (this.lottieFlag) {
					this.lottieRef.current.pause();
				  } else {
					this.lottieRef.current.start();
				  }
				  this.lottieFlag = !this.lottieFlag;
				}}
			/>
			<video
				style={{width: 1080, height: 360 * 1080 / 640}}
				src={"yiluxiangbei.mp4"}
			/>
			<shader
				ref={this.shaderRef}
				style={{width: 1080, height: 520}}
				path={"raining.glsl"}
				textures={["raining.png"]}
				onClick={() => {
				  if (this.shaderFlag) {
					this.shaderRef.current.setShaderPath("sincos.glsl", []);
				  } else {
					this.shaderRef.current.setShaderPath("raining.glsl", ["raining.png"]);
				  }
				  this.shaderFlag = !this.shaderFlag;
				}}
			/>
		  </scroll>
		</page>
	);
  }
}

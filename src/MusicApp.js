import React from "react";
import {TAG} from "./const";

const {LinearAnimator} = SkiaUI;

export default class MusicApp extends React.Component {

  constructor(props) {
	super(props);
	console.log(TAG, "prop is:", JSON.stringify(props));
	this.innerWidth = SkiaUI ? SkiaUI.innerWidth : 1920;
	this.innerHeight = SkiaUI ? SkiaUI.innerHeight : 1080;
	this.svgRef = React.createRef();
	this.svgRotateAnimator = undefined;
	this.state = {
	  svgRotateZ: 0
	}
  }

  componentDidMount() {
	console.log(TAG, "componentDidMount");
	if (!this.svgRotateAnimator && this.svgRef.current != null) {
	  this.svgRotateAnimator = new LinearAnimator(this.svgRef.current, 0.0, 360.0);
	  this.svgRotateAnimator.duration = 5000;
	  this.svgRotateAnimator.loop = -1;
	  this.svgRotateAnimator.setUpdateListener((value) => {
		this.setState({svgRotateZ: value});
	  });
	  this.svgRotateAnimator.start();
	}
  }

  componentWillUnmount() {
	console.log(TAG, "componentWillUnmount");
  }

  render() {
	console.log(TAG, "MusicApp render");
	return (
		<page
			style={{width: this.innerWidth, height: this.innerHeight}}
			onCreate={() => {
			  console.log("MusicApp onCreate");
			}}
			onDestroy={() => {
			  console.log("MusicApp onDestroy");
			}}
			onShow={() => {
			  console.log("MusicApp onShow");
			}}
			onHide={() => {
			  console.log("MusicApp onHide");
			}}
		>
		  <scroll style={{
			flex: 1, flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center'
		  }}>
			<text
				style={{textColor: "#00ff00", textSize: 50}}
				text={"Music App developed by React"}
			/>
			<svg
				ref={this.svgRef}
				style={{width: 300, height: 300, rotateZ: this.state.svgRotateZ}}
				src={"react.svg"}
			/>
		  </scroll>
		</page>
	)
  }
}

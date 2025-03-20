import React from "react";
import SkiaUIRenderer from "../render/SkiaUIRenderer";
import {TAG} from "../const";

export default class VerticalMusicUI extends React.Component {

  constructor(props) {
	console.log(TAG, "VerticalMusicUI constructor")
	super(props);
	this.svgRef = React.createRef();
	this.svgRotateAnimator = undefined;
	this.state = {
	  svgRotateZ: 0,
	}
	this.scrollRef = React.createRef();
	this.props.onScrollRef && this.props.onScrollRef(this.scrollRef);
  }

  componentDidMount() {
	console.log(TAG, "VerticalMusicUI", "componentDidMount");
	if (!this.svgRotateAnimator && this.svgRef.current != null) {
	  this.svgRotateAnimator = new SkiaUI.LinearAnimator(this.svgRef.current, 0.0, 360.0);
	  this.svgRotateAnimator.duration = 5000;
	  this.svgRotateAnimator.loop = -1;
	  this.svgRotateAnimator.setUpdateListener((value) => {
		this.setState({svgRotateZ: value});
	  });
	  this.svgRotateAnimator.start();
	}
  }

  componentWillUnmount() {
	console.log(TAG, "VerticalMusicUI", "componentWillUnmount");
	this.svgRotateAnimator.stop();
  }

  render() {
	const lyricIndex = this.props.lyricIndex;
	const percent = this.props.percent;
	const innerWidth = SkiaUI.innerWidth;
	const innerHeight = SkiaUI.innerHeight;
	return (
		<flexbox style={{
		  flex: 1,
		  flexDirection: 'column',
		  flexWrap: 'nowrap',
		  justifyContent: 'flex-start',
		  alignItems: 'center',
		  position: 'absolute',
		  width: innerWidth,
		  height: innerHeight,
		}}>
		  <img
			  style={{
				flex: 1,
				position: 'absolute',
				width: innerWidth,
				height: innerHeight,
				objectFill: "cover",
				blur: 10,
			  }}
			  src={"music/bg.png"}
		  />
		  <text
			  style={{textColor: "#00ff00", textSize: 50, backgroundColor: "#ffffff00"}}
			  text={"Music App developed by React"}
		  />
		  <svg
			  ref={this.svgRef}
			  style={{width: 300, height: 300, rotateZ: this.state.svgRotateZ, backgroundColor: "#ffffff00"}}
			  src={"react.svg"}
		  />
		  <button
			  style={{width: 260, height: 100, textSize: 50, backgroundColor: "#00ff00", marginTop: 50}}
			  text={"go back"}
			  onClick={() => {
				console.log("go back!");
				SkiaUIRenderer.pop();
			  }}
		  />
		  <scroll
			  ref={this.scrollRef}
			  style={{
				flex: 1,
				flexDirection: 'column',
				flexWrap: 'nowrap',
				justifyContent: 'flex-start',
				alignItems: 'center',
				backgroundColor: "#ffffff00"
			  }}>
			{
			  this.props.lyric.map((lyric, index) => {
				return (
					<text
						style={{
						  textColor: "#ffffff",
						  textSize: index === lyricIndex ? 80 : 60,
						  backgroundColor: "#ffffff00",
						  marginTop: 40,
						  marginBottom: 40,
						}}
						text={lyric.content}
						textGradients={{
						  colors: index === lyricIndex ? ["#00ff00", "#00ff00", "#ffffff", "#ffffff"] : [],
						  positions: index === lyricIndex ? [0.0, percent, percent, 1.0] : []
						}}
					/>
				);
			  })
			}
		  </scroll>
		</flexbox>
	);
  }
}

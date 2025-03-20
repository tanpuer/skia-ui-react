import React from "react";
import SkiaUIRenderer from "../render/SkiaUIRenderer";
import {TAG} from "../const";

export default class HorizontalMusicUI extends React.Component {

  constructor(props) {
	super(props);
	this.svgRef = React.createRef();
	this.svgRotateAnimator = undefined;
	this.state = {
	  svgRotateZ: 0,
	  isPlaying: true,
	}
	this.scrollRef = React.createRef();
	this.props.onScrollRef && this.props.onScrollRef(this.scrollRef);
  }

  componentDidMount() {
	console.log(TAG, "componentDidMount");
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
	console.log(TAG, "componentWillUnmount");
	this.svgRotateAnimator.stop();
  }

  render() {
	const lyricIndex = this.props.lyricIndex;
	const percent = this.props.percent;
	const progress = this.props.progress;
	const innerWidth = SkiaUI.innerWidth;
	const innerHeight = SkiaUI.innerHeight;
	return (
		<flexbox style={{
		  flex: 1,
		  flexDirection: 'row',
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
		  <flexbox style={{
			flex: 2,
			flexDirection: 'column',
			flexWrap: 'nowrap',
			justifyContent: 'flex-start',
			alignItems: 'center',
			backgroundColor: "#ffffff00"
		  }}>
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
			<flexbox style={{
			  flexDirection: 'row',
			  flexWrap: 'nowrap',
			  justifyContent: 'flex-start',
			  alignItems: 'center',
			  backgroundColor: "#ffffff00"
			}}>
			  <img
				  style={{
					width: 105,
					height: 105,
					backgroundColor: "#ffffff00",
				  }}
				  src={"music/ic_previous.png"}
				  onClick={() => {
					this.props.audioPlayer.seek(0);
				  }}
			  />
			  <img
				  style={{
					width: 105,
					height: 105,
					marginLeft: 100,
					backgroundColor: "#ffffff00",
				  }}
				  src={this.state.isPlaying ? "music/ic_pause.png" : "music/ic_play.png"}
				  onClick={() => {
					this.state.isPlaying ? this.props.audioPlayer.pause() : this.props.audioPlayer.start();
					this.setState({
					  isPlaying: !this.state.isPlaying
					})
				  }}
			  />
			  <img
				  style={{
					width: 105,
					height: 105,
					marginLeft: 100,
					backgroundColor: "#ffffff00",
				  }}
				  src={"music/ic_next.png"}
				  onClick={() => {
					this.props.audioPlayer.seek(0);
				  }}
			  />
			</flexbox>
			<progress
				style={{
				  height: 60,
				  width: innerWidth * 0.4 - 50,
				  marginTop: 50,
				  backgroundColor: "#888888ff",
				}}
				barColor={"#00ff00"}
				barType={"linear"}
				progress={progress}
				onProgress={(progress, finished) => {
				  if (finished && this.props.audioPlayer) {
					console.log("MusicApp onProgress", progress, finished);
					this.props.audioPlayer.seek(progress * this.props.audioPlayer.getDuration() / 100);
				  }
				}}
			/>
		  </flexbox>
		  <scroll
			  ref={this.scrollRef}
			  style={{
				flex: 3,
				flexDirection: 'column',
				flexWrap: 'nowrap',
				justifyContent: 'flex-start',
				alignItems: 'center',
				backgroundColor: "#ffffff00",
				height: innerHeight
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

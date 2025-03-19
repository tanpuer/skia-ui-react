import React from "react";
import {TAG} from "./const";
import SkiaUIRenderer from "./render/SkiaUIRenderer";
import parseSRT from "./utils";

const {LinearAnimator, AudioPlayer, innerWidth, innerHeight} = SkiaUI;

export default class MusicApp extends React.Component {

  constructor(props) {
	super(props);
	console.log(TAG, "prop is:", JSON.stringify(props));
	this.innerWidth = SkiaUI ? SkiaUI.innerWidth : 1920;
	this.innerHeight = SkiaUI ? SkiaUI.innerHeight : 1080;
	this.svgRef = React.createRef();
	this.svgRotateAnimator = undefined;
	this.state = {
	  svgRotateZ: 0,
	  index: -1,
	  percent: 0.0,
	  isPlaying: true,
	  progress: 0.0,
	}
	const fs = new File("feng.srt");
	const fileData = fs.read();
	this.lyric = parseSRT(fileData);
	this.updateFrame = requestAnimationFrame(() => {
	  this.calculate();
	})
	this.audiPlayer = new AudioPlayer("feng.mp4");
	this.scrollRef = React.createRef();
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
	cancelAnimationFrame(this.updateFrame);
	this.audiPlayer.release();
	this.audiPlayer = null;
  }

  render() {
	if (innerHeight > innerWidth) {
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
				if (this.audiPlayer) {
				  this.audiPlayer.start();
				}
			  }}
			  onHide={() => {
				console.log("MusicApp onHide");
				if (this.audiPlayer) {
				  this.audiPlayer.pause();
				}
			  }}
		  >
			<flexbox style={{
			  flex: 1, flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center'
			}}>
			  <img
				  style={{
					flex: 1,
					position: 'absolute',
					width: this.innerWidth,
					height: this.innerHeight,
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
				  this.lyric.map((lyric, index) => {
					return (
						<text
							style={{
							  textColor: "#ffffff",
							  textSize: index === this.state.index ? 80 : 60,
							  backgroundColor: "#ffffff00",
							  marginTop: 40,
							  marginBottom: 40,
							}}
							text={lyric.content}
							textGradients={{
							  colors: index === this.state.index ? ["#00ff00", "#00ff00", "#ffffff", "#ffffff"] : [],
							  positions: index === this.state.index ? [0.0, this.state.percent, this.state.percent, 1.0] : []
							}}
						/>
					);
				  })
				}
			  </scroll>
			</flexbox>
		  </page>
	  )
	} else {
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
				if (this.audiPlayer && this.state.isPlaying) {
				  this.audiPlayer.start();
				}
			  }}
			  onHide={() => {
				console.log("MusicApp onHide");
				if (this.audiPlayer && this.state.isPlaying) {
				  this.audiPlayer.pause();
				}
			  }}
		  >
			<flexbox style={{
			  flex: 1, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center'
			}}>
			  <img
				  style={{
					flex: 1,
					position: 'absolute',
					width: this.innerWidth,
					height: this.innerHeight,
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
						this.audiPlayer.seek(0);
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
						this.state.isPlaying ? this.audiPlayer.pause() : this.audiPlayer.start();
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
						this.audiPlayer.seek(0);
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
					progress={this.state.progress}
					onProgress={(progress, finished) => {
					  if (finished && this.audiPlayer) {
						console.log("MusicApp onProgress", progress, finished);
						this.audiPlayer.seek(progress * this.audiPlayer.getDuration() / 100);
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
				  this.lyric.map((lyric, index) => {
					return (
						<text
							style={{
							  textColor: "#ffffff",
							  textSize: index === this.state.index ? 80 : 60,
							  backgroundColor: "#ffffff00",
							  marginTop: 40,
							  marginBottom: 40,
							}}
							text={lyric.content}
							textGradients={{
							  colors: index === this.state.index ? ["#00ff00", "#00ff00", "#ffffff", "#ffffff"] : [],
							  positions: index === this.state.index ? [0.0, this.state.percent, this.state.percent, 1.0] : []
							}}
						/>
					);
				  })
				}
			  </scroll>
			</flexbox>
		  </page>
	  )
	}
  }

  calculate() {
	if (this.audiPlayer == null) {
	  return;
	}
	let duration = this.audiPlayer.getCurrentPosition();
	let start = 0;
	let end = 0;
	let index = -1;
	for (let i = 0; i < this.lyric.length; ++i) {
	  let item = this.lyric[i];
	  start = item.times[0];
	  end = item.times[item.times.length - 1];
	  if (start <= duration && end >= duration) {
		index = i;
		break;
	  }
	}
	if (index < 0 || index >= this.lyric.length) {
	  return;
	}

	let item = this.lyric[index];
	let jIndex = 0;
	for (let j = 0; j < item.times.length; j++) {
	  if (item.times[j] >= duration) {
		jIndex = j;
		break;
	  }
	}
	let gradientLength = 0.0;
	for (let z = 0; z < jIndex - 1; ++z) {
	  gradientLength += item.contentList[z].length;
	}
	if (jIndex !== 0) {
	  gradientLength += (duration - item.times[jIndex - 1]) /
		  (item.times[jIndex] - item.times[jIndex - 1]) *
		  item.contentList[jIndex - 1].length;
	}
	let totalLength = item.content.length;
	let percent = gradientLength / totalLength;
	if (index !== this.index) {
	  // this.scrollToIndex(index);
	}
	this.index = index;
	this.percent = percent;
	if (this.scrollRef.current && this.index !== this.state.index) {
	  const distance = this.scrollRef.current.getDistanceByIndex(this.index);
	  const diff = -Math.max(distance - this.scrollRef.current.height / 2.0, 0)
	  console.log(TAG, `scrollTo ${diff} ${distance} ${this.scrollRef.current.height}`)
	  this.scrollRef.current.scrollTo(diff);
	}
	let progress = 0.0;
	let totalDuration = this.audiPlayer.getDuration();
	if (totalDuration > 0) {
	  progress = duration * 100 / totalDuration;
	}
	this.setState({
	  index: index,
	  percent: percent,
	  progress: progress
	});
  }
}

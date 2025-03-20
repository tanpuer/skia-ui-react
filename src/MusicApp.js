import React from "react";
import {TAG} from "./const";
import parseSRT from "./utils";
import VerticalMusicUI from "./component/VerticalMusicUI";
import HorizontalMusicUI from "./component/HorizontalMusicUI";

export default class MusicApp extends React.Component {

  constructor(props) {
	super(props);
	console.log(TAG, "prop is:", JSON.stringify(props));
	this.state = {
	  index: -1,
	  percent: 0.0,
	  progress: 0.0,
	}
	const fs = new File("feng.srt");
	const fileData = fs.read();
	this.lyric = parseSRT(fileData);
	this.updateFrame = requestAnimationFrame(() => {
	  this.calculate();
	})
	this.audiPlayer = new SkiaUI.AudioPlayer("feng.mp4");
	this.scrollRef = React.createRef();
  }

  componentDidMount() {
	console.log(TAG, "componentDidMount");
  }

  componentWillUnmount() {
	console.log(TAG, "componentWillUnmount");
	cancelAnimationFrame(this.updateFrame);
	this.audiPlayer.release();
	this.audiPlayer = null;
  }

  render() {
	const innerWidth = SkiaUI.innerWidth;
	const innerHeight = SkiaUI.innerHeight;
	return (
		<page
			style={{width: innerWidth, height: innerHeight}}
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
		  {
			innerHeight > innerWidth ?
				<VerticalMusicUI
					lyricIndex={this.state.index}
					percent={this.state.percent}
					progress={this.state.progress}
					audiPlayer={this.audiPlayer}
					lyric={this.lyric}
					onScrollRef={(ref) => {
					  this.scrollRef = ref;
					}}
				/>
				:
				<HorizontalMusicUI
					lyricIndex={this.state.index}
					percent={this.state.percent}
					progress={this.state.progress}
					audiPlayer={this.audiPlayer}
					lyric={this.lyric}
					onScrollRef={(ref) => {
					  this.scrollRef = ref;
					}}
				/>
		  }
		</page>
	);
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

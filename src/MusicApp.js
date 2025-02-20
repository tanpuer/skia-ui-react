import React from "react";

export default class MusicApp extends React.Component {

  constructor(props) {
	super(props);
	this.innerWidth = SkiaUI ? SkiaUI.innerWidth : 1920;
	this.innerHeight = SkiaUI ? SkiaUI.innerHeight : 1080;
  }

  render() {
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
				style={{width: 300, height: 300}}
				src={"react.svg"}
			/>
		  </scroll>
		</page>
	)
  }
}

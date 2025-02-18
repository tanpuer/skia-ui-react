import React from 'react';
const {innerWidth, innerHeight} = global.SkiaUI;

export default class SkiaApp extends React.Component {

  constructor(props) {
	super(props);
	this.state = {
	  viewBg: "#ff0000"
	}
  }

  changeBg() {
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
		<page style={{width: innerWidth, height: innerHeight}}>
		  <scroll style={{
			flex: 1,
			flexDirection: 'column',
			flexWrap: 'nowrap',
			justifyContent: 'center',
			alignItems: 'center'
		  }}>
			<view style={{width: 200, height: 200, backgroundColor: this.state.viewBg}}
				  onClick={() => {
					this.changeBg();
				  }}
				  onScroll={() => {}}
			></view>
		  </scroll>
		</page>
	);
  }
}

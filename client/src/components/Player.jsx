import React, { Component } from 'react'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spin: (this.props.playStatus === "PLAYING") ? true : false
    }

  }

  render() {
    console.log("Play status: ", this.props.playStatus)
    console.log("spin state: ", this.state.spin)
    let vinylSpinAnimation;
    if (this.state.spin === true) {
      vinylSpinAnimation = { animationPlayState: "running" }
    } else {
      vinylSpinAnimation = { animationPlayState: "paused" }
    }
    console.log(vinylSpinAnimation)
    return (
      <div className="turntable">
      <span className="volume-slider"></span>
      <img className="vinyl"
        onClick={() => {
          this.props.togglePlay()
        }}
        src="https://thosepoorbastards.com/store/image/cache/data/vinyl/vinyl_sab_vinyl-600x600.png" alt="vinyl" />
      <p>Now Playing: {this.props.filename}</p>
    </div>
    )
  }
} 
 


export default Player;
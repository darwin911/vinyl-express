import React, { Component } from 'react'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spin: true,
    }

  }

  render() {

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
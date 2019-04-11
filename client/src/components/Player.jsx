import React, { Component } from 'react'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spin: false,
      play: false,
    }

  }

  render() {

    return (
      <section className="player">
        <div className="turntable">
          <img className="vinyl"
            onClick={() => {
              this.props.togglePlay()
            }}
            src="https://thosepoorbastards.com/store/image/cache/data/vinyl/vinyl_sab_vinyl-600x600.png" alt="vinyl" />
          <div className="tt-arm"></div>
          <button className="start-stop-btn">Start/Stop</button>
        </div>
          <p>Now Playing: {this.props.filename}</p>
      </section>
    )
  }
}



export default Player;
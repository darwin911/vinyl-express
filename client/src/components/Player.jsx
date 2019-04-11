import React, { Component } from 'react'
import Sound from 'react-sound';

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spin: false,
      play: false,
    }

  }

  render() {
    const { url, playStatus } = this.props
    console.log(url)
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
        <Sound
          url={url && url}
          playStatus={playStatus} />
      </section>
    )
  }
}



export default Player;
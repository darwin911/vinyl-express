import React, { Component } from 'react'
import Sound from 'react-sound';

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playbackRate: 1,
      volume: 100,
    }
    this.handleControlChange = this.handleControlChange.bind(this);
  }


  handleControlChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }


  render() {

    const { url, playStatus } = this.props;

    const { playbackRate, volume} = this.state;

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
        <div>
          <label htmlFor="playbackRate">Playback Rate</label>
          <input
            className="playback-input"
            name="playbackRate"
            type="number"
            step={0.02}
            min={0}
            max={2}
            onChange={this.handleControlChange}
            value={playbackRate} />
          <Sound
            url={url && url}
            volume={volume}
            playbackRate={playbackRate}
            onLoad={console.log('onLoad called')}
            whilePlaying={console.log('while Playing Called')}
            playStatus={playStatus} />
        </div>
      </section>
    )
  }
}



export default Player;
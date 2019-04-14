import React, { Component } from 'react'
import Sound from 'react-sound';
import { ProgressBar } from 'react-bootstrap';

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
    this.setState(prevState => ({
      ...prevState,
      [name]: parseInt(value)
    }))
  }


  render() {

    const { url, playStatus } = this.props;

    const { playbackRate, volume } = this.state;

    return (
      <section className="player">
        <div className="turntable">
          {/* <div className={"my-class " + (isRed ? "red" : null)} /> */}
          <img className={"vinyl " + (playStatus === "PLAYING" ? "spin" : "")}
            onClick={() => this.props.togglePlay()}
            src="https://thosepoorbastards.com/store/image/cache/data/vinyl/vinyl_sab_vinyl-600x600.png" alt="vinyl" />
          <div className={"tt-arm " + (playStatus === "PLAYING" ? "tt-play" : "tt-stop")}></div>
          <button className="start-stop-btn">&#8227;</button>
          <ProgressBar
            className="volume-bar"
            variant="danger"
            now={volume} />
        </div>
        {/* <audio src={url} controls /> */}Î

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
          <label htmlFor="volume">Volume</label>
          <input
            className="volume-input"
            name="volume"
            type="number"
            step={1}
            min={1}
            max={120}
            onChange={this.handleControlChange}
            value={volume} />
          <Sound
            url={url && url}
            volume={volume}
            playbackRate={playbackRate}
            // onLoad={console.log('onLoad called')}
            // whilePlaying={console.log('while Playing Called')}
            playStatus={playStatus} />
        </div>
      </section>
    )
  }
}



export default Player;
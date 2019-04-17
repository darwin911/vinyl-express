import React, { Component } from 'react'
import Sound from 'react-sound';
import { ProgressBar, Alert } from 'react-bootstrap';

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
      [name]: parseFloat(value)
    }))
  }


  render() {

    const { currentTrack, playStatus, errorMessage } = this.props;

    const { playbackRate, volume } = this.state;

    return (
      <section className="player">
        <div className="turntable">
          <img className={"vinyl " + (playStatus === "PLAYING" ? "spin" : "")}
            onClick={() => this.props.togglePlay()}
            src="https://thosepoorbastards.com/store/image/cache/data/vinyl/vinyl_sab_vinyl-600x600.png" alt="vinyl" />
          <div className={"tt-arm " + (playStatus === "PLAYING" ? "tt-play" : "tt-stop")}></div>
          <button onClick={() => this.props.togglePlay()}
            className={"start-stop-btn " + (playStatus === "PLAYING" ? "green" : "")} >&#8227;</button>
          <ProgressBar
            className="volume-bar"
            variant="danger"
            now={volume} />
          <input
            className="playback-input"
            name="playbackRate"
            type="number"
            step={0.05}
            min={0.5}
            max={3}
            onChange={this.handleControlChange}
            value={playbackRate} />
          <input
            className="volume-input"
            name="volume"
            type="number"
            step={1}
            min={1}
            max={120}
            onChange={this.handleControlChange}
            value={volume} />
        </div>
        {errorMessage && <Alert dismissible variant="light">{errorMessage}</Alert>}
        {(currentTrack.title) ?  <p style={{fontFamily: "Cute Font", fontSize: "3rem", lineHeight: "1"}}>{currentTrack.title}</p> : <p>Load a track first!</p>}
        
        <Sound
          url={currentTrack.url && currentTrack.url}
          volume={volume}
          playbackRate={playbackRate}
          onFinish={this.props.togglePlay}
          // onPlaying={this.props.togglePlay}
          // onLoad={console.log('onLoad called')}
          // whilePlaying={console.log('while Playing Called')}
          playStatus={playStatus} />
      </section>
    )
  }
}



export default Player;
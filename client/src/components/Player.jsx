import React, { Component } from "react";
import Sound from "react-sound";
import { Alert } from "react-bootstrap";
import TimeFormat from "hh-mm-ss";
import vinyl from "../assets/vinyl-red.png";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackRate: 1,
      volume: 70,
      duration: 0,
      position: 0
    };
    this.handleControlChange = this.handleControlChange.bind(this);
  }

  handleControlChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: parseFloat(value)
    }));
  }

  render() {
    const { currentTrack, playStatus, errorMessage } = this.props;
    const { playbackRate, volume, position, duration } = this.state;
    return (
      <section className="player">
        <div className="turntable">
          <img
            className={"vinyl " + (playStatus === "PLAYING" ? "spin" : "")}
            src={vinyl}
            alt="vinyl"
          />

          <div
            className={
              "tt-arm " + (playStatus === "PLAYING" ? "tt-play" : "tt-stop")
            }
          />

          <button
            onClick={() => this.props.togglePlay()}
            className={
              "start-stop-btn " + (playStatus === "PLAYING" ? "green" : "")
            }
          >
            &#8227;
          </button>

          <input
            className="playback-input"
            name="playbackRate"
            type="range"
            step={0.01}
            min={0.5}
            max={3.5}
            onChange={this.handleControlChange}
            value={playbackRate}
          />

          <input
            className="volume-input"
            name="volume"
            type="range"
            step={1}
            min={1}
            max={120}
            onChange={this.handleControlChange}
            value={volume}
          />
        </div>

        {errorMessage && <Alert variant="dark">{errorMessage}</Alert>}

        <p className="track-time">
          {TimeFormat.fromMs(parseInt(position), "mm:ss").slice(0, 5)} /{" "}
          {TimeFormat.fromMs(parseInt(duration), "mm:ss").slice(0, 5)}
        </p>

        {currentTrack.title ? (
          <p
            style={{
              fontFamily: "Helvetica Neue",
              fontSize: "2rem",
              lineHeight: "1"
            }}
          >
            {currentTrack.title}
          </p>
        ) : (
          <p>Load a track first!</p>
        )}
        <Sound
          url={currentTrack.url && currentTrack.url}
          volume={volume}
          playbackRate={playbackRate}
          onFinish={() => this.props.togglePlay}
          onLoad={e => {
            this.setState({ duration: e.duration });
          }}
          onPlaying={e => {
            this.setState({ position: e.position });
          }}
          playStatus={playStatus}
        />
      </section>
    );
  }
}

export default Player;

import React from 'react';
import Sound from 'react-sound';
import { Alert } from 'react-bootstrap';
import TimeFormat from 'hh-mm-ss';
import vinyl from '../assets/vinyl-red.png';

const Player = ({ togglePlay, currentTrack, playStatus, errorMessage }) => {
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [volume, setVolume] = React.useState(90);
  const [duration, setDuration] = React.useState(0);
  const [position, setPosition] = React.useState(0);

  return (
    <section className='player'>
      <div className='turntable'>
        <img
          className={'vinyl ' + (playStatus === 'PLAYING' ? 'spin' : '')}
          src={vinyl}
          alt='vinyl'
        />

        <div
          className={
            'tt-arm ' + (playStatus === 'PLAYING' ? 'tt-play' : 'tt-stop')
          }
        />

        <button
          onClick={() => togglePlay()}
          className={
            'start-stop-btn ' + (playStatus === 'PLAYING' ? 'green' : '')
          }>
          &#8227;
        </button>

        <input
          className='playback-input'
          name='playbackRate'
          type='range'
          step={1}
          min={0.5}
          max={2.0}
          onChange={e => setPlaybackRate(e.target.value)}
          value={playbackRate}
        />

        <input
          className='volume-input'
          name='volume'
          type='range'
          step={1}
          min={1}
          max={110}
          onChange={e => setVolume(parseInt(e.target.value))}
          value={volume}
        />
      </div>

      {errorMessage && <Alert variant='dark'>{errorMessage}</Alert>}

      <p className='track-time'>
        {TimeFormat.fromMs(parseInt(position), 'mm:ss').slice(0, 5)} /{' '}
        {TimeFormat.fromMs(parseInt(duration), 'mm:ss').slice(0, 5)}
      </p>

      {currentTrack.title ? (
        <p
          style={{
            fontFamily: 'Helvetica Neue',
            fontSize: '2rem',
            lineHeight: '1'
          }}>
          {currentTrack.title}
        </p>
      ) : (
        <p>Load a track first!</p>
      )}
      <Sound
        url={currentTrack.url && currentTrack.url}
        volume={volume}
        playbackRate={playbackRate}
        onLoad={e => setDuration(e.duration)}
        onPlaying={e => setPosition(e.position)}
        playStatus={playStatus}
      />
    </section>
  );
};

export default Player;

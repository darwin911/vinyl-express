import React, { Component } from 'react';
import './App.css';
import { registerUser, loginUser, addTrack, removeTrack, getUserTracks } from './services/helper';
import { Link, Route, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import Player from './components/Player';
import Sound from 'react-sound';
import { Navbar, Nav } from 'react-bootstrap';
import decode from 'jwt-decode'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playStatus: "STOPPED",
      currentUser: {
        id: '',
        name: '',
        email: '',
      },
      currentTrack: {
        title: '',
        id: '',
      },
      name: 'HAL 9000',
      email: 'test@test.com',
      password: 'test',
      title: '',
      track: '',
      tracks: [],
      url: 'https://s3.amazonaws.com/vinyl-express-p4/trackFolder/1554950969153-lg.mp3',
      isLoggedIn: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSubmitTrack = this.handleSubmitTrack.bind(this);
    this.handleDeleteTrack = this.handleDeleteTrack.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.setTrackUrl = this.setTrackUrl.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const data = decode(token);
      console.log(data);
      this.setState({
        isLoggedIn: true,
        currentUser: {
          name: data.name,
          email: data.email,
        }
      })
      this.props.history.push('/')
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  async handleLogin(e) {
    e.preventDefault();
    console.log('handleLogin called')
    const { email, password } = this.state
    const loginData = { email, password, }

    try {
      const user = await loginUser(loginData)
      console.log(user)
      if (user) {
        localStorage.setItem('token', user.token)
        const tracks = await getUserTracks(user.userData.id);
        console.log(tracks)
        this.setState({
          currentUser: user.userData,
          name: '',
          email: '',
          password: '',
          isLoggedIn: true,
          tracks
        })
      }
      this.props.history.push('/player')
    } catch (error) {
      console.error("INVALID_CREDENTIALS", error)
      this.setState({
        errorMessage: error
      })
    }
  }

  handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    this.props.history.push('/')
    this.setState({
      isLoggedIn: false,
      currentUser: {
        id: '',
        name: '',
        email: '',
      }
    })
  }

  async handleRegister(e) {
    e.preventDefault();
    console.log('handleRegister Called')
    const { name, email, password } = this.state;
    const data = { name, email, password }

    const user = await registerUser(data);
    console.log(user)
    localStorage.setItem('token', user.token)
    this.setState({
      name: '',
      email: '',
      password: '',
      isLoggedIn: true,
      currentUser: user.userData,
    })

    this.props.history.push('/player')
  }

  async handleSubmitTrack() {
    const { filename, url, currentUser } = this.state;
    const data = { filename, url, userId: currentUser.id }
    const track = await addTrack(data);
    console.log(track)
  }

  async handleDeleteTrack(trackId) {
    console.log('delete called', trackId)
    const resp = await removeTrack(trackId);
    console.log(resp)
    
  }

  togglePlay() {
    (this.state.playStatus === 'STOPPED' | this.state.playStatus === 'PAUSED')
      ? this.setState({ playStatus: 'PLAYING' })
      : this.setState({ playStatus: 'PAUSED' })
  }

  async setTrackUrl(url, filename) {
    console.log(url, filename)
    this.setState({
      url,
      filename
    })
    const temp = await this.handleSubmitTrack()
    console.log(temp)
    this.props.history.push('/player')
    this.togglePlay();
  }

  render() {
    const {
      isLoggedIn,
      currentUser,
      name,
      email,
      password,
      playStatus,
      tracks,
      url,
      filename } = this.state
    return (
      <div className="App">
        <header>
          <Navbar bg="dark" variant="dark">
            <Link to="/"><h2 className="nav-brand">Vinyl</h2></Link>
            <Nav className="ml-auto">
              {
                (isLoggedIn) ?
                  <Link to="/" onClick={this.handleLogout}>Logout</Link>
                  :
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register" >Register</Link>
                  </>
              }
              <Link to="/player">Player</Link>
              <Link to="/upload">Upload</Link>
            </Nav>
          </Navbar>
        </header>

        <main className="container">

          <Route exact path="/" render={() => (
            <h5>A harder, but cooler way to listen to your music.</h5>
          )} />

          <Route exact path="/register" render={(props) => (
            <Register
              name={name}
              email={email}
              password={password}
              handleChange={this.handleChange}
              handleRegister={this.handleRegister} />)} />

          <Route exact path="/login" render={(props) => (
            <Login
              name={name}
              email={email}
              password={password}
              handleChange={this.handleChange}
              handleLogin={this.handleLogin} />)} />

          {
            this.state.isLoggedIn &&
            <>
              <Route exact path="/upload" render={(props) => (
                <FileUpload
                  setTrackUrl={this.setTrackUrl} />)} />

              <Route exact path="/player" render={(props) => (
                <Player
                  playStatus={playStatus}
                  togglePlay={this.togglePlay}
                  filename={filename} />
              )} />

              {
                currentUser.name &&
                <section className="section-tracks">
                  <h3>{currentUser.name} has {tracks.length} tracks</h3>
                  {tracks.map(track => <>
                    <p key={track.id}>{track.title}</p>
                    <p key={track.id}
                      onClick={() =>
                        this.setState({ url: track.url, filename: track.filename })
                      } >{track.url}</p>
                    <p key={track.id}>Track Id: {track.id}</p>
                    <button onClick={() => this.handleDeleteTrack(track.id)}>X</button>
                  </>)
                  }
                </section>
              }

              <Sound
                autoLoad={true}
                url={url && url}
                playStatus={playStatus}
              >audio</Sound>
            </>
          }
        </main>

        <footer>
          <p>&copy; Darwin Smith 2019</p>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);

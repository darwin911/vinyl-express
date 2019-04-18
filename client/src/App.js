import React, { Component } from 'react';
import './App.css';
import {
  registerUser,
  loginUser,
  addTrack,
  removeTrack,
  getUserTracks,
  updateTrack
} from './services/helper';
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import { Link, Route, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import Player from './components/Player';
import Footer from './components/Footer';
import TrackList from './components/TrackList';
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
        url: '',
      },
      updateForm: {
        title: '',
        id: '',
        url: '',
        userId: '',
      },
      name: '',
      email: '',
      password: '',
      errorMessage: '',
      track: '',
      tracks: [],
      isLoggedIn: false,
      isEdit: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSubmitTrack = this.handleSubmitTrack.bind(this);
    this.handleDeleteTrack = this.handleDeleteTrack.bind(this);
    this.handleEditTrack = this.handleEditTrack.bind(this);
    this.handleUpdateTrack = this.handleUpdateTrack.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.setTrackUrl = this.setTrackUrl.bind(this);
    this.loadTrack = this.loadTrack.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const data = decode(token);
      const tracks = await getUserTracks(data.id);
      this.setState({
        isLoggedIn: true,
        currentUser: {
          name: data.name,
          email: data.email,
          id: data.id,
        }, tracks,
      })
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  async handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state
    const loginData = { email, password }
    try {
      const user = await loginUser(loginData)
      if (user) {
        localStorage.setItem('token', user.token)
        const tracks = await getUserTracks(user.userData.id);
        this.setState({
          currentUser: user.userData,
          name: '',
          email: '',
          password: '',
          isLoggedIn: true,
          tracks,
        })
      }
      this.props.history.push('/player')
    } catch (error) {
      console.error("INVALID_CREDENTIALS", error)
      this.setState({ errorMessage: "Invalid Credentials" })
      setTimeout(() => {
        this.setState({ errorMessage: "" })
      }, 4000)
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
    const { name, email, password } = this.state;
    const data = { name, email, password }
    try {
      const user = await registerUser(data);
      localStorage.setItem('token', user.token)
      this.setState({
        name: '',
        email: '',
        password: '',
        isLoggedIn: true,
        currentUser: user.userData,
        tracks: [],
      })
      this.props.history.push('/player')
    } catch (error) {
      console.log(error)
      this.setState({ errorMessage: "This email is already in use." })
      setTimeout(() => {
        this.setState({ errorMessage: "" })
      }, 4000)
    }
  }

  handleEditTrack(track) {
    if (this.state.isEdit === false) {
      this.setState({
        isEdit: track.id,
        updateForm: { ...track }
      })
    }
  }

  handleUpdateChange(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      updateForm: {
        ...prevState.updateForm,
        [name]: value,
      }
    }))
  }

  async handleUpdateTrack(trackData) {
    // eslint-disable-next-line
    const track = await updateTrack(trackData.id, trackData);
    console.log(track)
    this.setState(prevState => ({
      // tracks: [...prevState.tracks.filter(t => t.id !== trackData.id), trackData].sort((a, b) => a.id - b.id),
      isEdit: false,
      tracks: prevState.tracks.map(t => {
        if (t.id !== trackData.id) {
          return t
        } else {
          return track
        }
      })
    }))
  }

  async handleDeleteTrack(trackId) {
    // eslint-disable-next-line
    const resp = await removeTrack(trackId);
    this.setState(prevState => ({
      tracks: [...prevState.tracks.filter(track => track.id !== trackId)]
    }));
  }

  togglePlay() {
    const url = this.state.currentTrack.url
    if (url !== "") {
      setTimeout(() => {
        (this.state.playStatus === 'STOPPED' | this.state.playStatus === 'PAUSED')
          ? this.setState({ playStatus: 'PLAYING' })
          : this.setState({ playStatus: 'PAUSED' })
      }, 300)
    } else {
      this.setState({ errorMessage: "No track loadad" })
      setTimeout(() => {
        this.setState({ errorMessage: "" })
      }, 4000)
    }
  }

  async setTrackUrl(url, title) {
    this.setState({ currentTrack: { url, title } })
    // eslint-disable-next-line
    const temp = await this.handleSubmitTrack()
    this.props.history.push('/player')
    this.togglePlay();
  }

  loadTrack(track) {
    this.setState({
      currentTrack: {
        url: track.url,
        title: track.title,
        id: track.id,
      },
      filename: track.filename
    })
  }

  async handleSubmitTrack() {
    const { currentTrack, currentUser } = this.state;
    console.log(currentTrack, currentUser)
    const data = {
      title: currentTrack.title,
      url: currentTrack.url,
      userId: currentUser.id
    }
    const track = await addTrack(data);
    this.setState(prevState => ({
      tracks: [...prevState.tracks, track.track]
    }))
  }

  render() {
    const {
      isEdit,
      updateForm,
      isLoggedIn,
      currentUser,
      name,
      email,
      password,
      playStatus,
      tracks,
      currentTrack,
      filename,
      errorMessage } = this.state
    return (
      <div className="App">
        <header className="bg-dark">
          <Navbar className="container">
            <Link to="/"><h2 className="nav-brand">V<span>i</span>nyl</h2></Link>
            <Nav className="ml-auto">
              {
                (isLoggedIn) ?
                  <>
                    <Link to="/player">Player</Link>
                    <Link to="/upload">Upload</Link>
                    <Link to="/" onClick={this.handleLogout}>Logout</Link>
                  </>
                  :
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register" >Register</Link>
                  </>
              }
            </Nav>
          </Navbar>
        </header>

        <main className="container">

          <Route exact path="/" render={() => (
            <h2>Music, on a record player – but not really.</h2>
          )} />

          <Route exact path="/register" render={(props) => (
            <Register
              name={name}
              email={email}
              password={password}
              errorMessage={errorMessage}
              handleChange={this.handleChange}
              handleRegister={this.handleRegister} />)} />

          <Route exact path="/login" render={(props) => (
            <Login
              name={name}
              email={email}
              password={password}
              errorMessage={errorMessage}
              handleChange={this.handleChange}
              handleLogin={this.handleLogin} />)} />

          {
            this.state.isLoggedIn &&
            <>
              <Route exact path="/upload" render={(props) => (
                <FileUpload
                  setTrackUrl={this.setTrackUrl} />)} />

              <Route exact path="/player" render={(props) => (
                <>
                  <Player
                    errorMessage={errorMessage}
                    currentTrack={currentTrack}
                    playStatus={playStatus}
                    togglePlay={this.togglePlay}
                    filename={filename} />
                  <TrackList
                    tracks={tracks}
                    isEdit={isEdit}
                    updateForm={updateForm}
                    loadTrack={this.loadTrack}
                    handleUpdateChange={this.handleUpdateChange}
                    handleUpdateTrack={this.handleUpdateTrack}
                    handleEditTrack={this.handleEditTrack}
                    handleDeleteTrack={this.handleDeleteTrack}
                    currentUser={currentUser} />
                </>)} />
            </>
          }
        </main>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);

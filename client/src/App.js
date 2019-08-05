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
import { Navbar, Nav } from 'react-bootstrap';
import { Link, Route, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import Player from './components/Player';
import Footer from './components/Footer';
import TrackList from './components/TrackList';
import decode from 'jwt-decode';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: 'STOPPED',
      currentUser: {
        id: '',
        name: '',
        email: ''
      },
      currentTrack: {
        title: '',
        id: '',
        url: ''
      },
      updateForm: {
        title: '',
        id: '',
        url: '',
        userId: ''
      },
      name: '',
      email: 'test@test.com',
      password: 'test',
      errorMessage: '',
      track: '',
      tracks: [],
      isLoggedIn: false,
      isEdit: false
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { name, email, id } = decode(token);
      const tracks = await getUserTracks(id);
      this.setState({
        isLoggedIn: true,
        tracks,
        currentUser: { name, email, id }
      });
      this.props.history.push('/player');
    } else {
      this.props.history.push('/');
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const loginData = { email, password };
    try {
      const { token, userData } = await loginUser(loginData);
      if (userData) {
        localStorage.setItem('token', token);
        const tracks = await getUserTracks(userData.id);
        this.setState({
          isLoggedIn: true,
          currentUser: userData,
          tracks,
          name: '',
          email: '',
          password: ''
        });
      }
      this.props.history.push('/player');
    } catch (error) {
      console.error('INVALID_CREDENTIALS', error);
      this.setState({ errorMessage: 'Invalid Credentials' });
      setTimeout(() => {
        this.setState({ errorMessage: '' });
      }, 4000);
    }
  };

  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    this.props.history.push('/');
    this.setState({
      isLoggedIn: false,
      currentUser: {
        id: '',
        name: '',
        email: ''
      }
    });
  };

  handleRegister = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const data = { name, email, password };
    try {
      const user = await registerUser(data);
      localStorage.setItem('token', user.token);
      this.setState({
        name: '',
        email: '',
        password: '',
        isLoggedIn: true,
        currentUser: user.userData,
        tracks: []
      });
      this.props.history.push('/player');
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: 'Email already in use.' });
      setTimeout(() => {
        this.setState({ errorMessage: '' });
      }, 4000);
    }
  };

  handleEditTrack = track => {
    if (this.state.isEdit === false) {
      this.setState({
        isEdit: track.id,
        updateForm: { ...track }
      });
    }
  };

  handleUpdateChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      updateForm: {
        ...prevState.updateForm,
        [name]: value
      }
    }));
  };

  handleUpdateTrack = async trackData => {
    const updatedTrack = await updateTrack(trackData);
    this.setState(prevState => ({
      isEdit: false,
      currentTrack: {
        ...prevState.currentTrack,
        title: trackData.title
      },
      tracks: prevState.tracks.map(track => {
        if (track.id !== trackData.id) {
          return track;
        } else {
          return updatedTrack;
        }
      })
    }));
  };

  handleDeleteTrack = async trackId => {
    await removeTrack(trackId);
    this.setState(prevState => ({
      tracks: [...prevState.tracks.filter(track => track.id !== trackId)]
    }));
  };

  togglePlay = () => {
    const url = this.state.currentTrack.url;
    if (url !== '') {
      setTimeout(() => {
        (this.state.playStatus === 'STOPPED') |
        (this.state.playStatus === 'PAUSED')
          ? this.setState({ playStatus: 'PLAYING' })
          : this.setState({ playStatus: 'PAUSED' });
      }, 300);
    } else {
      this.setState({ errorMessage: 'No track loadad' });
      setTimeout(() => {
        this.setState({ errorMessage: '' });
      }, 4000);
    }
  };

  setTrackUrl = async (url, title) => {
    this.setState({ currentTrack: { url, title } });
    await this.handleSubmitTrack();
    this.props.history.push('/player');
    this.togglePlay();
  };

  loadTrack = track => {
    this.setState({
      currentTrack: {
        url: track.url,
        title: track.title,
        id: track.id
      },
      filename: track.filename
    });
  };

  handleSubmitTrack = async () => {
    const { currentTrack, currentUser } = this.state;
    const data = {
      title: currentTrack.title,
      url: currentTrack.url,
      userId: currentUser.id
    };
    const track = await addTrack(data);
    this.setState(prevState => ({
      tracks: [...prevState.tracks, track]
    }));
  };

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
      errorMessage
    } = this.state;
    return (
      <div className='App'>
        <header className='bg-dark'>
          <Navbar className='container'>
            <Link to='/'>
              <h2 className='nav-brand'>
                V<span>i</span>nyl
              </h2>
            </Link>
            <Nav className='ml-auto'>
              {isLoggedIn ? (
                <>
                  <Link to='/player'>Player</Link>
                  <Link to='/upload'>Upload</Link>
                  <Link to='/' onClick={this.handleLogout}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
                </>
              )}
            </Nav>
          </Navbar>
        </header>

        <main className='container'>
          <Route
            exact
            path='/'
            render={() => <h2>Music, on a record player – but not really.</h2>}
          />

          <Route
            exact
            path='/register'
            render={props => (
              <Register
                name={name}
                email={email}
                password={password}
                errorMessage={errorMessage}
                handleChange={this.handleChange}
                handleRegister={this.handleRegister}
              />
            )}
          />

          <Route
            exact
            path='/login'
            render={props => (
              <Login
                name={name}
                email={email}
                password={password}
                errorMessage={errorMessage}
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
              />
            )}
          />

          {this.state.isLoggedIn && (
            <>
              <Route
                exact
                path='/upload'
                render={props => <FileUpload setTrackUrl={this.setTrackUrl} />}
              />

              <Route
                exact
                path='/player'
                render={props => (
                  <>
                    <Player
                      errorMessage={errorMessage}
                      currentTrack={currentTrack}
                      playStatus={playStatus}
                      togglePlay={this.togglePlay}
                      filename={filename}
                    />
                    <TrackList
                      tracks={tracks}
                      isEdit={isEdit}
                      updateForm={updateForm}
                      loadTrack={this.loadTrack}
                      handleUpdateChange={this.handleUpdateChange}
                      handleUpdateTrack={this.handleUpdateTrack}
                      handleEditTrack={this.handleEditTrack}
                      handleDeleteTrack={this.handleDeleteTrack}
                      currentUser={currentUser}
                    />
                  </>
                )}
              />
            </>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);

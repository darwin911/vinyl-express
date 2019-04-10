import React, { Component } from 'react';
import './App.css';
import { registerUser, loginUser, addTrack } from './services/helper';
import { Link, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import Sound from 'react-sound';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playStatus: "STOPPED",
      currentUser: '',
      name: '',
      email: 'test@test.com',
      password: 'test',
      title: '',
      url: '',
      isLoggedIn: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSubmitTrack = this.handleSubmitTrack.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.setTrackUrl = this.setTrackUrl.bind(this);
  }

  async componentDidMount() {

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
      this.setState({
        token: user,
        email: '',
        password: '',
        isLoggedIn: true,
      })
    } catch (error) {
      console.error("INVALID_CREDENTIALS", error)
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    console.log('handleRegister Called')
    const { name, email, password } = this.state;
    const data = { name, email, password }
    console.log(data)
    const user = await registerUser(data);

    this.setState({
      name: '',
      email: '',
      password: '',
      token: user
    })
  }

  async handleSubmitTrack() {
    const { filename, url } = this.state;
    const data = { filename, url }
    const track = await addTrack(data);
    console.log(track)
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

  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Vinyl</h1>
          <Link to="/register" >Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/upload">Upload</Link>
        </header>


        <Route exact path="/upload" render={(props) => (
          <FileUpload 
            setTrackUrl={this.setTrackUrl}/>)} />

        <Route exact path="/register" render={(props) => (
          <Register
            name={this.state.name}
            email={this.state.email}
            password={this.state.password}
            handleChange={this.handleChange}
            handleRegister={this.handleRegister} />)} />

        <Route exact path="/login" render={(props) => (
          <Login
            name={this.state.name}
            email={this.state.email}
            password={this.state.password}
            handleChange={this.handleChange}
            handleLogin={this.handleLogin} />)} />

            {/* <audio src={this.state.track && this.state.track} controls></audio> */}

        <Button variant="outline-primary" onClick={this.togglePlay}>Play/Pause</Button>
        <Sound url={this.state.track && this.state.track} 
          playStatus={this.state.playStatus}>audio</Sound>

      </div>
    );
  }
}

export default App;

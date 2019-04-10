import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { allUsers, registerUser, addTrack } from './services/helper';
import { Link, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: '',
      name: '',
      email: '',
      password: '',
      title: '',
      url: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSubmitTrack = this.handleSubmitTrack.bind(this);
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

  async handleSubmitTrack(e) {
    e.preventDefault();
    console.log('handleSubmitTrack Called')
    const { title, url } = this.state;
    const data = { title, url }
    console.log(data)
    const track = await addTrack(data);
    console.log(track)
    this.setState({
      title: '',
      url: '',
      track
    })
  }
 
  render() {
    return (
      <div className="App">
        <h1>Vinyl</h1>

        <Link to="/register" >Register</Link>
        <Link to="/login">Login</Link>

        <FileUpload />

        {/* <form onSubmit={this.handleSubmitTrack}>
          <input
            onChange={this.handleChange}
            type="text"
            name="title"
            placeholder="Track Title"
            required
            value={this.state.title}
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="url"
            placeholder="Track Url"
            value={this.state.url}
            required />
          <button>Add Track</button>
        </form>

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
            handleLogin={this.handleLogin} />)} /> */}

      </div>
    );
  }
}

export default App;

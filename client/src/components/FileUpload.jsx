
import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {
  constructor (props) {
    super(props);
    this.state = {
      file: null
    };
    this.submitFile = this.submitFile.bind(this);
  }

  async submitFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`http://localhost:3001/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => {
      console.log(resp.data);
      this.props.setTrackUrl(resp.data.Location, this.state.filename)
    }).catch(error => {
      console.log(error);
    });
  }

  handleFileUpload = (e) => {
    this.setState({
      file: e.target.files,
      filename: e.target.files[0].name
    });
  }

  render () {
    return (
      <form onSubmit={this.submitFile}>
        <input
          type="text"
          name="filename"
          placeholder="Track Name"
          onChange={this.props.handleChange}
          value={this.props.trackname}
          />
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='submit'>Select Track</button>
      </form>
    );
  }
}

export default FileUpload;
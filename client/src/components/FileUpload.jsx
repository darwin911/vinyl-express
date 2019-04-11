
import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl, Button } from 'react-bootstrap'

class FileUpload extends Component {
  constructor(props) {
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

  render() {
    return (
      <Form onSubmit={this.submitFile}>
        <FormControl
          type="text"
          name="filename"
          placeholder="Track Name"
          onChange={this.props.handleChange}
          value={this.state.filename} required />
        <FormControl
          label="upload file"
          type="file"
          onChange={this.handleFileUpload} required />
        <Button type="submit">Select Track</Button>
      </Form>
    );
  }
}

export default FileUpload;
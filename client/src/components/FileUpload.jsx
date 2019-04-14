
import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl, Button } from 'react-bootstrap'

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      title: '',
    };
    this.submitFile = this.submitFile.bind(this);
  }

  async submitFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
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
    console.log(e.target.files[0])
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name
    });
  }

  render() {
    return (
      <Form
        className="fileupload-form"
        onSubmit={this.submitFile}>
        <FormControl
          type="text"
          name="title"
          placeholder="Track Title"
          onChange={this.props.handleChange}
          value={this.state.filename} required />
        <FormControl
          className="fileupload-input"
          label="upload file"
          type="file"
          autoFocus={true}
          accept="audio/*"
          onChange={this.handleFileUpload} required />
        <Button variant="outline-info" type="submit">Select Track</Button>
      </Form>
    );
  }
}

export default FileUpload;
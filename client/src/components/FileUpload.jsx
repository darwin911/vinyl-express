import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { upload } from '../services/helper';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      title: ''
    };
  }

  submitFile = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    const resp = await upload(formData);
    this.props.setTrackUrl(resp.Location, this.state.title);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleFileUpload = e => {
    this.setState({
      file: e.target.files[0],
      title: e.target.files[0].name
    });
  };

  render() {
    const { title } = this.state;
    return (
      <Form className='fileupload-form' onSubmit={this.submitFile}>
        <FormControl
          type='text'
          name='title'
          placeholder='Track Title'
          onChange={this.handleChange}
          value={title}
          required
        />
        <FormControl
          className='fileupload-input'
          label='upload file'
          type='file'
          autoFocus={true}
          accept='audio/*'
          onChange={this.handleFileUpload}
          required
        />
        <Button variant='outline-info' type='submit'>
          Select Track
        </Button>
      </Form>
    );
  }
}

export default FileUpload;

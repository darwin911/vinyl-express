import React, { Component } from "react";
import axios from "axios";
import { Form, FormControl, Button } from "react-bootstrap";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      title: ""
    };
    this.submitFile = this.submitFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async submitFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    axios
      .post(`https://vinyl-express.herokuapp.com/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(resp => {
        this.props.setTrackUrl(resp.data.Location, this.state.title);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  handleFileUpload = e => {
    this.setState({
      file: e.target.files[0],
      title: e.target.files[0].name
    });
  };

  render() {
    return (
      <Form className="fileupload-form" onSubmit={this.submitFile}>
        <FormControl
          type="text"
          name="title"
          placeholder="Track Title"
          onChange={this.handleChange}
          value={this.state.title}
          required
        />
        <FormControl
          className="fileupload-input"
          label="upload file"
          type="file"
          autoFocus={true}
          accept="audio/*"
          onChange={this.handleFileUpload}
          required
        />
        <Button variant="outline-info" type="submit">
          Select Track
        </Button>
      </Form>
    );
  }
}

export default FileUpload;

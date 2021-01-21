import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import { apiEndpoint } from '../config';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static defaultProps = {
    history: {
      goBack: () => {},
    },
  };

  static contextType = ApiContext;

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const target = e.target,
      name = target.folderName.value,
      myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({ folder_name: name });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${apiEndpoint.API_ENDPOINT}/folders`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.context.addFolder(result);
        this.props.history.goBack();
      })
      .catch((error) => console.log('error', error));
  }

  render() {
    return (
      <ErrorBoundary>
        <form onSubmit={this.handleSubmit}>
          <label>
            New Folder:{' '}
            <input
              type="text"
              name="folderName"
              id="folderName"
              onChange={this.handleChange}
              placeholder="ex: Awesome folder"
              required
            />{' '}
          </label>
          <input type="submit" value="Submit" />
        </form>
      </ErrorBoundary>
    );
  }
}
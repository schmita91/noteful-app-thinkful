import React, { Component } from 'react';

import ApiContext from '../ApiContext';
import { apiEndpoint } from '../config';

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static defaultProps = {
    history: {
      goBack: () => {},
    },
  };

  static contextType = ApiContext;

  handleSubmit(e) {
    e.preventDefault();
    const target = e.target,
      name = target.noteName.value,
      content = target.content.value,
      folder = target.folder.value,
      myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      note_name: name,
      content: content,
      folder_id: folder,
      date_created: Date.now(),
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${apiEndpoint.API_ENDPOINT}/notes`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.context.addNote(result);
        this.props.history.goBack();
      })
      .catch((error) => console.log('error', error));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label>
            Note Name:
            <input
              type="text"
              name="noteName"
              id="noteName"
              placeholder="ex: Awesome Note"
              required
            />{' '}
          </label>
          <div>
            <label>Note content:</label>
          </div>
          <div>
            {/* prettier-ignore */}
            <textarea 
              name="content" 
              id="content" 
              placeholder="Type some notesy stuff here..."
              required 
            />
          </div>
          <label>
            Folder:
            <select name="folder" id="folder">
              {this.context.folders.map((folder) => {
                return (
                  <option key={`note-option-${folder.id}`} value={folder.id}>
                    {folder.folder_name}
                  </option>
                );
              })}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    );
  }
}
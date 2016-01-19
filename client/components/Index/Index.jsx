import React, { Component } from 'react';
import Editor from '../../../src/editor.js';

class IndexComponent extends Component {
  render() {
    return (
      <Editor />
    );
  }
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;

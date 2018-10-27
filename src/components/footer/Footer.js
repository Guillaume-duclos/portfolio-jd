import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="flex row between">
        <Link to={`/Content/${this.props.projectIndex - 1}`}/>
        <Link to="/Home"/>
        <Link to={`/Content/${this.props.projectIndex + 1}`}/>
      </footer>
    );
  }
}

export default Footer;
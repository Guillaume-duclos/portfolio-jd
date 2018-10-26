import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="flex row between">
        <Link to="/Home"/>
        <Link to="/Home"/>
        <Link to="/Home"/>
      </footer>
    );
  }
}

export default Footer;
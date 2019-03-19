import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    if (parseInt(this.props.projectIndex, 10) === 0) {
      return (
        <footer className="flex row between">
          <div to={'/Content/' + (parseInt(this.props.projectIndex, 10))}/>
          <Link to="/Home" className="clickable"/>
          <Link to={'/Content/' + (parseInt(this.props.projectIndex, 10) + 1)} className="clickable"/>
        </footer>
      );
    } else if (parseInt(this.props.projectIndex, 10) === this.props.projectNumber - 1) {
      return (
        <footer className="flex row between">
          <Link to={'/Content/' + (parseInt(this.props.projectIndex, 10) - 1)} className="clickable"/>
          <Link to="/Home" className="clickable"/>
          <div to={'/Content/' + (parseInt(this.props.projectIndex, 10))}/>
        </footer>
      );
    } else {
      return (
        <footer className="flex row between">
          <Link to={'/Content/' + (parseInt(this.props.projectIndex, 10) - 1)} className="clickable"/>
          <Link to="/Home" className="clickable"/>
          <Link to={'/Content/' + (parseInt(this.props.projectIndex, 10) + 1)} className="clickable"/>
        </footer>
      );
    }
  }
}

export default Footer;
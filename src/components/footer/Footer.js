import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    if (parseInt(this.props.projectIndex, 10) === 0) {
      return (
        <footer className="flex row between">
          <div to={'/Content/' + (parseInt(this.props.projectIndex, 10))}></div>
          <Link to="/Home"/>
          <Link to={'/Content/' + (parseInt(this.props.projectIndex, 10) + 1)}/>
        </footer>
      );
    } else if (parseInt(this.props.projectIndex, 10) === this.props.projectNumber - 1) {
      return (
        <footer className="flex row between">
          <Link to={'/Content/' + (parseInt(this.props.projectIndex, 10) - 1)}/>
          <Link to="/Home"/>
          <div to={'/Content/' + (parseInt(this.props.projectIndex, 10))}></div>
        </footer>
      );
    } else {
      return (
        <footer className="flex row between">
          <Link to={'/Content/' + (parseInt(this.props.projectIndex, 10) - 1)}/>
          <Link to="/Home"/>
          <Link to={'/Content/' + (parseInt(this.props.projectIndex, 10) + 1)}/>
        </footer>
      );
    }
  }
}

export default Footer;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/gifs/gif-404.gif';

class TeaserCircle extends Component {
  render() {
    return (
      <div className="not-found-page">
        <img src={img} alt=""/>
        <h1 className="upper">Oups</h1>
        <p>This page is missing, but relax and stay cool as a cucumber.</p>
        <Link className="upper clickable" to="/Home">Stop chilling and go home</Link>
      </div>
    );
  }
}

export default TeaserCircle;
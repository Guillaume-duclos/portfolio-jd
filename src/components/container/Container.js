import React, { Component } from 'react';
import VerticalLines from '../vertical_lines/VerticalLines';
import Logo from "../logo/Logo";
import NavBar from "../navbar/NavBar";
import axios from "axios/index";

class Container extends Component {

  state = {
    projectNumber: 0
  };

  componentDidMount() {
    axios.get('https://guillaumeduclos.fr/jd-portfolio/wp-json/wp/v2/posts')
      .then(response => {
        this.setState({
          projectNumber: response.data.length
        });
      })
      .catch(error => {
        if(error.response) {
          console.log(error.responderEnd);
        }
      });
  }

  render() {
    return (
      <div className="container flex column">
        <VerticalLines/>
        <Logo/>
        <NavBar
          contactThrough={this.props.contactThrough}
          currentIndex={parseInt(this.props.currentIndex, 10)}
          projectNumber={this.state.projectNumber}
        />
        {this.props.children}
      </div>
    );
  }
}

export default Container;
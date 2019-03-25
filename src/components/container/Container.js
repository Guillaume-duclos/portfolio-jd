import React, { Component } from 'react';
import VerticalLines from '../vertical_lines/VerticalLines';
import Logo from "../logo/Logo";
import NavBar from "../navbar/NavBar";
import axios from "axios/index";

const cursor = document.createElement('div');

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
        if (error.response) {
          console.log(error.responderEnd);
        }
      });

    cursor.setAttribute('id', 'cursor');
    this.refs.cursorArea.append(cursor);

    document.addEventListener('mouseenter', () => {
      this.cursorNoTriggered();
    });

    document.addEventListener('mousemove', (event) => {
      cursor.classList.add('cursor-displayed');
      cursor.style.left = `${event.clientX - 15}px`;
      cursor.style.top = `${event.clientY - 15}px`;
      this.setState({
        cursorPositionX: event.pageX,
        cursorPositionY: event.pageY
      });
    });

    document.addEventListener('mouseout', () => {
      cursor.classList.remove('cursor-displayed');
    });

    if (this.props.page === "home") {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const links = document.querySelectorAll('.clickable');
    console.log(links);
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('mousemove', this.cursorTriggered);
      links[i].addEventListener('mouseout', this.cursorNoTriggered);
    }
  }

  cursorTriggered = () => {
    cursor.classList.remove('cursor-no-triggered');
    cursor.classList.add('cursor-triggered');
  };

  cursorNoTriggered = () => {
    cursor.classList.remove('cursor-triggered');
    cursor.classList.add('cursor-no-triggered');
  };

  componentWillUnmount() {
    document.getElementById('cursor').remove();
  }

  render() {
    return (
      <div className="container flex column">
        <div ref="cursorArea" className="cursor-area"/>
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
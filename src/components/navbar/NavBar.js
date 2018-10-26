import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const activeColor = 'rgba(255, 255, 255, 1)';
const inactiveColor = 'rgba(255, 255, 255, .1)';

class NavBar extends Component {

  items = () => {
    let items = [];
    for(let i = this.props.projectNumber - 1; i >= 0; i--) {
      let currentIndex = i;
      items.push(
        <li key={i}>
          <Link
            to={'/Content/' + currentIndex}
            style={this.props.currentIndex === i ? {color: activeColor, transition: '.1s'} : {color: inactiveColor}}
          >
            0{i + 1}
          </Link>
        </li>
      )
    }
    return items;
  };

  render() {
    return (
      <div className="nav-bar">
        <ul>
          <li className={this.props.contactThrough ? 'contact-through' : ''}>
            <Link to="/Contact">contact</Link>
          </li>
          {this.items()}
        </ul>
      </div>
    );
  }
}

export default NavBar;

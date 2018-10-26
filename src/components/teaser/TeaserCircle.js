import React, {Component} from 'react';
import {TweenMax, Linear, TimelineMax} from 'gsap';
import '../../utils/DrawSVGPlugin';

class TeaserCircle extends Component {

  componentWillUnmount() {
    TweenMax.killAll();
  }

  render() {
    return (
      <svg ref="circleContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <circle ref="circle" cx="-50%" cy="50%" r="50%" fill="none" transform="rotate(270)"/>
      </svg>
    );
  }
}

export default TeaserCircle;
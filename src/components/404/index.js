import React, {Component} from 'react';
import {TweenMax, Linear, TimelineMax} from 'gsap';
import {Link, Redirect} from 'react-router-dom';
import '../../utils/DrawSVGPlugin';

class TeaserCircle extends Component {

  state = {
    animDuration: 15,
    redirect: false
  }

  componentDidMount() {
    let circleAnimation = new TimelineMax({
      repeat: 1
    });
    TweenMax.set(
      this.refs.circleContainer,
      {
        xPercent: 0,
        yPercent: 0
      }
    );
    circleAnimation.from(
      this.refs.circle,
      this.state.animDuration,
      {
        drawSVG: 0,
        ease: Linear.easeNone,
        onComplete: this.redirectUpdate,
        callbackScope: this
      }
    )
  }

  redirectUpdate = () => {
    TweenMax.killAll();
    this.setState({redirect: true});
  }

  render() {
    console.log(this.state.redirect);
    if(this.state.redirect === true) {
      return (
        <Redirect to="/home"/>
      );
    } else {
      return (
        <Link to={'/Content'} id="projectTeaser" className="circle not-found-circle">
          <svg ref="circleContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <circle ref="circle" cx="-50%" cy="50%" r="50%" fill="none" transform="rotate(270)"/>
          </svg>
        </Link>
      );
    }
  }
}

export default TeaserCircle;
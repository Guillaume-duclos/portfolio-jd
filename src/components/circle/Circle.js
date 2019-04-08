import React, {Component} from 'react';
import {Linear, TimelineMax, TweenMax, Power1} from "gsap";
import '../../utils/DrawSVGPlugin';

class Circle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingAnimationDuration: 3,
      teaserAnimationDuration: 10,
      updateProgress: 0,
      previousProgress: 0
    }
  }

  componentDidMount() {
    this.circleLoadingAnimation();
  }

  componentDidUpdate() {
    TweenMax.killAll();
    this.animationTransition();
  }

  componentWillUnmount() {
    TweenMax.killAll();
  }

  animationTransition = () => {
    if(this.props.loading === true) {
      this.circleLoadingAnimation();
    } else {
      this.circleTeaserAnimation();
    }
  };

  animationCompleted = () => {
    this.props.updateProjectIndex();
  };

  circleLoadingAnimation = () => {
    let circleAnimation = new TimelineMax({
      repeat: -1
    });
    circleAnimation.fromTo(
      this.refs.circle,
      this.state.loadingAnimationDuration,
      {
        drawSVG: this.state.previousProgress + '0% 0%',
        ease: Power1.easeOut
      },
      {
        drawSVG: this.state.updateProgress + '0% 100%',
        ease: Power1.easeOut,
        onComplete: this.animationTransition
      }
    )
  };

  circleTeaserAnimation = () => {
    let circleAnimation = new TimelineMax({
      repeat: -1
    });
    circleAnimation.fromTo(
      this.refs.circle,
      this.state.teaserAnimationDuration,
      {
        drawSVG: "0%",
        ease: Linear.easeOut,
        callbackScope: this
      },
      {
        drawSVG: "100%",
        ease: Linear.easeOut,
        callbackScope: this,
        onComplete: this.animationCompleted
      }
    )
  };

  render() {
    return (
      <svg ref="circleContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <circle ref="circle" cx="-50%" cy="50%" r="50%" fill="none" transform="rotate(270)"/>
      </svg>
    );
  }
}

export default Circle;
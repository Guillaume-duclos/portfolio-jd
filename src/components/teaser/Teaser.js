import React, { Component } from 'react';
import TeaserText from "./TeaserText";
import ProjectCategory from "../project_category/ProjectCategory";
import Circle from '../circle/Circle';

class Teaser extends Component {

  state = {
    circleWidth: null
  };

  componentDidMount() {
    this.setState({circleWidth: this.refs.circle.clientWidth});
    window.addEventListener('resize', this.updateCircleDimension);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCircleDimension);
  }

  updateCircleDimension = () => {
    console.log(this.refs.circle.clientWidth);
    this.setState({circleWidth: this.refs.circle.clientWidth});
  };

  render() {

    /*if (this.props.loading === false) {
      this.setState({style: { display: 'block' }});
    } else {
      this.setState({style: {
          display: 'block',
          transform: `scale(${(this.props.windowWidth / this.state.circleWidth)})`,
          transition: '1s'
        }});
    }*/

    const style = {
      transform: `scale(${(this.props.windowWidth / this.state.circleWidth) + .3})`,
      transition: '.8s'
    };

    return (
      <div
        onClick={this.props.redirectedToContent}
        ref='circle'
        className={`teaser circle ${this.props.animationActive ? 'teaser-illustration-active' : 'teaser-illustration-unactive'}`}
        style={{backgroundImage: this.props.teaserBackground}}>
        <Circle
          progress={this.props.progress}
          loading={this.props.loading}
          updateProjectIndex={this.props.updateProjectIndex}
        />
        <TeaserText teaserText={this.props.teaserText}/>
        <ProjectCategory
          loading={this.props.loading}
          projectIndex={this.props.currentIndex}
          projectCategory={this.props.projectCategory}
        />
        <div className={`teaser-animated-background flex center ${this.props.loading ? 'teaser-animated-background-hidden' : 'teaser-animated-background-visible'}`}>
          <img
            src={this.props.teaserAnimatedBackground}
            alt=""
            style={this.props.teaserAnimatedBackgroundActive ? style : {}}
          />
        </div>
      </div>
    );
  }
}

export default Teaser;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TeaserText from "./TeaserText";
import ProjectCategory from "../project_category/ProjectCategory";
import Circle from '../circle/Circle';

class Teaser extends Component {
  render() {
    return (
      <Link
        to={'/Content/' + this.props.currentIndex}
        id="projectTeaser"
        className="teaser circle"
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
      </Link>
    );
  }
}

export default Teaser;
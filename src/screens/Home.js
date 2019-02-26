import React, { Component } from 'react';
import Container from '../components/container/Container';
import Teaser from '../components/teaser/Teaser';
import axios from "axios/index";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teaserDatas: [],
      loading: true,
      projectNumber: 0,
      animationActive: true,
      teaserAnimatedBackgroundActive: false,
      windowWidth: null
    }
  }

  componentDidMount() {
    this.setState({
      teaserAnimatedBackgroundActive: false,
      windowWidth: window.innerWidth
    });
    window.addEventListener('resize', this.updateWindowDimension);
    axios.get('https://guillaumeduclos.fr/jd-portfolio/wp-json/wp/v2/posts')
      .then(response => {
        this.setState({
          teaserDatas: response.data,
          projectNumber: response.data.length,
          loading: false,
          currentIndex: 0,
          teaserBackground: 'url(' + response.data[0].acf.project_illustration.url + ')',
          teaserAnimatedBackground: response.data[0].acf.project_illustration.url,
          teaserText: response.data[0].acf.project_text.url,
          projectCategory: response.data[0].acf.project_category
        });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.responderEnd);
        }
      });
  }

  updateWindowDimension = () => {
    this.setState({ windowWidth: window.innerWidth});
  };

  updateProjectIndex = () => {
    if (this.state.loading === false) {
      this.setState(function ({currentIndex}) {
        const nextIndex = ++ currentIndex % this.state.teaserDatas.length;
        return {currentIndex: nextIndex};
      });
      this.setState({
        teaserBackground: 'url(' + this.state.teaserDatas[this.state.currentIndex].acf.project_illustration.url + ')',
        teaserAnimatedBackground: this.state.teaserDatas[this.state.currentIndex].acf.project_illustration.url,
        teaserText: this.state.teaserDatas[this.state.currentIndex].acf.project_text.url,
        projectCategory: this.state.teaserDatas[this.state.currentIndex].acf.project_category
      });
    }

    this.setState({animationActive: !this.state.animationActive});
  };

  redirectedToContent = () => {
    this.setState({teaserAnimatedBackgroundActive: true});
    setTimeout(() => {
      this.props.history.push(`/Content/${this.state.currentIndex}`);
    }, 1000);
  };

  render() {
    return (
      <div className="home">
        <Container page="home" currentIndex={this.state.currentIndex} projectNumber={this.state.projectNumber}>
          <Teaser
            currentIndex={this.state.currentIndex}
            loading={this.state.loading}
            teaserBackground={this.state.teaserBackground}
            teaserAnimatedBackground={this.state.teaserAnimatedBackground}
            progress={this.state.progress}
            teaserText={this.state.teaserText}
            projectCategory={this.state.projectCategory}
            updateProjectIndex={this.updateProjectIndex}
            animationActive={this.state.animationActive}
            redirectedToContent={this.redirectedToContent}
            teaserAnimatedBackgroundActive={this.state.teaserAnimatedBackgroundActive}
            windowWidth={this.state.windowWidth}
          />
        </Container>
      </div>
    );
  }
}

export default Home;
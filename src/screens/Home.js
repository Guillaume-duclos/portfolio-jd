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
      projectNumber: 0
    }
  }

  componentDidMount() {
    axios.get('https://guillaumeduclos.fr/jd-portfolio/wp-json/wp/v2/posts')
      .then(response => {
        this.setState({
          teaserDatas: response.data,
          projectNumber: response.data.length,
          loading: false,
          currentIndex: 0,
          teaserBackground: 'url(' + response.data[0].acf.project_illustration.url + ')',
          teaserText: response.data[0].acf.project_text.url,
          projectCategory: response.data[0].acf.project_category
        });
      })
      .catch(error => {
        if(error.response) {
          console.log(error.responderEnd);
        }
      });
  }

  updateProjectIndex = () => {
    if(this.state.loading === false) {
      this.setState(function ({currentIndex}) {
        const nextIndex = ++ currentIndex % this.state.teaserDatas.length;
        return {currentIndex: nextIndex};
      });
      this.setState({
        teaserBackground: 'url(' + this.state.teaserDatas[this.state.currentIndex].acf.project_illustration.url + ')',
        teaserText: this.state.teaserDatas[this.state.currentIndex].acf.project_text.url,
        projectCategory: this.state.teaserDatas[this.state.currentIndex].acf.project_category
      });
    }
  };

  render() {
    return (
      <div className="home">
        <Container page="home" currentIndex={this.state.currentIndex} projectNumber={this.state.projectNumber}>
          <Teaser
            currentIndex={this.state.currentIndex}
            loading={this.state.loading}
            teaserBackground={this.state.teaserBackground}
            progress={this.state.progress}
            teaserText={this.state.teaserText}
            projectCategory={this.state.projectCategory}
            updateProjectIndex={this.updateProjectIndex}
          />
        </Container>
      </div>
    );
  }
}

export default Home;
import React, { Component } from 'react';
import Container from "../components/container/Container";
import axios from "axios/index";
import ProjectCategory from "../components/project_category/ProjectCategory";
import Footer from '../components/footer/Footer';
import gifLoadingContent from '../assets/gifs/gif-loading-content.gif';
import Loader from '../components/loader/Loader';
import ScrollAnimation from 'react-animate-on-scroll';

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectIndex: this.props.match.params.index,
      data: [],
      projectIllustration: null,
      projectCategory: null,
      projectNumber: null,
      loading: true,
      loadingData: true
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (!this.state.loading) {
      this.refs.desc.innerHTML = this.state.data.project_description;
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      loading: true,
      projectIndex: newProps.match.params.index
    });
    this.getData();
  }

  setLoadingTime = () => {
    setTimeout(() => {
      if (!this.state.loadingData) {
        this.setState({loading: false});
      }
    }, 3000);
  };

  getData = () => {
    axios.get('https://guillaumeduclos.fr/jd-portfolio/wp-json/wp/v2/posts')
      .then(response => {
        this.setState({
          data: response.data[this.state.projectIndex].acf,
          projectIllustration: response.data[this.state.projectIndex].acf.project_content_illustration.url,
          projectCategory: response.data[this.state.projectIndex].acf.project_category,
          projectNumber: response.data.length,
          loadingData: false
        });
        this.setLoadingTime();
      })
      .catch(error => {
        if (error.response) {
          console.log(error.responderEnd);
        }
      });
  };

  renderStrats = () => {
    let strats = [];
    for (let i = 0; i < this.state.data.strats_contents.length; i++) {
      if (this.state.data.strats_contents[i].description === "full-width") {
        strats.push(
          <ScrollAnimation animateOnce animateIn="fadeIn" key={i}>
           <img src={this.state.data.strats_contents[i].url} className="strat-full-width" alt="" key={i}/>
          </ScrollAnimation>
        );
      } else {
        strats.push(
          <ScrollAnimation animateOnce animateIn="fadeIn" key={i}>
           <img src={this.state.data.strats_contents[i].url} alt="" key={i}/>
          </ScrollAnimation>
        );
      }
    }
    return strats;
  };

  render() {
    if (this.state.loading) {
      return (
        <Loader gif={gifLoadingContent}/>
      );
    } else {
      return (
        <div className="content">
          <Container currentIndex={this.props.match.params.index}>
            <div className="project-header">
              <img src={this.state.projectIllustration} alt=""/>
              <ProjectCategory
                loading={this.state.loading}
                projectIndex={this.props.match.params.index}
                projectCategory={this.state.projectCategory}
              />
            </div>
            <h1 className="project-title text-center upper">{this.state.data.project_title}</h1>
            <div ref="desc" className="project-description"/>
            <div className="project-strats">
              {this.renderStrats()}
            </div>
            <Footer projectIndex={this.props.match.params.index} projectNumber={this.state.projectNumber}/>
          </Container>
        </div>
      );
    }
  }
}

export default Content;
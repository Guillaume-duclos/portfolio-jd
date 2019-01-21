import React, { Component } from 'react';
import Container from "../components/container/Container";
import axios from "axios/index";
import ProjectCategory from "../components/project_category/ProjectCategory";
import Footer from '../components/footer/Footer';
import gifLoadingContent from '../assets/gifs/gif-loading-content.gif';
import Loader from '../components/loader/Loader';

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectIndex: this.props.match.params.index,
      datas: [],
      projectIllustration: null,
      projectCategory: null,
      projectNumber: null,
      loading: true
    }
  }

  componentDidMount() {
    this.getDatas();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      loading: true,
      projectIndex: newProps.match.params.index
    });
    this.getDatas();
  }

  getDatas = () => {
    axios.get('https://guillaumeduclos.fr/jd-portfolio/wp-json/wp/v2/posts')
      .then(response => {
        this.setState({
          datas: response.data[this.state.projectIndex].acf,
          projectIllustration: response.data[this.state.projectIndex].acf.project_content_illustration.url,
          projectCategory: response.data[this.state.projectIndex].acf.project_category,
          projectNumber: response.data.length,
          loading: false
        });
      })
      .catch(error => {
        if(error.response) {
          console.log(error.responderEnd);
        }
      });
  };

  render() {

    let html = "<p>Un text</p>";
    let div = document.createElement("div");
    div.innerHTML = html;
    let text = div.textContent || div.innerText || "";
    console.log(text);

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
            <h1 className="project-title text-center upper">{this.state.datas.project_title}</h1>
            <div className="project-description">
              {this.state.datas.project_description}
            </div>
            <Footer projectIndex={this.props.match.params.index} projectNumber={this.state.projectNumber}/>
          </Container>
        </div>
      );
    }
  }
}

export default Content;
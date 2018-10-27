import React, { Component } from 'react';
import Container from "../components/container/Container";
import axios from "axios/index";
import ProjectCategory from "../components/project_category/ProjectCategory";
import Footer from '../components/footer/Footer';

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectIndex: this.props.match.params.index,
      datas: [],
      projectIllustration: null,
      projectCategory: null,
      loading: true
    }
  }

  componentDidMount() {
    axios.get('https://guillaumeduclos.fr/jd-portfolio/wp-json/wp/v2/posts')
      .then(response => {
        this.setState({
          datas: response.data,
          projectIllustration: response.data[this.state.projectIndex].acf.project_content_illustration.url,
          projectCategory: response.data[this.state.projectIndex].acf.project_category,
          loading: false
        });
      })
      .catch(error => {
        if(error.response) {
          console.log(error.responderEnd);
        }
      });
  }

  render() {

    console.log(this.state.projectIndex);

    if(this.state.loading === false ) {
      console.log(this.state.datas[this.props.match.params.index]);
      console.log(this.state.projectIllustration);
    }

    return (
      <div className="content">
        <Container currentIndex={this.props.match.params.index}>
          <div className="projectHeader">
            <img src={this.state.projectIllustration} alt=""/>
            <ProjectCategory
              loading={this.state.loading}
              projectIndex={this.props.match.params.index++}
              projectCategory={this.state.projectCategory}
            />
          </div>
          <Footer projectIndex={this.props.match.params.index}/>
        </Container>
      </div>
    );
  }
}

export default Content;
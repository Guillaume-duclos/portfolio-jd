import React, { Component } from 'react';
import Container from "../components/container/Container";
import Teaser from "../components/404";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <Container>
          <Teaser/>
        </Container>
      </div>
    );
  }
}

export default NotFound;
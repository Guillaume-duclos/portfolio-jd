import React, { Component } from 'react';
import Container from "../components/container/Container";
import ContactForm from "../components/contact_form/ContactForm";

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <Container contactThrough={true}>
          <ContactForm/>
        </Container>
      </div>
    );
  }
}

export default Contact;
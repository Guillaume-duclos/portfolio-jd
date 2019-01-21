import React, { Component } from 'react';
import axios from "axios/index";
import gifLoadingContactPage from '../../assets/gifs/gif-loading-contact.gif';
import gifLoadingSendingMessage from '../../assets/gifs/gif-sending-message.gif';
import Loader from '../loader/Loader';

class ContactForm extends Component {

  state = {
    emailActive: false,
    textareaActive: false,
    emailPlaceholder: 'E-mail',
    messagePlaceholder: 'Message',
    emailValue: '',
    messageValue: '',
    contactContent: [],
    count: 0,
    imageIllustrationOne: '',
    imageIllustrationTwo: '',
    imageIllustrationThree: '',
    imageIllustrationFour: '',
    loading: true,
    messageSending: false
  };

  componentDidMount() {
    axios.get('https://guillaumeduclos.fr/jd-portfolio/wp-json/wp/v2/pages')
      .then(response => {
        this.setState({
          imageIllustrationOne:   response.data[0].acf.images[0].url,
          imageIllustrationTwo:   response.data[0].acf.images[1].url,
          imageIllustrationThree: response.data[0].acf.images[2].url,
          imageIllustrationFour:  response.data[0].acf.images[3].url,
          loading: false
        });
      })
      .catch(error => {
        if(error.response) {
          console.log(error.responderEnd);
        }
      });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if(this.refs.emailField && !this.refs.emailField.contains(event.target) && this.refs.messageField && !this.refs.messageField.contains(event.target)) {
      this.setState({
        emailActive: false,
        textareaActive: false,
        emailPlaceholder: 'E-mail',
        messagePlaceholder: 'Message'
      });
    }
  };

  activeField = (e, fieldType) => {
    this.setState({
      emailActive: false,
      textareaActive: false,
      emailPlaceholder: 'E-mail',
      messagePlaceholder: 'Message'
    });

    if(fieldType === 'emailField') {
      this.setState({
        emailActive: true,
        emailPlaceholder: 'Type e-mail adress'
      });
    } else if(fieldType === 'messageField') {
      this.setState({
        textareaActive: true,
        messagePlaceholder: 'Type your message'
      });
    }
  };

  getFieldValue = (e, fieldType) => {
    if(fieldType === 'emailField') {
      e.preventDefault();
      this.setState({emailValue: e.target.value});
    } else if(fieldType === 'messageField') {
      e.preventDefault();
      this.setState({messageValue: e.target.value});
    }
  };

  sendMail = (e) => {
    if(this.state.emailValue !== '' && this.state.messageValue !== '' && this.refs.emailField.validity.valid !== false && this.refs.messageField.validity.valid !== false) {

      e.preventDefault();

      axios.defaults.headers.post['Content-Type'] = 'application/json';

      axios.post('https://www.enformed.io/vaihyuml/', {
        email: this.state.emailValue,
        message: this.state.messageValue
      })
        .then(response => this.setState({messageSending: false}))
        .catch(error => console.log('Sending mail error'));

      this.setState({messageSending: true});

    } else {
      console.log('ERROR');
    }
  };

  render() {
    let emailClassName = 'inputInactive';
    let textareaClassName = 'inputInactive';

    if(this.state.emailActive === true) {
      emailClassName = 'inputActive';
    }

    if(this.state.textareaActive === true) {
      textareaClassName = 'inputActive';
    }

    if(this.state.messageSending === true) {
      return(
        <Loader gif={gifLoadingSendingMessage}/>
      );
    } else if(this.state.loading === true) {
      return(
        <Loader gif={gifLoadingContactPage}/>
      );
    } else {
      return (
        <div className="contact-container">

          <div className="contact-illustration-container">

            <div className="contact-text">
              <h1 className="upper">Hello !</h1>
              <p>Hi I’m Jeanne Duplessis.</p>
              <p>I’m currently in fifth year at ECV Digital Nantes and working in Rennes at Addviso.</p>

              <img className="contactIllustrationOne" src={this.state.imageIllustrationOne} alt=""/>
              <img className="contactIllustrationTwo" src={this.state.imageIllustrationTwo} alt=""/>
              <img className="contactIllustrationThree" src={this.state.imageIllustrationThree} alt=""/>
              <img className="contactIllustrationFour" src={this.state.imageIllustrationFour} alt=""/>
            </div>

          </div>

          <div className="form-container">
            <p>Download my CV <a href="../../files/Jeanne-Duplessis-CV-en.pdf" target="_blank">EN</a> / <a href="../../files/Jeanne-Duplessis-CV-fr.pdf" target="_blank">FR</a></p>
            <form>
              <input
                ref="emailField"
                type="email"
                placeholder={this.state.emailPlaceholder}
                className={emailClassName}
                onClick={(e) => this.activeField(e, 'emailField')}
                onChange={(e) => this.getFieldValue(e, 'emailField')}
                required="true"
              />
              <textarea
                ref="messageField"
                placeholder={this.state.messagePlaceholder}
                className={textareaClassName}
                onClick={(e) => this.activeField(e, 'messageField')}
                onChange={(e) => this.getFieldValue(e, 'messageField')}
                required="true"
              />
              <input type="submit" value="SEND" onClick={this.sendMail}/>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default ContactForm;
import React, { Component } from 'react';
import Container from "../components/container/Container";
import axios from "axios";
import gifLoadingSendingMessage from "../assets/gifs/gif-sending-message.gif";
import gifLoadingContactPage from "../assets/gifs/gif-loading-contact.gif";
import Loader from '../components/loader/Loader';

class Contact extends Component {

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
    loadingData: true,
    messageSending: false,
    messageSent: false
  };

  componentDidMount() {
    axios.get('https://guillaumeduclos.fr/jd-portfolio/wp-json/wp/v2/pages')
      .then(response => {
        this.setState({
          presentationTitle: response.data[0].acf.presentation_title,
          presentationText: response.data[0].acf.presentation_text,
          imageIllustrationOne: response.data[0].acf.images[0].url,
          imageIllustrationTwo: response.data[0].acf.images[1].url,
          imageIllustrationThree: response.data[0].acf.images[2].url,
          imageIllustrationFour: response.data[0].acf.images[3].url,
          cvEnLink: response.data[0].acf.cv_en,
          cvFrLink: response.data[0].acf.cv_fr,
          loadingData: false
        });
        this.setLoadingTime();
      })
      .catch(error => {
        if (error.response) {
          console.log(error.responderEnd);
        }
      });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate() {
    if (!this.state.loading && !this.state.messageSending) {
      this.refs.desc.innerHTML = this.state.presentationText;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setLoadingTime = () => {
    setTimeout(() => {
      if (!this.state.loadingData) {
        this.setState({loading: false});
      }
    }, 3000);
  };

  handleClickOutside = (event) => {
    if (this.refs.emailField && !this.refs.emailField.contains(event.target) && this.refs.messageField && !this.refs.messageField.contains(event.target)) {
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

    if (fieldType === 'emailField') {
      this.setState({
        emailActive: true,
        emailPlaceholder: 'Type e-mail adress'
      });
    } else if (fieldType === 'messageField') {
      this.setState({
        textareaActive: true,
        messagePlaceholder: 'Type your message'
      });
    }
  };

  getFieldValue = (e, fieldType) => {
    if (fieldType === 'emailField') {
      e.preventDefault();
      this.setState({emailValue: e.target.value});
    } else if (fieldType === 'messageField') {
      e.preventDefault();
      this.setState({messageValue: e.target.value});
    }
  };

  sendMail = (e) => {
    if (this.state.emailValue !== '' && this.state.messageValue !== '' && this.refs.emailField.validity.valid !== false && this.refs.messageField.validity.valid !== false) {
      e.preventDefault();
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.post('https://www.enformed.io/ltv1em6e/', {
        email: this.state.emailValue,
        message: this.state.messageValue
      })
      .then(response => this.setState({
        messageSending: false,
        messageSent: true
      }))
      .catch(error => console.log('Sending mail error'));
      this.setState({
        messageSending: true,
        messageSent: false
      });
    } else {
      console.log('ERROR');
    }
  };

  renderPopinMessage = () => {
    if (this.state.messageSent) {
      setTimeout(function () {
        return (
          <div ref="messagePopin" className="popin-message-send">
            <p>Votre message a bien été envoyé</p>
          </div>
        )
      }, 2000);
    }
  };

  render() {

    console.log(this.state.messageSent);

    let emailClassName = 'inputInactive';
    let textareaClassName = 'inputInactive';

    if (this.state.emailActive === true) {
      emailClassName = 'inputActive';
    }

    if (this.state.textareaActive === true) {
      textareaClassName = 'inputActive';
    }

    if (this.state.messageSending === true) {
      return (
        <Loader gif={gifLoadingSendingMessage}/>
      );
    } else if (this.state.loading === true) {
      return (
        <Loader gif={gifLoadingContactPage}/>
      );
    } else {
      return (
        <div className="contact">
          <Container contactThrough={true}>

            {this.renderPopinMessage()}

            <div className="contact-container">

              <div className="contact-illustration-container">

                <div className="contact-text">
                  <h1 className="upper">{this.state.presentationTitle}</h1>
                  <div ref="desc"/>
                  <img className="contactIllustrationOne" src={this.state.imageIllustrationOne} alt=""/>
                  <img className="contactIllustrationTwo" src={this.state.imageIllustrationTwo} alt=""/>
                  <img className="contactIllustrationThree" src={this.state.imageIllustrationThree} alt=""/>
                  <img className="contactIllustrationFour" src={this.state.imageIllustrationFour} alt=""/>
                </div>

              </div>

              <div className="form-container">
                <div className="contact-link-rs-1">
                  <p>
                    <a href="https://www.behance.net/jeanneduplessis" target="_blank" className="clickable">Behance</a>
                    <a href="https://www.linkedin.com/in/jeanneduplessis/" target="_blank" className="clickable">Linkedin</a>
                  </p>
                  <p>
                    <a href={this.state.cvFrLink} target="_blank" className="clickable">CV FR</a>
                    <a href={this.state.cvEnLink} target="_blank" className="clickable">CV EN</a>
                  </p>
                </div>
                <form>
                  <input
                    ref="emailField"
                    type="email"
                    placeholder={this.state.emailPlaceholder}
                    className={`${emailClassName} clickable`}
                    onClick={(e) => this.activeField(e, 'emailField')}
                    onChange={(e) => this.getFieldValue(e, 'emailField')}
                    required="true"
                  />
                  <textarea
                    ref="messageField"
                    placeholder={this.state.messagePlaceholder}
                    className={`${textareaClassName} clickable`}
                    onClick={(e) => this.activeField(e, 'messageField')}
                    onChange={(e) => this.getFieldValue(e, 'messageField')}
                    required="true"
                  />
                  <input className="clickable" type="submit" value="SEND" onClick={this.sendMail}/>
                </form>
              </div>
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default Contact;
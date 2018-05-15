import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { setContactStatus, setContactValues, setContactFocus } from '../modules/appState';
// import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: '1 1',
    overflowY: 'auto'
  },
  form: {
    width: '70%',
    marginLeft: '5%',
    marginTop: '3%',
    color: 'white',
    fontSize: '14px'
  }, 
  formItem: {
    margin: '10px'
  },
  label: {
    display: 'block'
  },
  input: {
    width: '80%',
    minWidth: '200px',
    maxWidth: '300px',
    "&:invalid": {
      border: "1px solid red"
    }
  },
  textarea: {
    height: "30%",
    minHeight: "80px"
  },
  instructions: {
    fontSize: '12px'
  }
});

const mapStateToProps = state => {
  return {
    contactValues: state.app.contactValues, 
    contactStatus: state.app.contactStatus,
    contactFocus: state.app.contactFocus
  };
}; 

const mapDispatchToProps = dispatch => {
  return {
    setContactValues: setContactValues(dispatch),
    setContactStatus: setContactStatus(dispatch),
    setContactFocus: setContactFocus(dispatch)
  };
};

const url = "https://mp37166x6b.execute-api.us-east-1.amazonaws.com/prod";
const STATUS_SUCCESS = "Lähetys onnistui.";
const STATUS_FAIL = "Jokin meni pieleen. Voit yrittää uudestaan.";

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fillRequired: ''
    }
    this.saveValues.bind(this)
    this.saveFocus.bind(this)
  }

  componentDidMount() {
    const { contactFocus } = this.props;

    if (contactFocus && this.refs && this.refs[contactFocus]) {
      this.refs[contactFocus].focus();
    }
  }

  saveValues() {
    const { setContactValues } = this.props;
    let { name, email, numbers, message } = this.refs;

    setContactValues([name.value, email.value, numbers.value, message.value])
  }

  saveFocus(name) {
    const { setContactFocus } = this.props;
    
    setContactFocus(name)
  }

  createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);

    } else if (typeof XDomainRequest !== "undefined") {
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);

    } else {
      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }
    return xhr;
  }

  post (e) {
    e.preventDefault();

    const { setContactStatus } = this.props;
    let { name, email, numbers, message } = this.refs;

    name = name.value
    email = email.value
    numbers = numbers.value
    message = message.value

    if (name.length > 2 && email.length > 7 && message.length > 3) {
      var xhr = this.createCORSRequest('POST', url);

      if (!xhr) {
        throw new Error('CORS not supported');

      } else {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response.result === "Success.") {
              setContactStatus(STATUS_SUCCESS);
              setContactValues(['', '', '', ''])

            } else {
              setContactStatus(STATUS_FAIL);
            }

          } else {
            setContactStatus(STATUS_FAIL);
          }
        };
        xhr.send(JSON.stringify({ 
          name,
          email,
          numbers,
          message
        }));
      }
      this.setState(() => ({ fillRequired: '' }))
    } else {
      this.setState(() => ({ fillRequired: 'Ole hyvä ja täytä kaikki pakolliset kentät!' }))
    }
  }

  render() {
    const { classes, contactValues, contactStatus } = this.props;

    return (
      <div className={classes.root} onClick={(e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          this.saveFocus('')
        }
      }}>
        <form className={classes.form} >
          <div className={classes.formItem}>
            <h3>Ota yhteyttä</h3>
          </div>
          <div className={classes.formItem}>
            <label htmlFor="name" className={classes.label}>Nimi *</label>
            <input id="name" ref="name" className={classes.input} required={true} minLength="3" defaultValue={contactValues[0]} onBlur={() => {this.saveValues()}} onFocus={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.saveFocus('name')
          }} />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="email" className={classes.label}>Sähköposti *</label>
            <input id="email" ref="email" className={classes.input} type="email" required={true} minLength="8" defaultValue={contactValues[1]} onBlur={() => { this.saveValues() }} onFocus={(e) => {
              e.stopPropagation();
              e.preventDefault();
              this.saveFocus('email')
            }} />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="numbers" className={classes.label}>Teosnumerot joita asia koskee</label>
            <input id="numbers" ref="numbers" className={classes.input} defaultValue={contactValues[2]} onBlur={() => { this.saveValues() }} onFocus={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.saveFocus('numbers')
            }} />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="message" className={classes.label}>Viesti *</label>
            <textarea id="message" className={[classes.textarea, classes.input].join(" ")} ref="message" required={true} minLength="4" defaultValue={contactValues[3]} onBlur={() => { this.saveValues() }} onFocus={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.saveFocus('message')
            }} ></textarea>
            <p className={classes.instructions}>* Pakolliset kentät</p>
          </div>
          {!contactStatus && <div className={classes.formItem}>
            <button id="submit" onClick={(e) => {
              this.post(e)
            }}>Lähetä</button>
          </div> }
          <div className={classes.formItem} id="form-response">
            {contactStatus && (<div>{contactStatus}</div>)}
            {this.state.fillRequired && (<div>{this.state.fillRequired}</div>)}
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Contact));
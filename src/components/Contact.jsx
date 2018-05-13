import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
// import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: '1 1'
  },
  form: {
    width: '70%',
    marginLeft: '10%',
    marginTop: '10%',
    color: 'white'
  }, 
  formItem: {
    margin: '10px'
  },
  label: {
    display: 'block'
  },
  input: {
    width: '50%',
    minWidth: '200px',
    "&:invalid": {
      border: "1px solid red"
    }
  },
  textarea: {
    height: "30%",
    minHeight: "100px"
  },
  instructions: {
    fontSize: '12px'
  }
});

const mapStateToProps = state => {
  return {
  };
}; 

const mapDispatchToProps = dispatch => {
  return {};
};

const url = "https://mp37166x6b.execute-api.us-east-1.amazonaws.com/prod";

class InfoSheet extends Component {

  constructor(props) {
    super(props);

    this.state = {
      success: undefined,
      fillRequired: ''
    }
  }

  componentDidMount() {
    this.refs.name.focus();
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
            console.log("response: ", response);

            if (response.result === "Success.") {
              this.setState(() => ({ success: true }))
            } else {
              this.setState(() => ({ success: false }))
            }

          } else {
            this.setState(() => ({ success: false }))
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
    const { classes } = this.props;

    let status = '';

    if (this.state.success) {
      status = "Lähetys onnistui.";
    } else if (this.state.success === false) {
      status = "Jokin meni pieleen. Voit yrittää uudestaan.";
    }
    
    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <div className={classes.formItem}>
            <h2>Ota yhteyttä</h2>
          </div>
          <div className={classes.formItem}>
            <label htmlFor="name" className={classes.label}>Nimi *</label>
            <input id="name" ref="name" className={classes.input} required={true} minLength="3" />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="email" className={classes.label}>Sähköposti *</label>
            <input id="email" ref="email" className={classes.input} type="email" required={true} minLength="8" />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="numbers" className={classes.label}>Teosnumerot joita asia koskee</label>
            <input id="numbers" ref="numbers" className={classes.input} />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="message" className={classes.label}>Viesti *</label>
            <textarea id="message" className={[classes.textarea, classes.input].join(" ")} ref="message" required={true} minLength="4"></textarea>
            <p className={classes.instructions}>* Pakolliset kentät</p>
          </div>
          { !this.state.success && <div className={classes.formItem}>
            <button id="submit" onClick={(e) => {
              this.post(e)
            }}>Lähetä</button>
          </div> }
          <div className={classes.formItem} id="form-response"><br />{status}<br />{this.state.fillRequired}</div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoSheet));
import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
// import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
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

  createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

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

    const { refs } = this.props;

    var xhr = this.createCORSRequest('POST', url);

    if (!xhr) {
      throw new Error('CORS not supported');

    } else {
      console.log(refs);
  
      // var xhr = new XMLHttpRequest();   // new HttpRequest instance 
      // xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({ 
        name: "Makke",
        email: "makkeruottu@gmail.com",
        message: "Test 1"
      }));
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" ref="name" />
          <label htmlFor="email">Email</label>
          <input id="email" ref="email" />
          <label htmlFor="message">Message</label>
          <textarea id="message" ref="message"></textarea>
          <button id="submit" onClick={(e) => {
            this.post(e)
          }}>Submit</button>
        </form>
        <div id="form-response"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoSheet));
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import InfoOutline from 'material-ui-icons/InfoOutline';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

import { toggleInfoSheet, toggleInfoSheet2, INFOSHEET } from '../modules/appState';

const styles = {
  infoButton: {
    top: 0,
    verticalAlign: 'top',
    marginRight: '-40px',
  }
};

const mapStateToProps = state => {
  return {
    open: state.app.infoSheetOpen,
  };
}; 

const mapDispatchToProps = dispatch => {
  return {
    toggleInfoSheet: () => dispatch({
      type: INFOSHEET
    })
  }
};

// Version 2, not used
const mapDispatchToProps2 = dispatch => bindActionCreators({
  toggleInfoSheet: toggleInfoSheet2
}, dispatch);

// Version 3, not used
const mapDispatchToProps3 = dispatch => {
  const func = toggleInfoSheet;
  return {
    toggleInfoSheet: () => func(dispatch)
  };
};

class InfoSheet extends Component {

  render() {
    const { classes, data, open, toggleInfoSheet } = this.props;
    console.log("data: ", data);
    console.log("open: ", open);
    
    return (
      <IconButton className={classes.infoButton} color="primary" aria-label="Menu" onClick={toggleInfoSheet}>
        <InfoOutline />
      </IconButton>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoSheet));
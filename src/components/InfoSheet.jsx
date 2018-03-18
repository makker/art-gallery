import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import IconButton from 'material-ui/IconButton';
import InfoOutline from 'material-ui-icons/InfoOutline';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import InfoRow from './InfoRow';
//import { INFOSHEET, toggleInfoSheet, toggleInfoSheet2 } from '../modules/appState';
import { toggleInfoSheet } from '../modules/appState';
import { removeQueryStrings, setQueryStrings } from '../modules/utils';

const styles = {
  root: {
    top: 0,
    verticalAlign: 'top',
    marginRight: '-40px',
    marginLeft: '6%',
  },
  sheetOpen: {
    marginRight: 0,
    minWidth: "160px",
  },
  infoButton: {
  },
  sheet: {
    color: 'white',
    margin: '0 10px',
  },
  rows: {
    width: 'auto',
  },
};

const mapStateToProps = state => {
  return {
    open: state.app.infoSheetOpen,
    path: state.router.pathname,
  };
}; 

const mapDispatchToProps = dispatch => {
  return {
    toggleInfoSheet: toggleInfoSheet(dispatch),
    /*
    toggleInfoSheet: () => dispatch({
      type: INFOSHEET
    }) */
  }
};

/*
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
}; */

class InfoSheet extends Component {

  render() {
    const { classes, data, open, toggleInfoSheet, history } = this.props;

    let rootClasses = classes.root;
    let sheet = null;

    function changeOpen(open) {
      toggleInfoSheet(open);

      const search = "?" + (
        (open) ?
          setQueryStrings({ info: 1 }, true) :
          removeQueryStrings(["info"], true)
      );

      history.push({ search: search });
    }
    
    if (open) {
      rootClasses += " " + classes.sheetOpen;
      sheet = (
        <Grid item className={classes.sheet}>
          <Grid container spacing={0} cols="1" direction="column" className={classes.rows}>
            {
              Object.keys(data).map((key) => (
                <InfoRow key={key} id={key} value={data[key]} />
              ))
            }
          </Grid>
          </Grid>);
    }
    
    return (
      <Grid container spacing={0} className={rootClasses} direction="column" cols={1}>
        <Grid item>
          <IconButton className={classes.infoButton} color="primary" aria-label="Menu" onClick={() => changeOpen(!open)}>
          <InfoOutline />
          </IconButton>
        </Grid>
        {sheet}
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(InfoSheet)));
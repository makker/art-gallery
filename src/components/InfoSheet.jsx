import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import InfoRow from './InfoRow';

const styles = theme => ({
  root: {
    top: 0,
    verticalAlign: 'top',
    marginRight: '-40px',
    marginLeft: '6%',
    alignItems: 'flex-start',
  },
  sheetOpen: {
    marginRight: 0,
    minWidth: "160px",
    [theme.breakpoints.up('md')]: {
      minWidth: '180px',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '200px',
    },
    [theme.breakpoints.up('xl')]: {
      minWidth: '220px',
    },
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
});

const mapStateToProps = state => {
  return {
    open: state.app.infoSheetOpen,
    path: state.router.pathname,
  };
}; 

const mapDispatchToProps = dispatch => {
  return {};
};

class InfoSheet extends Component {

  render() {
    const { classes, data, open } = this.props;

    let rootClasses = classes.root;
    let sheet = null;
    
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
        {sheet}
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoSheet));
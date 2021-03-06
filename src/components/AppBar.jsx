import React from 'react';
import { Route, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import ContactMail from 'material-ui-icons/ContactMail';
import ArrowBack from 'material-ui-icons/ArrowBack';
import GridOn from 'material-ui-icons/GridOn';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'static',
  },
  toolbar: {
    minHeight: '40px',
    [theme.breakpoints.up('md')]: {
      minHeight: '64px',
    },
  },
  flex: {
    flex: 1,
  },
  contactButton: {
    width: 'auto',
    marginLeft: 10,
    marginRight: 0,
  },
  gridButton: {
    width: 'auto',
    marginLeft: 20,
    marginRight: 0,
  },
  link: {
    color: 'white',
    fontWeight: 300,
    textDecoration: 'none',
    "&:hover": theme.palette.primary,
  }
});

function SimpleAppBar(props) {
  const { classes, root, query, location } = props;

  return (
    <Grid item id="app-bar">
      <AppBar color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Link to={{pathname: root, search: query }} color="white" className={classes.link}>
                Galleria Haili
            </Link>
          </Typography>
          <Typography color="inherit">
            Kuvaston pyynnöstä teokset jotka ei ole myynnissä on poistettu!
          </Typography>
          <Route path={root +"(|piece)"} render={() => 
            <Link to={{ pathname: root + "contact", search: query, state: { from: location} }}>
              <IconButton className={classes.gridButton} color="primary" aria-label="Contact" alt="Contact">
                <ContactMail alt="Contact" />
              </IconButton>
            </Link>} />
          <Route exact path={root +"contact"} render={() => 
            <Link to={(location.state && location.state.from) || { pathname: root, search: query }}>
              <IconButton className={classes.gridButton} color="primary" aria-label="Back" alt="Back">
                <ArrowBack alt="Back" />
              </IconButton>
            </Link>} />
          <Route path={root +"(piece|contact)"} render={() => 
            <Link to={{ pathname: root, search: query }}>
              <IconButton className={classes.gridButton} color="primary" aria-label="Menu" alt="Menu">
                <GridOn alt="Menu" />
              </IconButton>
            </Link>} />
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    root: state.app.root,
    path: state.router.location.pathname,
    query: state.router.location.search,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SimpleAppBar)));
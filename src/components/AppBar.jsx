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
import GridOn from 'material-ui-icons/GridOn';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'static',
  },
  flex: {
    flex: 1,
  },
  gridButton: {
    marginLeft: 10,
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
  const { classes, query } = props;
  return (
    <Grid item id="app-bar">
      <AppBar color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Link to={{pathname: "/", search: query }} color="white" className={classes.link}>
                Galleria Haili
            </Link>
          </Typography>
          <Route exact path="/piece/:id" render={() => 
            <Link to={{ pathname: "/", search: query }}>
              <IconButton className={classes.gridButton} color="primary" aria-label="Menu">
                <GridOn />
              </IconButton>
            </Link>} />
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    path: state.router.location.pathname,
    query: state.router.location.search,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SimpleAppBar)));
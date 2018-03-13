import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import GridOn from 'material-ui-icons/GridOn';

const styles = {
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
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <Grid item id="app-bar">
      <AppBar color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Link to="/">
            <IconButton className={classes.gridButton} color="primary" aria-label="Menu">
              <GridOn />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}



SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
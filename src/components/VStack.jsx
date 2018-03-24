import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Painting from './Painting';
import PaintingList from './PaintingList';
import Navi from './Navi';
import Filter from './Filter';

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexShrink: 1,
    overflowX: 'hidden',
  },
  contentContainer: {
    flexGrow: 1,
  },
});

const mapStateToProps = state => {
  // This is not really used
  return {
    root: state.app.root,
    ratio: state.app.ratio,
    path: state.router.location.pathname,
    match: state.router.match,
  };
};

const mapDispatchToProps = dispatch => {
  return {}
};

class VStack extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {
  }
  
  render() {
    const { root, classes, ratio } = this.props;

    return (
      <Grid item container spacing={0} direction="column" className={classes.root} wrap="nowrap">
        <Route exact path={root} render={() => <PaintingList direction="both" />} />          {/* GRID */}

        <Route exact path={root + "piece/:id"} render={() => ([
          <Grid container spacing={0} alignContent="space-between" justify="center" key="painting" className={classes.contentContainer} direction="column" wrap="nowrap">
            <Painting />
            <Navi />
          </Grid>, // Painting list when not wide
          (ratio !== "wide") && <PaintingList direction="row" key="list"></PaintingList>
        ])
        } />
        
        { // Painting list when not wide
          (ratio === "vertical") && <Filter ratio={ratio} />
        }
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VStack));
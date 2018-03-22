import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Painting from './Painting';
import PaintingList from './PaintingList';
import Navi from './Navi';

const styles = theme => ({
  middleHors: {
    flexGrow: 1,
    flexShrink: 1,
  },
  middleRight: {
    width: '80%',
    flexGrow: 1,
    flexShrink: 1,
  },
  middleRightContainer: {
    height: '100%',
  },
});

const mapStateToProps = state => {
  // This is not really used
  return {
    root: state.app.root,
    ratio: state.app.ratio,
  };
};

const mapDispatchToProps = dispatch => {
  return {}
};

class Middle extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {
  }
  
  render() {
    const { root, classes, ratio } = this.props;
    const direction = (ratio === "horizontal") ? "row" : "column";

    return (ratio === "horizontal") ? (
      <Grid item container spacing={0} direction={direction} className={classes.middleHors} wrap="nowrap">
        <PaintingList direction="column"></PaintingList>
        <Grid item className={classes.middleRight}>
          <Grid container spacing={0} alignContent="space-between" justify="center" className={classes.middleRightContainer} direction="column" wrap="nowrap">
            <Route path={root +"piece/:id"} component={Painting} />
            <Navi />
          </Grid>
        </Grid>
      </Grid>
    ) : (
      <Route path={root +"piece/:id"} component={Painting} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Middle));
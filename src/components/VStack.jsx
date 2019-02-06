import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Hammer from 'hammerjs';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Painting from './Painting';
import Navi from './Navi';

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexShrink: 1,
    overflowX: 'hidden',
  },
  rootFs: {
    position: 'absolute',
    height: '100%',
    overflowY: 'hidden',
  },
  contentContainer: {
    flexGrow: 1,
  },
});

const mapStateToProps = state => {
  // This is not really used
  return {
    root: state.app.root,
    path: state.router.location.pathname,
    match: state.router.match,
    fullscreenOn: state.app.fullscreenOn,
  };
};

const mapDispatchToProps = dispatch => {
  return {}
};

class VStack extends Component {
  
  getPaintingHammer = () => {
    return this.hammertime;
  };

  componentDidMount() {
    const myOptions = {};
    this.hammertime = new Hammer(ReactDOM.findDOMNode(this), myOptions);
  }

  componentDidUpdate() {
  }
  
  render() {
    const { children, root, classes, fullscreenOn } = this.props;

    const rootClasses = [classes.root];
    if (fullscreenOn) rootClasses.push(classes.rootFs);

    return (
      <Grid item container spacing={0} direction="column" className={rootClasses.join(" ")} wrap="nowrap">
        <Route exact path={root + "piece/:id"} render={() => ([
          <Grid id="painting-cont" container spacing={0} alignContent="space-between" justify="center" key="painting" className={classes.contentContainer} direction="column" wrap="nowrap">
            <Painting />
            <Navi getPaintingHammer={this.getPaintingHammer} />
          </Grid>, // Painting list when not wide
        ])
        } />
        { children }
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VStack));
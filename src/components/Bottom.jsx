import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Filter from './Filter';
import Navi from './Navi';
import PaintingList from './PaintingList';
import { BOTTOM_HEIGHT } from '../modules/appState';

const styles = theme => ({
  bottomVert: {
    flex: '0 0 auto',
    flexWrap: 'nowrap',
    // alignSelf: 'flex-end',
  }
});

const mapStateToProps = state => {
  // This is not really used
  return {
    root: state.app.root,
    ratio: state.app.ratio,
    location: state.router.location,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBottomHeight: (height) => {
      dispatch({
        type: BOTTOM_HEIGHT, 
        height: height,
      })
    }
  };
};

class Bottom extends Component {

  componentDidMount() {
    const {setBottomHeight} = this.props;
    setBottomHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  componentDidUpdate() {
    const {setBottomHeight} = this.props;
    setBottomHeight(ReactDOM.findDOMNode(this).clientHeight);
  }
  
  render() {
    const { root, classes, ratio } = this.props;

    return ((ratio === "wide") ? (
      <Grid item container direction="row" spacing={0} className={classes.bottomVert} id="bottom">
        <Filter></Filter>
        <Route exact path={root +"piece/:id"} render={() => <PaintingList direction="row" />} />
      </Grid>
    ) : (ratio === "horizontal") ? (
      <Grid item id="bottom">
        <Filter></Filter>
      </Grid>
    ) : (
      <Grid item container direction="column" spacing={0} className={classes.bottomVert} id="bottom">
        <Route exact path={root +"piece/:id"} component={Navi} />
        <Route exact path={root +"piece/:id"} render={() => <PaintingList direction="row" />} />
        <Filter></Filter>
      </Grid>
    ));
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Bottom));
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Footer from './Footer';
import Navi from './Navi';
import PaintingList from './PaintingList';
import { BOTTOM_HEIGHT } from '../modules/appState';

const styles = theme => ({
  bottomVert: {
    flex: '1 0 auto',
    flexWrap: 'nowrap',
    // alignSelf: 'flex-end',
  }
});

const mapStateToProps = state => {
  // This is not really used
  return {
    ratio: state.app.ratio,
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
    const { classes, ratio } = this.props;

    return ((ratio === "horizontal") ? (
      <Grid item id="bottom">
        <Footer></Footer>
      </Grid>
    ) : (
        <Grid item container direction="column" spacing={0} className={classes.bottomVert} id="bottom">
          <Navi />
          <Route path="/piece" render={() => <PaintingList direction="row" />} />
          <Footer></Footer>
        </Grid>
      )
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Bottom));
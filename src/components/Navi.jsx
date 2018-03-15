import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import NavigateNext from 'material-ui-icons/NavigateNext';

import { setActivePiece, NAVI_HEIGHT } from '../modules/appState';

const styles = theme => ({
  navi: {
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    activeId: state.app.activePiece,
    artwork: state.art.artwork,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivePiece: setActivePiece(dispatch),
    setNaviHeight: (height) => {
      dispatch({
        type: NAVI_HEIGHT,
        height: height,
      })
    }
  };
};

class Navi extends Component {

  componentDidMount() {
    const { setNaviHeight } = this.props;
    setNaviHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  componentDidUpdate() {
    const { setNaviHeight } = this.props;
    setNaviHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  render() {
    const { classes, artwork, activeId, setActivePiece } = this.props;
    const currentId = parseInt(activeId, 10);
    const currentIndex = artwork.findIndex((piece) => piece.id === activeId);

    let prevButton = null;
    let nextButton = null;
    if (currentId !== undefined) {
      if (currentIndex === 0) {
        prevButton = (<IconButton disabled={true}><NavigateBefore /></IconButton>);
      } else if(currentIndex > 0) {
        const prevId = artwork[currentIndex - 1].id;
        prevButton = (
          <Link to={"/piece/" + prevId} onClick={() => setActivePiece(prevId)}>
            <IconButton disabled={(currentIndex < 0)}><NavigateBefore /></IconButton>
          </Link>);

      }
      if (currentIndex === (artwork.length - 1)) {
        nextButton = (<IconButton disabled={true}><NavigateNext /></IconButton>);
      } else if (currentIndex < (artwork.length - 1)) {
        const nextId = artwork[currentIndex + 1].id;
        nextButton = (
          <Link to={"/piece/" + nextId} onClick={() => setActivePiece(nextId)}>
            <IconButton disabled={(currentIndex < 0)}><NavigateNext /></IconButton>
          </Link>);
      }
    };

    return (
        <Grid item id="navi" className={classes.navi}>
          {prevButton}
          {nextButton}
        </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navi));
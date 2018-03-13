import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import NavigateNext from 'material-ui-icons/NavigateNext';

import store from '../data/store';
import Footer from './Footer';
import PaintingList from './PaintingList';

const styles = theme => ({
  navi: {
    textAlign: 'center',
  },
  bottomVert: {
    flex: '1 0 auto',
    flexWrap: 'nowrap',
    // alignSelf: 'flex-end',
  }
});

class Bottom extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    const { classes, ratio } = this.props;
    const currentId = parseInt(this.props.artId)
    console.log("this.props: ", this.props);

    const state = store.getState();
    console.log("state: ", state);
    const artwork = state.art.artwork;

    const currentIndex = artwork.findIndex((piece) => piece.id === currentId);
    console.log("currentIndex: ", currentIndex);

    let navi = null;
    if (currentId !== undefined) {
      let prevButton = null;
      let nextButton = null;
      if (currentIndex === 0) {
        prevButton = (<IconButton disabled="true"><NavigateBefore /></IconButton>);
      } else if(currentIndex > 0) {
        const prevId = artwork[currentIndex - 1].id;
        prevButton = (
          <Link to={"/piece/" + prevId}>
            <IconButton disabled={(currentIndex < 0)}><NavigateBefore /></IconButton>
          </Link>);

      }
      if (currentIndex === (artwork.length - 1)) {
        nextButton = (<IconButton disabled="true"><NavigateNext /></IconButton>);
      } else if (currentIndex < (artwork.length - 1)) {
        const nextId = artwork[currentIndex + 1].id;
        nextButton = (
          <Link to={"/piece/" + nextId}>
            <IconButton disabled={(currentIndex < 0)}><NavigateNext /></IconButton>
          </Link>);
      }
      navi = (
        <Grid item id="navi" className={classes.navi}>
          {prevButton}
          {nextButton}
        </Grid>);
    };

    return ((ratio === "horizontal") ? (
      <Grid item spacing={0} id="bottom">
        {navi}
        <Footer></Footer>
      </Grid>
    ) : (
        <Grid item container direction="column" spacing={0} className={classes.bottomVert} id="bottom">
          {navi}
          <Route path="/piece" render={() => <PaintingList direction="row" />} />
          <Footer></Footer>
        </Grid>
      )
    );
  }
}

export default withStyles(styles)(Bottom);
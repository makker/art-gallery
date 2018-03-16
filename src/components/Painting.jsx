import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

import store from '../data/store';
import InfoSheet from './InfoSheet';

const styles = {
  root: {
    flex: '100 100',
    maxWidth: '100%',
    maxHeight: '100%',
    padding: '10%',
  },
  innerContainer: {
    height: '100%',
  },
  close: {
    position: 'absolute',
  },
  imgContainer: {
    flex: '0 1 auto',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    WebkitBoxShadow: '4px 10px 38px 5px rgba(0,0,0,0.62)',
    MozBoxShadow: '4px 10px 38px 5px rgba(0, 0, 0, 0.62)',
    boxShadow: '4px 10px 38px 5px rgba(0, 0, 0, 0.62)',
  },
  sheetContainer: {
    flex: '1 1', 
  },
};

const mapStateToProps = state => {
  // This is not really used
  return {
    bottomH: state.app.bottomH,
    naviH: state.app.naviH,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

// TODO: Transitio, https://reacttraining.com/react-router/web/example/animated-transitions

class Painting extends Component {

  render() {
    const { classes, match, bottomH, naviH } = this.props;
    
    const tile = store.getState().art.artwork.find(art => art.id.toString() === match.params.id );
    const appBar = document.getElementById('app-bar');
    const appBarH = appBar && appBar.clientHeight;
    const vpH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const maxH = Math.round((vpH - appBarH - bottomH - naviH) * 0.7); 
    const imgStyle = { maxHeight: maxH + 'px' };
    
    return (
        <Grid item className={classes.root}>
          <Grid container wrap="nowrap" direction="row" spacing={0} justify="center" alignContent="center" alignItems="center" className={classes.innerContainer}>
            <Grid item container spacing={0} direction="row" wrap="nowrap" justify="center">
              <Grid item className={classes.sheetContainer} />
              <Grid item className={classes.imgContainer}>
                <img src={"/img/" + tile.img} alt={tile.title} className={classes.img} style={imgStyle} />
              </Grid>
              <Grid item className={classes.sheetContainer}>
                <InfoSheet data={tile} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Painting));
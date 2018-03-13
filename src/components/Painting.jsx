import React, { Component } from 'react';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import InfoOutline from 'material-ui-icons/InfoOutline';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

import store from '../data/store';

const styles = {
  root: {
    height: '100%',
    flexGrow: 1,
  },
  item: {
    maxWidth: '100%',
    maxHeight: '100%',
    padding: '10%',
    textAlign: 'center'
  },
  close: {
    position: 'absolute',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  infoButton: {
    top: 0,
    verticalAlign: 'top',
    marginRight: '-40px',
  }
};


class Painting extends Component {

  render() {
    const { classes, match } = this.props;
    console.log("match: ", match);

    console.log("store.getState(): ", store.getState().art.artwork);
    const tile = store.getState().art.artwork.find(art => art.id.toString() === match.params.id );
    const appBar = document.getElementById('app-bar');
    const appBarH = appBar && appBar.clientHeight;
    const bottom = document.getElementById('bottom');
    const bottomH = bottom && bottom.clientHeight;
    const vpH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const maxH = Math.round((vpH - appBarH - bottomH) * 0.7); 
    const imgStyle = { maxHeight: maxH + 'px' };
    
    return (
      <Grid container className={classes.root} alignContent="center" justify="center" spacing={0}>
        <Grid item className={classes.item}>
          <img src={"/img/" + tile.img} alt={tile.title} className={classes.img} style={imgStyle}/>
          <IconButton className={classes.infoButton} color="primary" aria-label="Menu"><InfoOutline /></IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Painting);
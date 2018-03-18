import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

import store from '../data/store';
import InfoSheet from './InfoSheet';
import frames, { frameJSS } from '../data/frames';

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
  mat: {
    height: '100%',
  },
  frame: {
    flex: '1 1', 
    //height: '100%',
  },
  shadow: {
    WebkitBoxShadow: '4px 10px 38px 5px rgba(0,0,0,0.62)',
    MozBoxShadow: '4px 10px 38px 5px rgba(0, 0, 0, 0.62)',
    boxShadow: '4px 10px 38px 5px rgba(0, 0, 0, 0.62)',
  },
  img: {
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    verticalAlign: 'middle',
  },
  sheetContainer: {
    flex: '1 1', 
  },
};

Object.assign(styles, frameJSS);

console.log("styles: ", styles);

const mapStateToProps = state => {
  const frame = frames.find(frame => (frame.id === state.app.virtualFrame));
  const frameClass = (frame) ? frame.classFrame : null;
  const imgClass = (frame) ? frame.classImage : null;
  const matClass = (frame) ? frame.classMat : null;
  const frameHeight = (frame) ? frame.height || 0 : 0; 
  
  return {
    bottomH: state.app.bottomH,
    naviH: state.app.naviH,
    activeId: state.app.activePiece,
    frameClass,
    imgClass,
    matClass,
    frameHeight
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

// TODO: Transitio, https://reacttraining.com/react-router/web/example/animated-transitions

class Painting extends Component {

  render() {
    const { classes, bottomH, naviH, activeId, frameClass, matClass, imgClass, frameHeight } = this.props;
    
    const tile = store.getState().art.artwork.find(art => art.id === activeId );
    const appBar = document.getElementById('app-bar');
    const frameEl = document.getElementById('img-frame');
    const appBarH = appBar && appBar.clientHeight;
    let painting = null;
    
    const vpH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const maxH = Math.round((vpH - appBarH - bottomH - naviH) * 0.7); 

    if (tile.hasFrames) {
      const imgStyle = { maxHeight: maxH + 'px' };

      painting = <img src={"/img/" + tile.img} alt={tile.title} className={classes.img + " " + classes.shadow} style={imgStyle} />;

    } else {
      const frameStyle = { maxHeight: maxH + 'px' };

      console.log("frameHeight: ", frameHeight);

      const imgStyle = { maxHeight: 'calc(' + maxH + 'px - ' + frameHeight +')'};
      console.log("imgStyle: ", imgStyle);

      painting =
                <Grid container spacing={0} direction="column" className={classes.frame + " " + classes.shadow + " " + classes[frameClass]} style={frameStyle}>
                  <Grid item className={classes.mat +" "+ classes[matClass]}>
                    <img src={"/img/" + tile.img} alt={tile.title} className={classes.img + " " + classes[imgClass]} style={imgStyle} />
                  </Grid>
                </Grid>
    }
    
    return (
        <Grid item className={classes.root}>
          <Grid container wrap="nowrap" direction="row" spacing={0} justify="center" alignContent="center" alignItems="center" className={classes.innerContainer}>
            <Grid item container spacing={0} direction="row" wrap="nowrap" justify="center">
              <Grid item className={classes.sheetContainer} />
              <Grid item className={classes.imgContainer}>
               { painting }
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
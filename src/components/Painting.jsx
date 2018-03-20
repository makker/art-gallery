import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

import store from '../data/store';
import InfoSheet from './InfoSheet';
import frames, { frameJSS } from '../data/frames';
import Avatar from 'material-ui/Avatar';

const styles = theme => Object.assign({
  root: {
    flex: '100 100',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  wrapper: {
    height: '100%',
    padding: '10vmin',
  },
  innerContainer: {
    height: '100%',
  },
  close: {
    position: 'absolute',
  },
  number: {
    backgroundColor: theme.palette.primary[500],
    position: 'relative',
    top: '3vmin',
    left: '3vmin',
    marginBottom: '-5vmin',
    height: '5vmin',
    width: '5vmin',
    fontSize: '3vmin',
    marginRight: '30px',
  },
  imgContainer: {
    flex: '0 1 auto',
    color: 'white',
    lineHeight: '2em',
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
}, frameJSS);

const mapStateToProps = state => {
  const frame = frames.find(frame => (frame.id === state.app.virtualFrame));
  const frameClass = (frame) ? frame.classFrame : null;
  const imgClass = (frame) ? frame.classImage : null;
  const matClass = (frame) ? frame.classMat : null;
  const frameHeight = (frame) ? frame.height || 0 : 0; 
  
  return {
    vpH: state.app.viewportHeight,
    vpW: state.app.viewportWidth,
    ratio: state.app.ratio,
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
    const { classes, ratio, vpH, vpW, bottomH, naviH, activeId, frameClass, matClass, imgClass, frameHeight } = this.props;
    
    let tile = store.getState().art.artwork.find(art => art.id === activeId );
    let painting = null;

    if (tile === undefined) {
      tile = {
        id: ":(",
      }
      painting = (
        <div>
          TAULUA EI LÖYDY!.<br />Muuta haun rajausta.
        </div>
      );
    } else {
      const appBar = document.getElementById('app-bar');
      const appBarH = appBar && appBar.clientHeight;
      
      const canvasH = (ratio === "horizontal") ? (vpH - appBarH - bottomH - naviH) : (vpH - appBarH - bottomH)
      const maxH = Math.round(canvasH - (Math.min(vpH, vpW) * 0.20)); 


      if (tile.hasFrames || (frameClass === null && matClass === null && imgClass === null)) {
        const imgStyle = { maxHeight: maxH + 'px' };

        painting = <img src={"/img/" + tile.img} alt={tile.title} className={classes.img + " " + classes.shadow} style={imgStyle} />;

      } else {
        const frameStyle = { maxHeight: maxH + 'px' };
        const imgStyle = { maxHeight: 'calc(' + maxH + 'px - ' + frameHeight +')'};

        painting =
          <Grid container spacing={0} direction="column" className={classes.frame + " " + classes.shadow + " " + classes[frameClass]} style={frameStyle}>
            <Grid item className={classes.mat +" "+ classes[matClass]}>
              <img src={"/img/" + tile.img} alt={tile.title} className={classes.img + " " + classes[imgClass]} style={imgStyle} />
            </Grid>
          </Grid>
      }
    }
    
    return (
        <Grid item className={classes.root}>
          <Avatar className={classes.number}>{tile.id}</Avatar>
          <div className={classes.wrapper}>
            <Grid container wrap="nowrap" direction="row" spacing={0} justify="center" alignContent="center" alignItems="center" className={classes.innerContainer}>
              <Grid item container spacing={0} direction="row" wrap="nowrap" justify="center">
                <Grid item className={classes.sheetContainer}>
                </Grid>
                <Grid item className={classes.imgContainer}>
                { painting }
                </Grid>
                <Grid item className={classes.sheetContainer}>
                  <InfoSheet data={tile} />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Painting));
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

import store from '../data/store';
import InfoSheet from './InfoSheet';
import frames, { frameJSS } from '../data/frames';
import Avatar from 'material-ui/Avatar';

var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
if (isIE) {
  // Remove properties name starting with &, causes errot in IE in withStyles
  for (let style in frameJSS) {
    Object.entries(frameJSS[style]).forEach(item => {
      if (item[0].indexOf("&") === 0) {
        delete frameJSS[style][item[0]];
      }
    })
  } 
}

const mainMargin = '10vmin';

const styles = theme => Object.assign(frameJSS, {
  root: {
    flex: '100 100',
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'flex',
  },
  wrapper: {
    height: '100%',
    padding: 'calc(' + mainMargin +' - 10px) calc(' + mainMargin + ' - 10px) calc(' + mainMargin +' - 30px)',
    margin: 'auto',
  },
  wrapperVert: {
    //padding: 'calc(' + mainMargin + ' - 10px) calc(' + mainMargin + ' - 10px) calc(' + mainMargin +' - 30px)',
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
    marginRight: '-5vmin',
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
});

const mapStateToProps = state => {
  const frame = frames.find(frame => (frame.id === state.app.virtualFrame));
  const frameClass = (frame) ? frame.classFrame : null;
  const imgClass = (frame) ? frame.classImage : null;
  const matClass = (frame) ? frame.classMat : null;
  const frameHeight = (frame) ? frame.height || 0 : 0; 
  
  return {
    root: state.app.root,
    vpH: state.app.viewportHeight,
    vpW: state.app.viewportWidth,
    ratio: state.app.ratio,
    listH: state.app.listH,
    filtersH: state.app.filtersH,
    naviH: state.app.naviH,
    activeId: state.app.activePiece,
    fullscreenOn: state.app.fullscreenOn,
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
    const { root, classes, ratio, vpH, vpW, naviH, filtersH, listH, activeId, frameClass, matClass, imgClass, frameHeight, fullscreenOn } = this.props;
    
    let tile = store.getState().art.artwork.find(art => art.id === activeId );
    let painting = null, 
        wrapperClasses = [classes.wrapper];

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
      let canvasH;

      if (fullscreenOn) {
        canvasH = vpH - naviH;

      } else {
        switch(ratio) {
          case "wide":
            canvasH = (vpH - appBarH - naviH);
            break;

          case "horizontal":
            canvasH = (vpH - appBarH - naviH - listH);
            break;

          default:
          case "vertical":
            canvasH = (vpH - appBarH - naviH - listH - filtersH);
            wrapperClasses.push(classes.wrapperVert)
            break;
        }
      }

      const maxH = Math.round(canvasH); 
      console.log("maxH: ", maxH);
      let folder = "";
      let width;

      if (!isNaN(tile.width) && !isNaN(tile.height)) {
        width = maxH * (tile.width / tile.height);

      } else if (ratio === "wide") {
        width = vpW * 0.55;

      } else if (ratio === "horizontal") {
        width = vpW * 0.6;

      } else if (ratio === "vertical") {
        width = vpW * 0.9;

      }

      if (width < 150) {
        folder = "150/";
      } else if (width < 250) {
        folder = "250/";
      } else if (width < 400) {
        folder = "400/";
      } else if (width < 700) {
        folder = "700/";
      }

      if (tile.hasFrames || (frameClass === null && matClass === null && imgClass === null)) {
        const imgStyle = { maxHeight: 'calc(' + (maxH + 10) + 'px - 20vmin)' };

        painting = <img src={root +"img/"+ folder + tile.img} alt={tile.title} className={classes.img + " " + classes.shadow} style={imgStyle} />;

      } else {
        const frameStyle = { maxHeight: maxH + 'px' };
        const imgStyle = { maxHeight: 'calc(' + (maxH + 10) + 'px - (2 * ' + mainMargin +') - ' + frameHeight +')'};

        painting =
          <Grid container spacing={0} direction="column" className={classes.frame + " " + classes.shadow + " " + classes[frameClass]} style={frameStyle}>
            <Grid item className={classes.mat +" "+ classes[matClass]}>
            <img src={root + "img/" + folder + tile.img} alt={tile.title} className={classes.img + " " + classes[imgClass]} style={imgStyle} />
            </Grid>
          </Grid>
      }
    }
    
    return (
      <Grid item className={classes.root}>
        <Avatar className={classes.number}>{tile.id}</Avatar>
        <div className={wrapperClasses.join(" ")}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, frameJSS)(Painting));
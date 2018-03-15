import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GridListTile from 'material-ui/GridList/GridListTile';
import GridListTileBar from 'material-ui/GridList/GridListTileBar';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

import { setActivePiece } from '../modules/appState';

const styles = theme => ({
  tileHors: {
    // width: 'auto !important',
    height: '100%',
    display: 'inline-block',
    margin: '0 20px',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  tileVert: {
    width: '100%',
    textAlign: 'center',
  },
  tileGrid: {
    minHeight: '',
    minWidth: '25%',
  },
  img: {
    minHeight: '50px',
    minWidth: '50px',
    maxHeight: '300px',
    maxWidth: '300px',
    height: 'calc(100% - 40px)',
    width: 'auto',
  },
  imgHors: {
    margin: '15px 0 10px',
  },
  imgVert: {
    margin: '20px 0',
    width: '70%',
    height: 'auto',
  },
  active: {
    border: "2px solid white",
  },
  title: {
    // color: theme.palette.primary.light,
    color: 'white',
    fontSize: '11px',
    fontWeight: 400,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
    },
  },
  titleBar: {
    background: 'transparent',
    height: '30px',
    // background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',

  },
});

const mapStateToProps = state => {
  // This is not really used
  return {
    activeId: state.app.activePiece,
  };
}; 

const mapDispatchToProps = dispatch => {
  return {
    setActivePiece: setActivePiece(dispatch),
  };
};

class Tile extends Component {

  render() {
    const { classes, direction, tile, setActivePiece, activeId } = this.props;

    let tileClasses = (direction === "column") ? classes.tileVert : classes.tileHors;
    let imgClasses = classes.img + ((tile.id === activeId) ? " "+ classes.active : "");

    switch (direction) {
      case "column":
        imgClasses += " " + classes.imgVert;
        break;

      case "row":
        imgClasses += " " + classes.imgHors;
        break;

      default:
        break;
    }

    // TODO: CHANGE Link to Button with OnClick > "push" location to router and set active piece

    return (
      <GridListTile title={tile.title} className={tileClasses} >
        {/*<a name={"p" + tile.id} />
        <Link to={"/piece/" + tile.id + "#p" + tile.id} id={tile.id} onClick={() => (setActivePiece(tile.id))}>*/}
        <Link to={"/piece/" + tile.id} id={tile.id} onClick={() => setActivePiece(tile.id)}>
          <img src={"/img/" + tile.img} alt={tile.title} className={imgClasses} />

          <GridListTileBar
            title={tile.title}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }} 
          />
        </Link>
      </GridListTile>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tile));
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GridListTile from 'material-ui/GridList/GridListTile';
import GridListTileBar from 'material-ui/GridList/GridListTileBar';
import { withStyles } from 'material-ui/styles';

import { setActivePiece } from '../modules/appState';

const styles = theme => ({
  tileHors: {
    height: 'calc(100% - 18px)',
    display: 'inline-block',
    margin: '12px 10px 0px',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  tileVert: {
    width: '70%',
    margin: '0 15%',
    textAlign: 'center',
  },
  tileGrid: {
    minWidth: '25%',
    margin: '4% 3%',
    [theme.breakpoints.up('md')]: {
      minWidth: '20%',
      margin: '3% 2%',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '15%',
      margin: '2% 1%',
    },
  },
  img: {
    minHeight: '50px',
    minWidth: '50px',
    maxHeight: '30vmin',
    height: 'calc(100% - 20px)',
    width: 'auto',
  },
  imgHors: {
    height:'100%',
  },
  imgVert: {
    margin: '25px 0',
    width: '100%',
    height: 'auto',
  },
  imgGrid: {
    margin: '0 0 25px',
    [theme.breakpoints.up('md')]: {
      margin: '0 0 30px',
    },
  },
  active: {
    border: "3px solid orange",
  },
  title: {
    color: 'white',
    fontSize: '11px',
    fontWeight: 400,
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
    },
  },
  titleWrap: {
    margin: 0,
  },
  titleGrid: {
    fontSize: '12px',
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
    },
  },
  titleBar: {
    background: 'transparent',
    height: '24px',

  },
  titleBarRow: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,.15) 100%)',
    padding: '8px',
  },
});

const mapStateToProps = state => {
  // This is not really used
  return {
    root: state.app.root,
    activeId: state.app.activePiece,
    query: state.router.location.search,
  };
}; 

const mapDispatchToProps = dispatch => {
  return {
    setActivePiece: setActivePiece(dispatch),
  };
};

class Tile extends Component {

  render() {
    const { classes, root, query, direction, tile, setActivePiece, activeId } = this.props;

    let tileClasses = "";
    let imgClasses = classes.img + ((tile.id === activeId) ? " "+ classes.active : "");
    let titleBarClasses = [classes.titleBar];
    let titleClasses = classes.title;

    switch (direction) {
      case "column":
        tileClasses = classes.tileVert;
        imgClasses += " " + classes.imgVert;
        break;

      case "row":
        tileClasses = classes.tileHors;
        titleBarClasses.push(classes.titleBarRow);
        imgClasses += " " + classes.imgHors;
        break;

      case "both":
        tileClasses = classes.tileGrid;
        imgClasses += " " + classes.imgGrid;
        titleClasses += " "+ classes.titleGrid;
        break;

      default:
        break;
    }

    return (
      <GridListTile title={tile.title} className={tileClasses} >
        <Link to={{ pathname: root +"piece/" + tile.id, search: query }} id={tile.id} onClick={() => setActivePiece(tile.id)}>
          <img src={root +"img/" + tile.img} alt={tile.title} className={imgClasses} />

          <GridListTileBar
            title={tile.id + ". " + tile.title}
            classes={{
              root: titleBarClasses.join(" "),
              title: titleClasses,
              titleWrap: classes.titleWrap,
            }} 
          />
        </Link>
      </GridListTile>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tile));
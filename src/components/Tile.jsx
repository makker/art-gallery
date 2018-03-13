import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GridListTile from 'material-ui/GridList/GridListTile';
import GridListTileBar from 'material-ui/GridList/GridListTileBar';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

const styles = theme => ({
  tileHors: {
    // width: 'auto !important',
    height: '100%',
    display: 'block',
    margin: '0 10px',
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
  title: {
    // color: theme.palette.primary.light,
    color: 'white',
    fontSize: '12px',
    fontWeight: 400,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
  },
  titleBar: {
    background: 'transparent',
    height: '30px',
    // background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',

  },
});


class Tile extends Component {

  render() {
    const { classes, direction, tile } = this.props;

    let tileClasses = (direction === "column") ? classes.tileVert : classes.tileHors;
    let imgClasses = classes.img;

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

    return (
      <GridListTile title={tile.title} className={tileClasses} >
        <Link to={"/piece/" + tile.id}>
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

export default withStyles(styles)(Tile);
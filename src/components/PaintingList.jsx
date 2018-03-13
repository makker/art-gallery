import React, { Component } from 'react';

import Grid from 'material-ui/Grid';
import GridList from 'material-ui/GridList';
import { withStyles } from 'material-ui/styles';

import Tile from './Tile';
import store from '../data/store';

/*
xs, extra - small: 0px or larger
sm, small: 600px or larger
md, medium: 960px or larger
lg, large: 1280px or larger
xl, xlarge: 1920px or larger */

const styles = theme => ({
  root: {
    //display: 'flex',
    //flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  rootBottom: {
    width: '100%',
  },
  rootSide: {
    width: '20%',
    minWidth: '100px',

  },
  rootGrid: {
    width: '100%',
    flex: 1, 
    overflowY: 'auto',
  },
  list: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  listRow: {
    flexWrap: 'nowrap',
    height: '150px',
    width: '100%',
    padding: '0 20px',
    [theme.breakpoints.up('sm')]: {
      height: '180px',
    },
    [theme.breakpoints.up('md')]: {
      height: '230px',
    },
  },
  listVert: {
    height: '100%',
    padding: '15px 0',
  },
  listGrid: {
    justifyContent: "space-evenly",
  },
});

class PaintingList extends Component {

  render() {
    const { classes, direction } = this.props,
      art = store.getState().art;

    let colCount = null;
    let rootClasses = classes.root;
    let gridClasses = classes.gridList;
    let tileClasses = (direction === "column") ? classes.tileVert : classes.tileHors;

    switch(direction) {
      case "column":
        rootClasses += " " + classes.rootSide;
        colCount = 1;
        gridClasses += " " + classes.listVert;
        break;

      case "row": 
        rootClasses += " " + classes.rootBottom;
        colCount = null;
        gridClasses += " " + classes.listRow;
        break;

      default:
        rootClasses += " " + classes.rootGrid;
        colCount = 3;
        gridClasses += " " + classes.listGrid;
        break;
    }
    
    return (
      <Grid item className={rootClasses} >
        <GridList className={gridClasses} spacing={0} cellHeight="auto" cols={colCount}>
          {art.artwork.map((tile, index) => (
            <Tile key={index} tile={tile} className={tileClasses} direction={direction} />
          ))}
        </GridList>
      </Grid>
    );
  }
};

export default withStyles(styles)(PaintingList);
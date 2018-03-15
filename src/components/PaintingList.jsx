import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
  // This is not really used
  return {
    activeId: state.app.activePiece,
    appW: state.app.viewportWidth,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class PaintingList extends Component {

  scrollToActive() {
    const { activeId, direction } = this.props;

    if (activeId !== undefined) {
      const activeNode = ReactDOM.findDOMNode(this.refs["tile" + activeId]);
      let fromTop = 0;
      let fromLeft = 0;

      switch (direction) {
        case "column":
          const activeH = (activeNode) ? activeNode.clientHeight : 0;
          const thisH = ReactDOM.findDOMNode(this).clientHeight;
          fromTop = activeNode.offsetTop - (thisH / 2) + (activeH / 2);
          break;

        case "row":
          const activeW = activeNode.clientWidth;
          const appW = this.props.appW;
          fromLeft = activeNode.offsetLeft - (appW / 2) + (activeW / 2);

          break;

        default:

          break;
      }
      
      document.getElementById("list").scroll({
        left: fromLeft, 
        top: fromTop, 
        behavior: 'smooth'
      });
    }
    delete this.timeout
  }

  componentDidMount() {
    console.log("MOUNT LIST");
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.scrollToActive.bind(this), 200);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    delete this.timeout;
  }

  componentDidUpdate() {
    clearTimeout(this.timeout);
    this.scrollToActive();
  }

  render() {
    console.log("RENDER LIST");
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
        <GridList className={gridClasses} spacing={0} cellHeight="auto" cols={colCount} id="list">
          {art.artwork.map((tile, index) => (
            <Tile key={index} ref={"tile"+ tile.id} tile={tile} className={tileClasses} direction={direction} />
          ))}
        </GridList>
      </Grid>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaintingList));
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
    backgroundColor: '#333333',
  },
  rootBottom: {
    width: '100%',
  },
  rootSide: {
    width: '18%',
    minWidth: '100px',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '16%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '15%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '14%',
    },
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
    height: '120px',
    width: '100%',
    padding: '0 20px',
    [theme.breakpoints.up('sm')]: {
      height: '150px',
    },
    [theme.breakpoints.up('md')]: {
      height: '200px',
    },
  },
  listVert: {
    flex: '1 1 auto',
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
    typeFilter: state.app.typeFilter,
    sellFilter: state.app.sellFilter,
    topicFilters: state.app.topicFilters,
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
          fromTop = (activeNode) ? (activeNode.offsetTop - (thisH / 2) + (activeH / 2)) : 0;
          break;

        case "row":
          const activeW = (activeNode) ? activeNode.clientWidth : 0;
          const appW = this.props.appW;
          fromLeft = (activeNode) ? ((activeNode.offsetLeft - (appW / 2) + (activeW / 2))) : 0;
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
    const { classes, direction, typeFilter, sellFilter, topicFilters } = this.props,
      art = store.getState().art;

    let colCount = null;
    let rootClasses = classes.root;
    let gridClasses = classes.list;
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

    const filteredList = art.artwork.filter(piece => {
      if (typeFilter !== 0 && piece.type !== typeFilter) {
        return false;
      }
      if (sellFilter !== 0 && piece.sellStatus !== sellFilter) {
        return false;
      }
      if (!topicFilters.includes(0) && !topicFilters.every(t => piece.topics.includes(t))) {
        return false;
      }
      return piece;
    });
    
    return (
      <Grid item className={rootClasses} >
        <GridList className={gridClasses} spacing={0} cellHeight="auto" cols={colCount} id="list">
          {filteredList.map((tile, index) => (
            <Tile key={index} ref={"tile"+ tile.id} tile={tile} className={tileClasses} direction={direction} />
          ))}
        </GridList>
      </Grid>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaintingList));
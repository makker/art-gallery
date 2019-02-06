import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import GridList from 'material-ui/GridList';
import { withStyles } from 'material-ui/styles';
import { Scrollbars } from 'react-custom-scrollbars';

import Tile from './Tile';
import { LIST_HEIGHT } from '../modules/appState';

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
    color: 'white',
  },
  rootBottom: {
    display: 'flex',
    width: '100%',
    padding: '0',
    overflowX: 'auto',
    flex: '0 1 auto', 
  },
  rootSide: {
    width: '18%',
    minWidth: '100px',
    overflowY: 'auto',
    overflowX: 'hidden',
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
    display: 'flex',
    flex: '1 1 auto', 
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
  scrollGrid: {
    display: 'flex',
    flex: '1 0 auto',
  },
  scrollRow: {
    display: 'flex',
    flex: '1 0 auto',
    width: 'auto',
  },
  scrollColumn: {
    display: 'flex',
    flex: '1 0 auto',
  },
  scrollInnerRow: {
    display: 'flex',
    overflowX: 'scroll',
  },
  scrollInnerColumn: {
    overflowX: 'hidden',
  },
  scrollInner: {
    minWidth: 'calc(100% + 17px)',
  },
  list: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    flex: '0 1 auto',
    padding: '2vh 3vw',
  },
  listRow: {
    flexWrap: 'nowrap',
    height: 'calc(40px + 14vmin)',
    width: 'auto',
    padding: '0 20px 19px',
    flex: '1 0 auto',

  },
  listVert: {
    padding: 'calc(3vh - 20px) 0 25px',
    flex: '1 0 auto',
  },
  listGrid: {
    justifyContent: "space-evenly",
  },
});

const mapStateToProps = state => {
  return {
    filteredList: state.app.filteredList,
    artwork: state.art.artwork,
    activeId: state.app.activePiece,
    appW: state.app.viewportWidth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setListHeight: (height) => {
      dispatch({
        type: LIST_HEIGHT,
        height: height,
      })
    }
  };
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

    const { setListHeight } = this.props;
    setListHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    delete this.timeout;    
  }

  componentDidUpdate() {
    clearTimeout(this.timeout);
    this.scrollToActive();

    const { setListHeight } = this.props;
    setListHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  render() {
    const { classes, direction, filteredList } = this.props;

    let colCount = null;
    let rootClasses = classes.root;
    let gridClasses = classes.list;
    let tileClasses = (direction === "column") ? classes.tileVert : classes.tileHors;
    let vertScrollTrack = ({ style, ...props }) =>
          <div {...props} style={{
            ...style, ...scrollRootStyles, bottom: '7px', top: '9px',
          }} />;
    const scrollClasses = [];
    const scrollInnerClasses = [classes.scrollInner];

    switch(direction) {
      case "column":
        rootClasses += " " + classes.rootSide;
        colCount = 1;
        gridClasses += " " + classes.listVert;
        scrollClasses.push(classes.scrollColumn);
        scrollInnerClasses.push(classes.scrollInnerColumn);
        break;

      case "row": 
        rootClasses += " " + classes.rootBottom;
        colCount = null;
        gridClasses += " " + classes.listRow;
        scrollClasses.push(classes.scrollRow);
        scrollInnerClasses.push(classes.scrollInnerRow);
        vertScrollTrack = (...props) => <div style={{ display: 'none', }} />;
        break;

      default:
        rootClasses += " " + classes.rootGrid;
        colCount = 3;
        gridClasses += " " + classes.listGrid;
        scrollClasses.push(classes.scrollGrid)
        break;
    }

    const scrollRootStyles = {
      right: '7px',
      borderRadius: '3px',
    };
    const scrollThumbStyles = { 
      backgroundColor: 'rgba(200, 200, 200, .2)', 
      borderRadius: 'inherit',
    };
    
    return (
      <Grid item className={rootClasses} >
        <Scrollbars autoHeight hideTracksWhenNotNeeded autoHeightMax="100%" style={{ width: '100%', }} className={scrollClasses.join(" ")}
          renderTrackHorizontal={({ style, ...props }) =>
            <div {...props} style={{ ...style, ...scrollRootStyles, bottom: '10px', left: '9px', }} />
          }
          renderTrackVertical={ vertScrollTrack }
          renderThumbHorizontal={({ style, ...props }) =>
            <div {...props} style={{ ...style, ...scrollThumbStyles }} />
          }
          renderThumbVertical={({ style, ...props }) =>
            <div {...props} style={{ ...style, ...scrollThumbStyles }} />
          }
          renderView={props => <div {...props} className={scrollInnerClasses.join(" ")} id="list" data-foo="sdfsd" />}> 
          <GridList className={gridClasses} spacing={0} cellHeight="auto" cols={colCount}>
          { (filteredList.length > 0) ? (
            filteredList.map((tile, index) => (
              <Tile key={index} ref={"tile"+ tile.id} tile={tile} className={tileClasses} direction={direction} />
            ))) : (
              <div>
                HAULLA EI LÖYDY TEOKSIA!<br />Muuta haun rajausta.
              </div>
            )
          }
          </GridList>
        </Scrollbars>
      </Grid>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaintingList));
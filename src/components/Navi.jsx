import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import NavigateNext from 'material-ui-icons/NavigateNext';
import Fullscreen from 'material-ui-icons/Fullscreen';
import FullscreenExit from 'material-ui-icons/FullscreenExit';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Switch from 'material-ui/Switch';

//import { INFOSHEET, toggleInfoSheet, toggleInfoSheet2 } from '../modules/appState';
import { setVirtualFrame, toggleInfoSheet } from '../modules/appState';
import { setQueryStrings, removeQueryStrings } from '../modules/utils';
import frames from '../data/frames';
import { setActivePiece, NAVI_HEIGHT, toggleFullscreen } from '../modules/appState';
import SelectFilter from './SelectFilter';

/**
 * Filtered list management in PaintingList
 */

const styles = theme => ({
  formItems: {
    position: 'absolute',
    display: 'flex',
    opacity: ".1",
    transition: 'opacity 1.5s ease-out 1.5s',
    paddingLeft: '1vw',
  },
  navi: {
    textAlign: 'center',
    "&:hover div, &:hover button": {
      transition: 'opacity .3s ease-out 0s',
      opacity: 1,
    }
  },
  switch: {
    margin: '1vh -17px -10px',
    transform: 'scale(.8)',
    [theme.breakpoints.up('sm')]: {
      transform: 'scale(.85)',
    },
    [theme.breakpoints.up('md')]: {
      transform: 'scale(1)',
    },
  },
  formControl: {
    margin: '0 1vw',
  },
  fsBtn: {
    position: 'absolute',
    right: '24px',
    width: 'auto',
    fontSize: '24px',
    opacity: ".3",
    transition: 'opacity 1.5s ease-out 1.5s',
  },
});

const mapStateToProps = state => {
  return {
    root: state.app.root,
    ratio: state.app.ratio,
    query: state.router.location.search,
    activeId: state.app.activePiece,
    virtualFrame: state.app.virtualFrame,
    infoOpen: state.app.infoSheetOpen,
    artwork: state.art.artwork,
    filteredList: state.app.filteredList,
    fullscreenOn: state.app.fullscreenOn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivePiece: setActivePiece(dispatch),
    setFrame: setVirtualFrame(dispatch),
    toggleInfoSheet: toggleInfoSheet(dispatch),
    toggleFullscreen: toggleFullscreen(dispatch),
    setNaviHeight: (height) => {
      dispatch({
        type: NAVI_HEIGHT,
        height: height,
      })
    }
  };
};

/*
// Version 2, not used
const mapDispatchToProps2 = dispatch => bindActionCreators({
  toggleInfoSheet: toggleInfoSheet2
}, dispatch);

// Version 3, not used
const mapDispatchToProps3 = dispatch => {
  const func = toggleInfoSheet;
  return {
    toggleInfoSheet: () => func(dispatch)
  };
}; */

class Navi extends Component {
  constructor() {
    super();
    this.paintingHammer = null;
  }
  setNaviSwiper(eventType, id) {
    const { setActivePiece, getPaintingHammer } = this.props;
    const paintingHammer = getPaintingHammer();

    // Clear old swiper events
    if (paintingHammer && paintingHammer.handlers) {
      delete paintingHammer.handlers[eventType];

      paintingHammer.on(eventType, function (ev) {
        setActivePiece(id)
      });
    }
  };

  componentDidMount() {
    const { setNaviHeight } = this.props;
    setNaviHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  componentDidUpdate() {
    const { setNaviHeight } = this.props;

    setNaviHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  render() {
    const { root, classes, artwork, query, 
      activeId, setActivePiece, 
      filteredList,
      infoOpen, toggleInfoSheet,
      virtualFrame, setFrame,  
      toggleFullscreen, fullscreenOn,
      history, 
    } = this.props;
    const currentId = parseInt(activeId, 10);
    const currentIndex = filteredList.findIndex((piece) => piece.id === activeId);

    let prevButton = null;
    let nextButton = null;

    function changeOpen(open) {
      toggleInfoSheet(open);

      const search = "?" + (
        (open) ?
          setQueryStrings({ info: 1 }, true) :
          removeQueryStrings(["info"], true)
      );

      history.push({ search: search });
    }

    function changeValue(type, value) {

      switch (type) {
        case "frame":
          setFrame(value);
          break;

        default:
      }

      const search = "?" + (
        (value !== 0) ?
          setQueryStrings(
            (() => { let o = {}; o[type] = value; return o; })(),
            true) :
          removeQueryStrings([type], true)
      );
      history.push({ search: search });
    }

    if (currentId !== undefined) {

      // TODO HAMMER VSTACKIIN JA PROPSINA
      if (currentIndex === 0) {
        prevButton = (<IconButton disabled={true}><NavigateBefore /></IconButton>);
      } else if(currentIndex > 0) {
        const prevId = filteredList[currentIndex - 1].id;
        prevButton = (
          <Link to={{pathname: root +"piece/" + prevId, search: query}} onClick={() => setActivePiece(prevId)}>
            <IconButton disabled={(currentIndex < 0)}><NavigateBefore /></IconButton>
          </Link>);

        this.setNaviSwiper('swiperight', prevId);
      }
      if (currentIndex === (filteredList.length - 1)) {
        nextButton = (<IconButton disabled={true}><NavigateNext /></IconButton>);
      } else if (currentIndex < (artwork.length - 1)) {
        const nextId = filteredList[currentIndex + 1].id;
        nextButton = (
          <Link to={{ pathname: root +"piece/" + nextId, search: query }} onClick={() => setActivePiece(nextId)}>
            <IconButton disabled={(currentIndex < 0)}><NavigateNext /></IconButton>
          </Link>);

        this.setNaviSwiper('swipeleft', nextId);
      }
    };
    const fsIcon = (fullscreenOn) ? <FullscreenExit /> : <Fullscreen />;
    const formItemsClasses = [classes.formItems];
    if (fullscreenOn) formItemsClasses.push(classes.formItemsFs);

    return (
      <Grid item id="navi" className={classes.navi}>
        <Grid item className={formItemsClasses.join(" ") }>
          <SelectFilter id="frame" label="Kehys" 
            data={frames.map(item => ({ id: item.id, value: item.name }))} 
            selectedValue={virtualFrame} 
            defaultLabel="Ei kehystä" 
            change={changeValue} 
            className={classes.marginFixer}
            direction="row"
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="info-switch" shrink={true}>Info</InputLabel>
            <Switch
              checked={infoOpen}
              onChange={(e) => changeOpen(e.target.checked)}
              value="info"
              color="primary"
              //classes={{ icon: classes.icon }}
              className={classes.switch}
              inputProps={{
                id: 'info-switch',
              }}
            />
          </FormControl>
        </Grid>

        {prevButton}
        {nextButton}
        
        <IconButton className={classes.fsBtn} color="primary" aria-label="Fullscreen" onClick={() => toggleFullscreen(!fullscreenOn) } >
          { fsIcon }
        </IconButton>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Navi)));
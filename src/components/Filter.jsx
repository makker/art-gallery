import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

//import { INFOSHEET, toggleInfoSheet, toggleInfoSheet2 } from '../modules/appState';
import { setTypeFilter, setVirtualFrame, setSellStatus, toggleInfoSheet, setTopics, FILTERS_HEIGHT } from '../modules/appState';
import frames from '../data/frames';
import { setQueryStrings, removeQueryStrings } from '../modules/utils';
import SelectFilter from './SelectFilter';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#282828',
    color: 'white',
    padding: '1vh 2vw ',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      padding: '1vh calc(4vw - 30px)',
    },
  },
  rootHorsGrid: {
    minHeight: '60px',
    height: '7.5vh',
  },
  rootHorsPiece: {
    minHeight: '92px',
    [theme.breakpoints.up('sm')]: {
      minHeight: '60px',
      height: '7.5vh',
    },
  },
  rootVert: {
    width: 'calc(50px + 10vw)',
    maxWidth: '150px',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '2vh 0',
  },
  container: {
    flex: '0 1 auto',
    width: 'auto',
    padding: '0 2vw',
    justifyContent: 'center',
  },
  containerHors: {
    minHeight: '75px',
    height: '8vh',
    [theme.breakpoints.up('sm')]: {
      minHeight: '48px',
      height: '6vh',
      marginRight: '-1px',
    },
  },
  containerHorsPiece: {
    '&:first-child': {
      borderRight: 'solid 1px white',
    },
    [theme.breakpoints.up('sm')]: {
      borderLeft: 'solid 1px white',
      borderRight: 'solid 1px white',
    },
  },
  containerVert: {
    flexDirection: 'column',
    padding: '1vh 10px',
    alignItems: 'left',
    flexWrap: 'nowrap',
  },
  formItems: {
    alignItems: 'left',
    display: 'flex',
  },
  formItemsVert: {
    flexDirection: 'column',
    alignItems: 'left',
    display: 'flex',
  },
  switch: {
    margin: '1vh -17px -10px',
    transform: 'scale(.8)',
    height: '44px',
    [theme.breakpoints.up('sm')]: {
      transform: 'scale(.85)',
    },
    [theme.breakpoints.up('md')]: {
      transform: 'scale(1)',
    },
  },
  groupLabel: {
    fontSize: 'calc(8px + 1vmin)',
  },
  groupLabelVert: {
    fontSize: 'calc(10px + 1vmin)',
    padding: '1.5vh calc(5px + .3vw) 2vh',
  },
  groupDivider: {
    margin: '0 .5vw 0 1vw',
    [theme.breakpoints.up('sm')]: {
      margin: '0 1vw 0 1.5vw',
    },
  },
  groupDividerVert: {
    margin: '0 0',
    [theme.breakpoints.up('sm')]: {
    },
  },
  formControl: {
    margin: '0 1vw',
  },
  formControlVert: {
    margin: '0 calc(5px + .3vw)',
  },
});

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

class Filter extends Component {

  componentDidMount() {
    const { setFiltersHeight } = this.props;
    setFiltersHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  componentDidUpdate() {
    const { setFiltersHeight } = this.props;
    setFiltersHeight(ReactDOM.findDOMNode(this).clientHeight);
  }

  render() {
    const { 
      root,
      classes, ratio,
      filteredList,
      infoOpen, toggleInfoSheet,
      typeFilter, types, setType, 
      virtualFrame, setFrame, 
      sellStatuses, sellFilter, setSell, 
      topics, topicFilters, setTopics,
      history, path } = this.props;

    function objectToArray(obj) {
      return Object.keys(obj).map(key => ({ id: parseInt(key, 10), value: obj[key] }))
    }

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
      
      switch(type) {
        case "type":
          setType(value);
          break;

        case "frame":
          setFrame(value);
          break;

        case "topics":
          const value0Index = value.indexOf(0);
          if (value.length === 0 || (topicFilters.indexOf(0) === -1 && value0Index > -1)) {
            value = [0];
          } else if (value0Index > -1) {
            value.splice(value0Index, 1);
          }
          setTopics(value);
          break;

        case "sell":
          setSell(value);
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

    const rootClasses = [classes.root];
    const containerClasses = [classes.container];
    const formItemsClasses = [classes.formItems];
    const groupLabelClasses = [classes.groupLabel];
    const groupDividerClasses = [classes.groupDivider];

    if (ratio === "vertical") {
      rootClasses.push((path === root) ? classes.rootHorsGrid : classes.rootHorsPiece);
      containerClasses.push(classes.containerHors);
      if (path !== root) containerClasses.push(classes.containerHorsPiece);

    } else {
      rootClasses.push(classes.rootVert);
      containerClasses.push(classes.containerVert);
      formItemsClasses.push(classes.formItemsVert);
      groupLabelClasses.push(classes.groupLabelVert);
      groupDividerClasses.push(classes.groupDividerVert);
    }

    return (
      <Grid item className={rootClasses.join(" ")}>

        <Route path={root +"piece"} render={() =>
          <Grid container className={containerClasses.join(" ")} spacing={0}>
            <Grid item className={groupDividerClasses.join(" ")} >
              <div className={groupLabelClasses.join(" ")}>
                Asetukset
              </div>
            </Grid>
            <Grid item className={formItemsClasses.join(" ") }>

              <Route exact path={root +"piece/:id"} render={() => 
                <SelectFilter id="frame" label="Kehys" data={frames.map(item => ({ id: item.id, value: item.name }))} selectedValue={virtualFrame} defaultLabel="Ei kehystä" change={changeValue} className={ classes.marginFixer } />
              } />{ /* END OF ROUTE */}

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
          </Grid>
        } />{ /* END OF ROUTE */}

        <Grid container className={containerClasses.join(" ")} spacing={0}>
          <Grid item className={groupDividerClasses.join(" ")} >
            <div className={groupLabelClasses.join(" ")}>
              Rajaa ({ filteredList.length })
            </div>
          </Grid>
          <Grid item className={formItemsClasses.join(" ")}>
            <SelectFilter id="type" label="Tyyppi" data={objectToArray(types)} selectedValue={typeFilter} defaultLabel="Kaikki" change={changeValue} />

            {/* <SelectFilter id="sell" label="Myynnissä" data={objectToArray(sellStatuses)} selectedValue={sellFilter} defaultLabel="Kaikki" change={changeValue} /> */}

            <SelectFilter id="topics" label="Aiheet" data={objectToArray(topics)} selectedValue={topicFilters} defaultLabel="Kaikki" multiple change={changeValue} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    root: state.app.root,
    ratio: state.app.ratio,
    path: state.router.location.pathname,
    filteredList: state.app.filteredList,
    virtualFrame: state.app.virtualFrame,
    infoOpen: state.app.infoSheetOpen,
    types: state.art.artworkType,
    typeFilter: state.app.typeFilter,
    sellStatuses: state.art.sellStatuses,
    sellFilter: state.app.sellFilter,
    topics: state.art.topics,
    topicFilters: state.app.topicFilters,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFrame: setVirtualFrame(dispatch),
    setType: setTypeFilter(dispatch),
    setSell: setSellStatus(dispatch),
    toggleInfoSheet: toggleInfoSheet(dispatch),
    setTopics: setTopics(dispatch),
    setFiltersHeight: (height) => {
      dispatch({
        type: FILTERS_HEIGHT,
        height: height,
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Filter)));
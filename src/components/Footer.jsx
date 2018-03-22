import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

//import { INFOSHEET, toggleInfoSheet, toggleInfoSheet2 } from '../modules/appState';
import { setTypeFilter, setVirtualFrame, setSellStatus, toggleInfoSheet, setTopics } from '../modules/appState';
import frames from '../data/frames';
import { setQueryStrings, removeQueryStrings } from '../modules/utils';
import SelectFilter from './SelectFilter';

const styles = theme => ({
  root: {
    // position: 'absolute',
    // bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minHeight: '92px',
    backgroundColor: '#282828',
    color: 'white',
    padding: '1vh 2vw ',
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
      padding: '1vh calc(4vw - 30px)',
      minHeight: '68px',
      height: '8vh',
    },
  },
  container: {
    flex: '0 1 auto',
    minHeight: '75px',
    height: '8vh',
    width: 'auto',
    padding: '0 2vw',
    justifyContent: 'center',
    '&:first-child': {
      borderRight: 'solid 1px white',
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: '48px',
      height: '6vh',
      marginRight: '-1px',
      borderLeft: 'solid 1px white',
      borderRight: 'solid 1px white',
    },
  },
  formItem: {
    alignItems: 'center',
    display: 'flex',
  },
  marginFixer: {},
  switch: {
    margin: '10px -10px -10px',
    transform: 'scale(.8)',
    height: '44px',
    [theme.breakpoints.up('sm')]: {
      transform: 'scale(1)',
      margin: '10px 0 -10px',
    }
  },
  groupLabel: {
    fontSize: 'calc(8px + 1vmin)',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  groupDivider: {
    margin: '0 .5vw 0 1vw',
    [theme.breakpoints.up('sm')]: {
      margin: '0 1vw 0 1.5vw',
    },
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

class Footer extends Component {

  render() {
    const { 
      root,
      classes, 
      infoOpen, toggleInfoSheet,
      typeFilter, types, setType, 
      virtualFrame, setFrame, 
      sellStatuses, sellFilter, setSell, 
      topics, topicFilters, setTopics,
      history } = this.props;

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

    return (
      <Grid item className={classes.root}>
        <Grid container className={classes.container} spacing={0}>

          <Grid item className={classes.groupDivider} >
            <div className={classes.groupLabel}>
              Asetukset
            </div>
          </Grid>
          <Grid item className={classes.formItem }>
            <Route exact path={root +"piece/:id"} render={() => 
              <SelectFilter id="frame" label="Kehys" data={frames.map(item => ({ id: item.id, value: item.name }))} selectedValue={virtualFrame} defaultLabel="Ei kehystä" change={changeValue} className={ classes.marginFixer } />
            } />
            <FormControl className={classes.formControl + " " + classes.marginFixer}>
              <InputLabel htmlFor="info-switch" shrink={true}>Info</InputLabel>
              <Switch
                checked={infoOpen}
                onChange={(e) => changeOpen(e.target.checked)}
                value="info"
                color="primary"
                classes={{ icon: classes.icon }}
                className={classes.switch}
                inputProps={{
                  id: 'info-switch',
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container className={classes.container} spacing={0}>
          <Grid item className={classes.groupDivider} >
            <div className={classes.groupLabel}>
              Rajaa
            </div>
          </Grid>
          <Grid item className={classes.formItem}>
            <SelectFilter id="type" label="Tyyppi" data={objectToArray(types)} selectedValue={typeFilter} defaultLabel="Kaikki" change={changeValue} />

            <SelectFilter id="sell" label="Myynnissä" data={objectToArray(sellStatuses)} selectedValue={sellFilter} defaultLabel="Kaikki" change={changeValue} />

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
    path: state.router.location.pathname,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Footer)));
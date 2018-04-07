import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { setTypeFilter, setSellStatus, setTopics, FILTERS_HEIGHT } from '../modules/appState';
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
    minHeight: '60px',
    height: '7.5vh',
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
    justifyContent: 'center',
  },
  containerHors: {
    minHeight: '48px',
    height: '6vh',
    maxWidth: '100%',
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
    maxWidth: '100%',
  },
  formItemsVert: {
    flexDirection: 'column',
    alignItems: 'left',
    display: 'flex',
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
});

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
      typeFilter, types, setType, 
      sellStatuses, sellFilter, setSell, 
      topics, topicFilters, setTopics,
      history, path } = this.props;

    function objectToArray(obj) {
      return Object.keys(obj).map(key => ({ id: parseInt(key, 10), value: obj[key] }))
    }

    function changeValue(type, value) {
      
      switch(type) {
        case "type":
          setType(value);
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
    let direction;

    if (ratio === "vertical") {
      rootClasses.push((path === root) ? classes.rootHorsGrid : classes.rootHorsPiece);
      containerClasses.push(classes.containerHors);
      direction = "row";

    } else {
      rootClasses.push(classes.rootVert);
      containerClasses.push(classes.containerVert);
      formItemsClasses.push(classes.formItemsVert);
      groupLabelClasses.push(classes.groupLabelVert);
      groupDividerClasses.push(classes.groupDividerVert);
      direction = "column";
    }

    return (
      <Grid item className={rootClasses.join(" ")}>
        <Grid container className={containerClasses.join(" ")} spacing={0}>
          <Grid item className={groupDividerClasses.join(" ")} >
            <div className={groupLabelClasses.join(" ")}>
              Rajaa ({ filteredList.length })
            </div>
          </Grid>
          <Grid item className={formItemsClasses.join(" ")}>
            <SelectFilter id="type" label="Tyyppi" data={objectToArray(types)} selectedValue={typeFilter} defaultLabel="Kaikki" change={changeValue} direction={ direction } />

            <SelectFilter id="sell" label="Myynnissä" data={objectToArray(sellStatuses)} selectedValue={sellFilter} defaultLabel="Kaikki" change={changeValue} direction={direction} />

            <SelectFilter id="topics" label="Aiheet" data={objectToArray(topics)} selectedValue={topicFilters} defaultLabel="Kaikki" multiple change={changeValue} direction={direction} />
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
    setType: setTypeFilter(dispatch),
    setSell: setSellStatus(dispatch),
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
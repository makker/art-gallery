import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import { setTypeFilter, setVirtualFrame } from '../modules/appState';
import frames from '../data/frames';
import { setQueryStrings, removeQueryStrings } from '../modules/utils';

const styles = theme => ({
  root: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    backgroundColor: '#333333',
    color: 'white',
    padding: '10px 20px 0',
  },
  bottom: {},
  formControl: {
    margin: '0 10px',
  },
});

class Footer extends Component {

  render() {
    const { classes, typeFilter, types, setType, virtualFrame, setFrame, history } = this.props;

    function changeType(id) {
      setType(id);

      const search = "?" + (
        (id !== 0) ?
          setQueryStrings({ type: id }, true) :
          removeQueryStrings(["type"], true)
      );
      history.push({ search: search });
    }

    function changeFrame(id) {
      setFrame(id);

      const search = "?" + (
        (id !== 0) ?
          setQueryStrings({ frame: id }, true) :
          removeQueryStrings(["frame"], true)
      );
      history.push({ search: search });
    }

    return (
      <Grid item className={ classes.root }>
        Filters

        <Switch
            checked={false}
            onChange={(e) => {/*call reducer*/}}
            value="checkedA"
          />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="type-select">Tyyppi</InputLabel>
          <Select 
            value={typeFilter}
            onChange={e => changeType(parseInt(e.target.value, 10))}
            inputProps={{
              id: 'type-select',
            }}
          >
            <MenuItem key={0} value={0}>Kaikki</MenuItem>
            {
              Object.keys(types).map((type, index) => (
                <MenuItem key={index} value={parseInt(type, 10)}>{types[type]}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="frame-select">Kehys</InputLabel>
          <Select 
            value={virtualFrame}
            onChange={e => changeFrame(parseInt(e.target.value, 10))}
            inputProps={{
              id: 'frame-select',
            }}>
            <MenuItem key={0} value={0}>Ei kehystä</MenuItem>
            { frames.map((frame, index) => (
                <MenuItem key={frame.id} value={frame.id}>{frame.name}</MenuItem>
              )) }
          </Select>
        </FormControl>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  // This is not really used
  return {
    types: state.art.artworkType,
    typeFilter: state.app.typeFilter,
    virtualFrame: state.app.virtualFrame,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setType: setTypeFilter(dispatch),
    setFrame: setVirtualFrame(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Footer)));
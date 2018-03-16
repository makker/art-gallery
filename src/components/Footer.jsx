import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import { setTypeFilter } from '../modules/appState';

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
});

class Footer extends Component {

  render() {
    const { classes, frames, typeFilter, types, setType } = this.props;

    console.log("typeFilter: ", typeFilter);

    return (
      <Grid item className={ classes.root }>
        Filters

        <Switch
            checked={frames}
            onChange={(e) => {/*call reducer*/}}
            value="checkedA"
          />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="type-select">Tyyppi</InputLabel>
          <Select 
            value={typeFilter}
            onChange={(e) => setType(parseInt(e.target.value, 10))}
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
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  // This is not really used
  return {
    types: state.art.artworkType,
    typeFilter: state.app.typeFilter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setType: setTypeFilter(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer));
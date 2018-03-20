import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  formControl: { 
    margin: '0 1vw',
    maxWidth: '20vw',
    [theme.breakpoints.up('md')]: {
      fontSize: 'initial',
    },
  },
  select: {
    fontSize: 'calc(9px + .8vw)',
    [theme.breakpoints.up('md')]: {
      fontSize: 'initial',
    },
  }
});

class SelectFilter extends Component {

  render() {
    const {
      classes,
      id,
      label,
      data,
      selectedValue,
      defaultLabel,
      multiple,
      change } = this.props;
    
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={id +"-select"}>{label}</InputLabel>
        <Select
          value={selectedValue}
          onChange={e => change(id, e.target.value)}
          inputProps={{
            id: id +'-select',
          }}
          multiple={multiple}
          autoWidth={multiple} className={classes.select}>
          <MenuItem key={0} value={0}>{ defaultLabel }</MenuItem>
          {data.map((item, index) => (
            <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectFilter));
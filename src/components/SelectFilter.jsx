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
    maxWidth: '33vw',
    minWidth: '60px',
    [theme.breakpoints.up('md')]: {
      fontSize: 'initial',
    },
  },
  formControlVert: {
    margin: 'calc(2vh - 10px) calc(5px + .3vw)',
    maxWidth: 'calc(80px + 2vw)',
    marginBottom: '13px',
    [theme.breakpoints.up('md')]: {
      fontSize: 'initial',
    },
  },
  select: {
    fontSize: 'calc(11px + .8vmin)',
    [theme.breakpoints.up('md')]: {
      fontSize: 'initial',
    },
  },
  selectMenu: { 
    paddingBottom: "4px" 
  }
});

class SelectFilter extends Component {

  render() {
    const {
      classes,
      className,
      direction,
      id,
      label,
      data,
      selectedValue,
      defaultLabel,
      multiple,
      change } = this.props;

    const formControlClasses = [classes.formControl, className];
    console.log("direction: ", direction);
    if (direction === "column") {
      formControlClasses.push(classes.formControlVert);
    }
    
    return (
      <FormControl className={formControlClasses.join(" ")}>
        <InputLabel htmlFor={id +"-select"}>{label}</InputLabel>
        <Select
          value={selectedValue}
          onChange={e => change(id, e.target.value)}
          inputProps={{
            id: id +'-select',
          }}
          multiple={multiple}
          autoWidth={multiple} 
          className={classes.select}
          style={{ marginTop: 'calc(8px + .4vh)' }}
          classes={{selectMenu: classes.selectMenu }} >
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
import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%'
  },
  bottom: {},
});

class Footer extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    const { classes } = this.props;

    return (
      <Grid item className={ classes.bottom }>
        <Paper className={classes.root} position="fixed"> Filters
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Footer);
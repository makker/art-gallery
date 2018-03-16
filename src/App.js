import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import primary from 'material-ui/colors/brown';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import SimpleAppBar from './components/AppBar';
import PaintingList from './components/PaintingList';
import Bottom from './components/Bottom';
import Middle from './components/Middle';

import './assets/css/App.css';
import store from './data/store';
import ratio, { viewportWidth } from './modules/ratio'
import { RATIO, VIEWPORT_WIDTH } from './modules/appState';

const theme = createMuiTheme({
  palette: {

    type: 'dark',
    primary: primary,
    // secondary: 
  }
});

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflowY: 'hidden',
    justifyContent: 'space-between',
    backgroundColor: '#424242',
  },
});

class App extends Component {
  componentWillMount() {
    window.addEvent(window, "resize", () => {
      store.dispatch({ type: RATIO, ratio: ratio() });
      store.dispatch({ type: VIEWPORT_WIDTH, width: viewportWidth() });
    });
  }

  render() {
    const { classes } = this.props;
    const state = store.getState();
    console.log("state: ", state);

    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
          <SimpleAppBar />
          <Route exact path="/" render={() => <PaintingList direction="both" />} />
          <Route exact path="/piece/:id" component={Middle} />
          <Bottom ratio={ratio} />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  match: state.router.match,
});

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));

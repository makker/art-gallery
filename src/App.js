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
import ratio, { viewportWidth, viewportHeight } from './modules/ratio'
import { RATIO, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from './modules/appState';
import ListManager from './components/ListManager';

const theme = createMuiTheme({
  palette: {

    type: 'dark',
    primary: primary,
    // secondary: 
  },
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
      // Don't call dispatchers like this. > Through dispatch to props please!
      store.dispatch({ type: RATIO, ratio: ratio() });
      store.dispatch({ type: VIEWPORT_WIDTH, width: viewportWidth() });
      store.dispatch({ type: VIEWPORT_HEIGHT, height: viewportHeight() });
    });
  }

  render() {
    const { classes, root } = this.props;
    console.log("root: ", root);

    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <ListManager />
        <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
          <SimpleAppBar />
          <Route exact path={root} render={() => <PaintingList direction="both" />} />
          <Route exact path={root +"piece/:id"} component={Middle} />
          <Bottom ratio={ratio} />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  match: state.router.match,
  root: state.app.root,
});

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));

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
import VStack from './components/VStack';

import './assets/css/App.css';
import store from './data/store';
import ratio, { viewportWidth, viewportHeight } from './modules/ratio'
import { RATIO, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from './modules/appState';
import ListManager from './components/ListManager';
import Filter from './components/Filter';

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
    const { classes, root, ratio } = this.props;

    console.log("root: ", root);

    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <ListManager />
        {(ratio === "wide") ? (
          <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
            <SimpleAppBar />
            <Grid container direction="row" spacing={0} justify="flex-start" wrap="nowrap" style={{flex: '1 1 auto', height: '100%' }}>
              <Filter ratio={ratio} />
              <Route exact path={root} render={() => 
                <PaintingList direction="both" /> // Grid list
              } />
              <Route exact path={root +"piece/:id"} render={() => 
                <PaintingList direction="column"></PaintingList> // Column list
              } />
              <Route exact path={root + "piece/:id"} component={VStack} />
            </Grid>
          </Grid>

        ) : (ratio === "horizontal") ? (
          <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
            <SimpleAppBar />
            <Grid container direction="row" spacing={0} justify="flex-start" wrap="nowrap" style={{flex: '1 1 auto', height: '100%' }}>
              <Filter ratio={ratio} />
              <Route exact path={root} render={() => 
                <PaintingList direction="both" /> // Grid list
              } />
              <Route exact path={root + "piece/:id"} component={VStack} />
            </Grid>
          </Grid>

        ) : (
          <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
            <SimpleAppBar />
            <VStack />
          </Grid>            
        )};
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  match: state.router.match,
  root: state.app.root,
  ratio: state.app.ratio,
});

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));

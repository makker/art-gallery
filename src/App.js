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
import Contact from './components/Contact';

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
    const { classes, root, path, ratio, fullscreenOn } = this.props;

    const topBar = (!fullscreenOn) ? <SimpleAppBar /> : null;
    const filters = (!fullscreenOn) ? <Filter ratio={ratio} /> : null;

    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <ListManager />
        {(fullscreenOn && (root !== path)) ? (
          <VStack/>

        ) : (ratio === "wide") ? (
          <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
            { topBar }
            <Grid container direction="row" spacing={0} justify="flex-start" wrap="nowrap" style={{flex: '1 1 auto', height: '100%' }}>
              { filters }
              <Route exact path={root} render={() => 
                <PaintingList direction="both" /> // Grid list
              } />
              <Route exact path={root +"piece/:id"} render={() => 
                <PaintingList direction="column"></PaintingList> // Column list
              } />
              <Route exact path={root + "piece/:id"} component={VStack} />

              <Route exact path={root + "contact"} render={() =>
                <PaintingList direction="column"></PaintingList> // Column list
              } />
              <Route path={root + "contact"} component={Contact} />
            </Grid>
          </Grid>

        ) : (ratio === "horizontal") ? (
          <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
            { topBar }
            <Grid container direction="row" spacing={0} justify="flex-start" wrap="nowrap" style={{ flex: '1 1 auto', height: '100%' }}>
              {filters}
              <Route exact path={root} render={() => 
                <PaintingList direction="both" /> // Grid list
              } />
              <Route exact path={root + "piece/:id"} render={() => (
                <VStack>
                  <PaintingList direction="row" key="list"></PaintingList>
                </VStack>
                  )} />
              <Route path={root + "contact"} render={() => (
                <VStack>
                  <Contact />
                  <PaintingList direction="row" key="list"></PaintingList>
                </VStack>
              )} />
            </Grid>
          </Grid>

        ) : ( // Vertical
          <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
            { topBar }
            <VStack>
              <Route exact path={root} render={() => <PaintingList direction="both" />} />          {/* GRID */}
              <Route exact path={root + "piece/:id"} render={() => (
                <PaintingList direction="row" key="list"></PaintingList>
                    )} />
              <Route path={root + "contact"} component={Contact} />
              <Route path={root + "contact"} render={() => (
                  <PaintingList direction="row" key="list"></PaintingList>
                )} />
              <Filter ratio={ratio} />
            </VStack>
          </Grid>            
        )}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  match: state.router.match,
  root: state.app.root,
  ratio: state.app.ratio,
  fullscreenOn: state.app.fullscreenOn,
  path: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));

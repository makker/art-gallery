import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import primary from 'material-ui/colors/brown';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import SimpleAppBar from './components/AppBar';
import Painting from './components/Painting';
import PaintingList from './components/PaintingList';
import Bottom from './components/Bottom';

import './App.css';
import store from './data/store';
import ratio from './modules/ratio'

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
  },
  middleHors: {
    flexGrow: 1,
    flexShrink: 1,
  },
  middleVert: {
    flex: '100 100',
    // width: '100%',
  },
});

class App extends Component {
  componentWillMount() {
    window.addEvent(window, "resize", () => {
      store.dispatch({ type: 'ratio/CHANGE', ratio: ratio() });
    });
    store.dispatch({ type: 'ratio/CHANGE', ratio: ratio() });
  }

  render() {
    console.log("this.propsit: ", this.props);
    const { classes } = this.props;
    const state = store.getState();
    console.log("state: ", state);
    const ratio = state.app.ratio || "vertical";
    const direction = (ratio === "horizontal") ? "row" : "column";

    const middleComponents = () => {
      return (ratio === "horizontal") ? (
        <Grid  item container spacing={0} direction={direction} className={classes.middleHors}>
          <PaintingList direction="column" xs={3}></PaintingList>
          <Grid item xs={9}>
            <Route path="/piece/:id" component={Painting} />
          </Grid>
        </Grid>
      ) : (
        <Grid item className={classes.middleVert}>
          <Route path="/piece/:id" component={Painting} />
        </Grid>
      );
    };

    const BottomMaker = (props) => {
      const id = props.match.params.id;
      console.log("id: ", id);
      return (<Bottom ratio={ratio} artId={id} />)
    };

    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Grid container direction="column" spacing={0} justify="space-between" className={classes.root} wrap="nowrap">
          <SimpleAppBar />
          <Route exact path="/" render={() => <PaintingList direction="both" />} />
          <Route path="/piece" component={middleComponents} />
          <Route exact path="/piece/:id" component={BottomMaker} />
          <Route exact path="/" render={() => <Bottom ratio={ratio} />} />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  match: state.router.match,
  count: state.app.ratio
});

const mapDispatchToProps = dispatch => {
  return {
    destroyTodo: () => dispatch({
      type: 'DESTROY_TODO'
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));

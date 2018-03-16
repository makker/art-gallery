import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';


const styles = theme => ({
  row: {
    flex: '0 1',
    width: 'auto',
  },
  infoItem: {
    flex: '1 1',
    fontSize: '0.8em',
    padding: '2px 5px',
  }
});

const mapStateToProps = state => {
  // This is not really used
  return {
    artists: state.art.artists,
    types: state.art.artworkType,
    topics: state.art.topics,
    statuses: state.art.sellStatuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class InfoRow extends Component {

  render() {
    const { classes, id, value, artists, types, statuses } = this.props;
    let visible = false,
        label = "",
        info = value.toString();

    switch(id) {
      case "id":
        visible = true;
        label = "Numero";
        break;

      case "title":
        visible = true;
        label = "Nimi"
        break;

      case "artist":
        visible = true;
        label = "Taiteilija";
        info = artists.find(obj => obj.id === value).name;
        break;

      case "type":
        visible = true;
        label = "Tyyppi";
        info = types[value];
        break;

      case "hasFrames":
        visible = true;
        label = "Kehystetty";
        info = (value) ? "Kyllä" : "Ei";
        break;

      case "width":
        if (value) {
          visible = true;
          label = "Leveys";
        }
        break;

      case "height":
        if (value) {
          visible = true;
          label = "Korkeus";
        }
        break;

      case "sellStatus":
        visible = true;
        label = "Status"
        info = statuses[value];
        break;

      case "price":
        if (value) {
          visible = true;
          label = "Hinta";
        }
        break;

      case "topics":
      case "package":
      case "img":
      case "owner":
        break;

      default:
        visible = true; // change
        label = id;

    }

    return (visible) ? (
      <Grid item container spacing={0} className={classes.row} cols={2} direction="row" wrap="nowrap">
        <Grid item className={classes.infoItem}>{label +":"}</Grid>
        <Grid item className={classes.infoItem}>{info}</Grid>
      </Grid>
    ) : null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoRow));
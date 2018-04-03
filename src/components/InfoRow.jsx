import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';


const styles = theme => ({
  row: {
    flex: '0 1',
    width: '160px',
    [theme.breakpoints.up('md')]: {
      width: '13vw',
    },
  },
  rowVert: {
    width: '150px',
    [theme.breakpoints.up('md')]: {
      width: '15vw',
    },
  },
  infoItem: {
    flex: '1 1',
    fontSize: '0.8em',
    padding: '.5vh .5vw',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.1vw',  
    },
  },
  infoItemVert: {
    fontSize: '0.7em',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2vw',
    },
  },
  notSelling: {
    color: "#999",
  },
  selling: {
    color: "#2eb92e",
  },
  sold: {
    color: "#da6565",
  },
  sellingMaybe: {
    color: "#ffc05e",
  },
});

const mapStateToProps = state => {
  // This is not really used
  return {
    ratio: state.app.ratio,
    artists: state.art.artists,
    owners: state.art.owners,
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
    const { classes, ratio, id, value, artists, owners, types, statuses } = this.props;

    const labels = {
      id: "Numero",
      title: "Nimi",
      proof: "Vedos",
      artist: "Taiteilija",
      type: "Tyyppi",
      year: "Vuosi",
      location: "Paikka",
      archiveId: "Arkisto nro",
      hasFrames: "Kehystetty",
      width: "Leveys",
      height: "Korkeus",
      sellStatus: "Status",
      price: "Hinta",
      notice: "Huomaa",
    };
    let visible = false,
        label = labels[id] || "",
        info = value.toString(),
        rowClasses = [classes.row],
        itemClasses = [classes.infoItem],
        item2Classes = [];

    switch(id) {

      case "title":
      case "year":
      case "archiveId":
      case "price":
      case "location":
      case "notice":
        visible = true;
        break;

      case "artist":
        visible = true;
        info = artists.find(obj => obj.id === value).name;
        break;

      case "type":
        visible = true;
        info = types[value];
        break;

      case "hasFrames":
        visible = true;
        info = (value) ? "Kyllä" : "Ei";
        break;

      case "proof":
      case "width":
      case "height":
        if (value) {
          visible = true;
        }
        break;

      case "sellStatus":
        visible = true;
        info = statuses[value];
        switch(value) {
          case 1:
            item2Classes.push(classes.notSelling);
            break;
          case 2:
            item2Classes.push(classes.selling);
            break;
          case 3:
            item2Classes.push(classes.sold);
            break;
          case 4:
            item2Classes.push(classes.sellingMaybe);
            break;

          default:
        }
        break;

      case "owner":
        visible = true;
        label = (value.length > 1) ? "Omistajat" : "Omistaja";

        info = value.map((id, index) => owners.find(obj => obj.id === id).name + (((index + 1) < value.length) ? ", " : ""));
        break;
      default:
    }

    if (ratio === "vertical") {
      rowClasses.push(classes.rowVert);
      itemClasses.push(classes.infoItemVert);
    }
    item2Classes.push(...itemClasses);

    return (visible) ? (
      <Grid item container spacing={0} className={rowClasses.join(" ")} cols={2} direction="row" wrap="nowrap">
        <Grid item className={itemClasses.join(" ")}>{label +":"}</Grid>
        <Grid item className={item2Classes.join(" ")}>{info}</Grid>
      </Grid>
    ) : null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoRow));
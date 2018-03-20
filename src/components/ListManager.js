import { Component } from 'react';
import { connect } from 'react-redux';

import { setFilteredList, setActivePiece } from '../modules/appState';

const mapStateToProps = state => {
  return {
    artwork: state.art.artwork,
    activeId: state.app.activePiece,
    typeFilter: state.app.typeFilter,
    sellFilter: state.app.sellFilter,
    topicFilters: state.app.topicFilters,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilteredList: setFilteredList(dispatch),
    setActivePiece: setActivePiece(dispatch),
  };
};

class ListManager extends Component {

  updateList(artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters) {

    const filteredList = artwork.filter(piece => {      
      if (typeFilter !== 0 && piece.type !== typeFilter) {
        return false;
      }
      if (sellFilter !== 0 && piece.sellStatus !== sellFilter) {
        return false;
      }

      if (!topicFilters.includes(0) && !topicFilters.every(t => piece.topics.includes(t))) {
        return false;
      }
      return piece;
    });

    setFilteredList(filteredList);

    if (!filteredList.some(p => p.id === activeId)) {
      setActivePiece(filteredList[0] && filteredList[0].id);
    }
    
  }

  componentDidMount() {
    const { artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters } = this.props;

    this.updateList(artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters);
  }

  componentDidUpdate() {
    const { artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters } = this.props;

    this.updateList(artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters);
  }

  render() {
    return null;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListManager);
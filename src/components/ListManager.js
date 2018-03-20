import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { setFilteredList, setActivePiece } from '../modules/appState';

const mapStateToProps = state => {
  return {
    search: state.router.location.search,
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

  updateList(search, history, artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters) {

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
      activeId = filteredList[0] && filteredList[0].id;
      setActivePiece(activeId);
    }
    const activeIndex = filteredList.findIndex(p => p.id === activeId);
    const prevIndex = activeIndex - 1;
    const nextIndex = activeIndex + 1;
    const query = search;
    
    document.onkeydown = e => {
      e = e || window.event;

      const code = parseInt(e.keyCode, 10);

      if (code === 37) {
        if (prevIndex >= 0) {
          const prevId = filteredList[prevIndex].id;
          history.push({ pathname: "/piece/" + prevId, search: query});
          setActivePiece(prevId);
        }
      } else if (code === 39) {
        if (nextIndex < filteredList.length) {
          const nextId = filteredList[nextIndex].id;
          history.push({ pathname: "/piece/" + nextId, search: query});
          setActivePiece(nextId);
        }
      }
    };
    
  }

  componentDidMount() {
    const { search, history, artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters } = this.props;

    this.updateList(search, history, artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters);
  }

  componentDidUpdate() {
    const { search, history, artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters } = this.props;

    this.updateList(search, history, artwork, activeId, setActivePiece, setFilteredList, typeFilter, sellFilter, topicFilters);
  }

  render() {
    return null;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListManager));
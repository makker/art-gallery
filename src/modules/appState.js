
import URLSearchParams from 'url-search-params';
import ratio, { viewportWidth, viewportHeight } from '../modules/ratio';

export const RATIO = 'ratio/CHANGE';
export const ROOT = 'root/SET';
export const INFOSHEET = 'infoSheet/TOGGLE';
export const ACTIVE_PIECE = 'activePiece/SET';
export const FILTERD_LIST = 'filteredList/SET';
export const PREV_ITEM = 'prevItem/SET';
export const NEXT_ITEM = 'nextItem/SET';
export const VIEWPORT_WIDTH = 'vpWidth/SET';
export const VIEWPORT_HEIGHT = 'vpHeight/SET';
export const LIST_HEIGHT = 'listHeight/SET';
export const FILTERS_HEIGHT = 'filtersHeight/SET';
export const NAVI_HEIGHT = 'naviHeight/SET';
export const TYPE_FILTER = 'typeFilter/SET';
export const VIRTUAL_FRAME = 'virtualFrame/SET';
export const SELL_STATUS = 'sellStatus/SET';
export const TOPICS = 'topics/SET';

const host = window.location.hostname;
let root;

console.log("host: ", host);

switch(host) {
  case "makker.github.io":
    root = "/art-gallery/";
    break;

  case "localhost":
  case "gallery.makker.net":
  case "gallery.makker.net.s3-website.eu-central-1.amazonaws.com":
  case "haili.s3-website.eu-central-1.amazonaws.com":
  case "d1c1jb8pememw0.cloudfront.net":
  case "dirf8i44auhbn.cloudfront.net":
    root = "/";
    break;
}

const path = window.location.pathname;
const id = (path.indexOf(root +"piece/") === 0) ? parseInt(path.replace(root +"piece/", ""), 10) : null;
const filteredList = [];
const prevItem = {};
const nextItem = {};
const query = new URLSearchParams(window.location.search);
const infoOpen = (query.get("info") === "1");
const frameParam = query.get("frame");
const virtualFrame = (frameParam !== null) ? parseInt(frameParam, 10) : 0;
const typeFilter = parseInt(query.get("type"), 10) || 0;
const sellFilter = parseInt(query.get("sell"), 10) || 0;
const topicFilters = (query.get("topics") && query.get("topics").split(".").map(f => parseInt(f, 10))) || [0];

const initialState = { 
  root,
  infoSheetOpen: infoOpen,
  activePiece: id,
  ratio: ratio(),
  viewportWidth: viewportWidth(),
  viewportHeight: viewportHeight(),
  listH: 0,
  filtersH: 0,
  naviH: 0,
  typeFilter,
  virtualFrame,
  sellFilter,
  topicFilters,
  filteredList,
  prevItem,
  nextItem,
};

export default (state = initialState, action) => {
  console.log("action: ", action);
  switch (action.type) {

    case RATIO:
      return {
        ...state,
        ratio: action.ratio
      }

    case VIEWPORT_WIDTH:
      return {
        ...state,
        viewportWidth: action.width,
      }

    case VIEWPORT_HEIGHT:
      return {
        ...state,
        viewportHeight: action.height,
      }

    case LIST_HEIGHT:
      return {
        ...state,
        listH: action.height,
      }

    case FILTERS_HEIGHT:
      return {
        ...state,
        filtersH: action.height,
      }

    case NAVI_HEIGHT:
      return {
        ...state,
        naviH: action.height,
      }

    case INFOSHEET:
      return {
        ...state,
        infoSheetOpen: action.open,
      };

    case ACTIVE_PIECE:
      return {
        ...state,
        activePiece: action.id,
      };

    case FILTERD_LIST:
      return {
        ...state,
        filteredList: action.payload,
      };

    case PREV_ITEM:
      return {
        ...state,
        prevItem: action.payload,
      };

    case NEXT_ITEM:
      return {
        ...state,
        nextItem: action.payload,
      };

    case TYPE_FILTER:
      return {
        ...state,
        typeFilter: action.id,
      };

    case VIRTUAL_FRAME:
      return {
        ...state,
        virtualFrame: action.id,
      };

    case SELL_STATUS:
      return {
        ...state,
        sellFilter: action.id,
      };

    case TOPICS:
      return {
        ...state,
        topicFilters: action.filters,
      };

    default:
      return state
  }
};
    
// This is for Redux Thunk (When async is needed, note here though)
export const toggleInfoSheet2 = () => {
  return dispatch => {
    dispatch({
      type: INFOSHEET
    });
  }
};

export const toggleInfoSheet = dispatch => open => {
  dispatch({
      type: INFOSHEET,
      open: open,
  });
};

export const setActivePiece = dispatch => id => {
  dispatch({
    type: ACTIVE_PIECE,
    id: id,
  });
};
export const setFilteredList = dispatch => list => {
  dispatch({
    type: FILTERD_LIST,
    payload: list,
  });
};

export const setTypeFilter = dispatch => id => {
  dispatch({
    type: TYPE_FILTER,
    id: id,
  });
};

export const setVirtualFrame = dispatch => id => {
  dispatch({
    type: VIRTUAL_FRAME,
    id: id,
  });
};

export const setSellStatus = dispatch => id => {
  dispatch({
    type: SELL_STATUS,
    id: id,
  });
};

export const setTopics = dispatch => filters => {
  dispatch({
    type: TOPICS,
    filters,
  });
};

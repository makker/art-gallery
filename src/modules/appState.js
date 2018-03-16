import URLSearchParams from 'url-search-params';
import ratio, { viewportWidth } from '../modules/ratio';

export const RATIO = 'ratio/CHANGE';
export const INFOSHEET = 'infoSheet/TOGGLE';
export const ACTIVE_PIECE = 'activePiece/SET';
export const VIEWPORT_WIDTH = 'vpWidth/SET';
export const BOTTOM_HEIGHT = 'bottomHeight/SET';
export const NAVI_HEIGHT = 'naviHeight/SET';
export const TYPE_FILTER = 'typeFilter/SET';

const path = window.location.pathname;
const id = (path.indexOf("/piece/") === 0) ? parseInt(path.replace("/piece/", ""), 10) : null;
const query = new URLSearchParams(window.location.search);
const infoOpen = (query.get("info") === "1");

const initialState = { 
  infoSheetOpen: infoOpen,
  activePiece: id,
  ratio: ratio(),
  viewportWidth: viewportWidth(),
  bottomH: 0,
  naviH: 0,
  typeFilter: 0,
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

    case BOTTOM_HEIGHT:
      return {
        ...state,
        bottomH: action.height,
      }

    case NAVI_HEIGHT:
      return {
        ...state,
        naviH: action.height,
      }

    case INFOSHEET:
      return {
        ...state,
        infoSheetOpen: !state.infoSheetOpen
      };

    case ACTIVE_PIECE:
      return {
        ...state,
        activePiece: action.id,
      };

    case TYPE_FILTER:
      return {
        ...state,
        typeFilter: action.id,
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

export const toggleInfoSheet = dispatch => {
    dispatch({
      type: INFOSHEET
    });
};

export const setActivePiece = dispatch => id => {
  dispatch({
    type: ACTIVE_PIECE,
    id: id,
  });
};

export const setTypeFilter = dispatch => id => {
  console.log("id: ", id);
  dispatch({
    type: TYPE_FILTER,
    id: id,
  });
};

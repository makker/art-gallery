import { push } from 'react-router-redux';
import URLSearchParams from 'url-search-params';
import ratio, { viewportWidth } from '../modules/ratio';
import { setQueryStrings, removeQueryStrings } from './utils';

export const RATIO = 'ratio/CHANGE';
export const INFOSHEET = 'infoSheet/TOGGLE';
export const ACTIVE_PIECE = 'activePiece/SET';
export const VIEWPORT_WIDTH = 'vpWidth/SET';
export const BOTTOM_HEIGHT = 'bottomHeight/SET';
export const NAVI_HEIGHT = 'naviHeight/SET';
export const TYPE_FILTER = 'typeFilter/SET';
export const VIRTUAL_FRAME = 'virtualFrame/SET';

const path = window.location.pathname;
const id = (path.indexOf("/piece/") === 0) ? parseInt(path.replace("/piece/", ""), 10) : null;
const query = new URLSearchParams(window.location.search);
const infoOpen = (query.get("info") === "1");
const frameParam = query.get("frame");
const virtualFrame = (frameParam !== null) ? parseInt(frameParam, 10) : 0;

const initialState = { 
  infoSheetOpen: infoOpen,
  activePiece: id,
  ratio: ratio(),
  viewportWidth: viewportWidth(),
  bottomH: 0,
  naviH: 0,
  typeFilter: 0,
  virtualFrame: virtualFrame,
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
        infoSheetOpen: action.open,
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

    case VIRTUAL_FRAME:
      return {
        ...state,
        virtualFrame: action.id,
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
  const search = "?" + (
    (open) ? 
      setQueryStrings({ info: 1 }, true) : 
      removeQueryStrings(["info"], true)
  );

  dispatch(push({
    search
  }));
};

export const setActivePiece = dispatch => id => {
  dispatch({
    type: ACTIVE_PIECE,
    id: id,
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

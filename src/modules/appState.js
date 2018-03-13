
import ratio from '../modules/ratio';

export const RATIO = 'ratio/CHANGE'

export default (state = {}, action) => {
  console.log("action: ", action);
  switch (action.type) {

    case RATIO:
      return {
        ...state,
        ratio: action.ratio
      }

    default:
      return state
  }
};

  
export const appState = () => {
    return dispatch => {
      dispatch({
        type: RATIO,
        ratio: ratio()
      });
    }
  };
  
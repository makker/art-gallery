import appData from '../data/data';

const initialState = appData;

export const SELL = 'artwork/SELL'

export default (state = initialState, action) => {
    switch (action.type) {

        case SELL:
            //console.log("state: ", state);
            return {
                ...state,
                // isIncrementing: true
            }

        default:
            return state
    }
};


export const sell = () => {
    return dispatch => {

        dispatch({
            type: SELL
        });
    }
};
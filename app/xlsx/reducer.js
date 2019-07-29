/**
 * Create by fay on 2019-07-18 17:14
 */
import * as types from './actionType';
import reducerName from './reducerName';

const reducer = function (state={}, action) {
    const {type, row, col} = action;
    switch (type) {
        case types.MAX_ROW: {
            return {...state, type, maxRow: row}
        }
        case types.MAX_COL: {
            return {...state, type, maxCol: col}
        }
        default: {
            return state;
        }
    }
};

export default {
    [reducerName]: reducer
}
/**
 * Create by fay on 2019-07-18 17:09
 */
import * as types from './actionType';

export const setMaxRow = function (row) {
    return {
        type: types.MAX_ROW,
        row
    }
};

export const setMaxCol = function (col) {
    return {
        type: types.MAX_COL,
        col
    }
};
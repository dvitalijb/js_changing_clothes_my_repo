import {
    ITEM_EDIT,
    ITEM_UPDATE,
    INPUT_VALUE_CHANGE,
    ITEM_REMOVE,
} from './constants.js'

export const itemEdit = itemId => {
    return {
        type: ITEM_EDIT,
        payload: itemId,
    };
};

export const itemUpdate = () => {
    return {
        type: ITEM_UPDATE
    };
};

export const inputValueChange = inputValue => {
    return {
        type: INPUT_VALUE_CHANGE,
        payload: inputValue,
    };
};

export const itemRemove = () => {
    return {
        type: ITEM_REMOVE,
    };
};

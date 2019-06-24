import {
    ITEM_EDIT,
    ITEM_UPDATE,
    INPUT_VALUE_CHANGE,
    ITEM_REMOVE,
} from './constants.js'

const initialState = {
    clothes: [
        'Apron',
        'Belt',
        'Cardigan',
        'Dress',
        'Earrings',
        'Fur coat',
        'Gloves',
        'Hat'
    ],
    inputValue: '',
    activeIndex: null,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case ITEM_EDIT:
            return {
                ...state,
                inputValue: state.clothes[action.payload],
                activeIndex: action.payload,
            };
        case INPUT_VALUE_CHANGE:
            return {
                ...state,
                inputValue: action.payload
            };
        case ITEM_REMOVE:
            return {
                ...state,
                clothes: state.clothes.filter((clothe, index) => index !== state.activeIndex)
            };
        case ITEM_UPDATE:
            return {
                clothes: state.clothes.map((clothe, index) => {
                    if (index === state.activeIndex) {
                        clothe = state.inputValue;
                    }
                    return clothe;
                }),
                inputValue: '',
                activeIndex: null,
            };
        default:
            return state;
    }
}

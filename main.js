const ACTION_UPDATE_ITEM = 'actionUpdateItem';
const ACTION_EDIT_ITEM = 'actionEditItem';
const ACTION_CHANGE_INPUT_VALUE = 'actionChangeInputValue';
const ul = document.getElementById('ul');
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
    textIndex: null,
};

const actionEditItem = payload => {
    return {
        type: ACTION_EDIT_ITEM,
        payload
    };
};

const actionUpdateItem = () => {
    return {
        type: ACTION_UPDATE_ITEM
    };
};

const actionChangeInputValue = payload => {
    return {
        type: ACTION_CHANGE_INPUT_VALUE,
        payload,
    }
};

const store = Redux.createStore(reducer);

function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_EDIT_ITEM :
            return {
                ...state,
                inputValue: state.clothes[action.payload],
                textIndex: action.payload,
            };
        case ACTION_CHANGE_INPUT_VALUE :
            return {
                ...state,
                inputValue: action.payload
            };
        case ACTION_UPDATE_ITEM :
            state.clothes[state.textIndex] = state.inputValue;

            if (state.inputValue.trim() === '') {
                state.clothes.splice(state.textIndex, 1);
            }
            return {
                clothes: state.clothes,
                inputValue: '',
                textIndex: null,
            };
        default :
            return state;
    }
}

function render() {
    const { clothes, textIndex, inputValue} = store.getState();
    const container = ul;

    while (container.firstChild) {
        ul.removeChild(container.firstChild);
    }

    clothes.forEach((clothe, index) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'item');

        if (textIndex !== index) {
            const span = document.createElement('span');
            const link = document.createElement('a');

            span.textContent = clothe;
            link.textContent = 'Edit';
            link.setAttribute('class', 'edit');

            link.addEventListener('click', () =>
                store.dispatch(actionEditItem(index)));

            li.appendChild(span);
            li.append(link);
            ul.append(li)
        }
        if (textIndex === index) {
            const input = document.createElement('input');
            input.value = inputValue;
            input.addEventListener('input', event =>
                store.dispatch(actionChangeInputValue(event.target.value)));
            input.addEventListener('keydown', event => {
                if (event.key === "Enter") {
                    store.dispatch(actionUpdateItem())
                }
            });

            li.append(input);
            ul.append(li)
        }

        if (document.querySelector('input')) {
            document.querySelector('input').focus()
        }
    });
}

store.subscribe(() => {
    render();
});

document.addEventListener('load', render());

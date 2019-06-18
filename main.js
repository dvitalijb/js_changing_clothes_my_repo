const ACTION_UPDATE_ITEM = 'actionUpdateItem';
const ACTION_EDIT_ITEM = 'actionEditItem';
const ACTION_CHANGE_INPUT_VALUE = 'actionChangeInputValue';
const ul = document.getElementById('ul');
let InitialState = {
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
    editItemText: '',
};

const actionEditItem = editItemText => {
    return {
        type: ACTION_EDIT_ITEM,
        editItemText
    };
};

const actionUpdateItem = {
    type: ACTION_UPDATE_ITEM
};

const actionChangeInputValue = value => {
    return {
        type: ACTION_CHANGE_INPUT_VALUE,
        value,
    }
};

const store = Redux.createStore(getNextState);

function getNextState(state = InitialState, action) {
    let newState;

    switch (action.type) {
        case ACTION_EDIT_ITEM :
            newState = {
                ...state,
                inputValue: action.editItemText,
                editItemText: action.editItemText
            };
            break;
        case ACTION_CHANGE_INPUT_VALUE :
            newState = {
                ...state,
                inputValue: action.value
            };
            break;
        case ACTION_UPDATE_ITEM :
            if (state.inputValue.trim() === '') {
                const index = state.clothes.indexOf(state.editItemText);
                state.clothes.splice(index, 1)
            }
            newState = {
                clothes: state.clothes.map(clothe => {
                    if (state.editItemText === clothe) {
                        return state.inputValue;
                    }
                    return clothe;
                }),
                inputValue: '',
                editItemText: ''
            };
            break;
        default :
            newState = state;
    }

    return newState;
}

function showClothes() {
    const container = ul;

    while(container.firstChild) {
        ul.removeChild(container.firstChild);
    }

    store.getState().clothes.forEach(clothe => {
        const li = document.createElement('li');
        li.setAttribute('class', 'item');

        if (store.getState().editItemText !== clothe) {
            const span = document.createElement('span');
            const link = document.createElement('a');

            span.textContent = clothe;
            link.textContent = 'Edit';
            link.setAttribute('class', 'edit');

            link.addEventListener('click', event =>
                store.dispatch(actionEditItem(event.target.parentElement.children[0].textContent)));

            li.appendChild(span);
            li.append(link);
            ul.append(li)
        }
        if (store.getState().editItemText === clothe) {
            const input = document.createElement('input');
            input.value = store.getState().inputValue;
            input.addEventListener('input', event =>
                store.dispatch(actionChangeInputValue(event.target.value)));
            input.addEventListener('keydown', event => {
                if (event.key === "Enter") {
                    store.dispatch(actionUpdateItem)
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
    showClothes();
});

document.addEventListener('load', showClothes());

import {store} from './store.js';
import {
    itemEdit,
    inputValueChange,
    itemRemove,
    itemUpdate,
} from './actions.js';

const container = document.getElementById('container');

export function render() {
    const { clothes, activeIndex, inputValue } = store.getState();

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    clothes.forEach((clothe, index) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'item');

        if (activeIndex !== index) {
            const span = document.createElement('span');
            const editButton = document.createElement('button');

            span.textContent = clothe;
            editButton.textContent = 'Edit';

            editButton.setAttribute('class', 'edit');

            editButton.addEventListener('click', () => store
                .dispatch(itemEdit(index))
            );

            li.appendChild(span);
            li.append(editButton);
            container.append(li);
        }
        if (activeIndex === index) {
            const input = document.createElement('input');
            input.value = inputValue;
            input.addEventListener('input', event => store
                .dispatch(inputValueChange(event.target.value))
            );
            input.addEventListener('keydown', event => {
                if (event.key === "Enter") {
                    if (event.target.value.trim() === '') {
                        store.dispatch(itemRemove());
                    }
                    store.dispatch(itemUpdate());
                }
            });

            li.append(input);
            container.append(li);
        }

        if (document.querySelector('input')) {
            document.querySelector('input').focus()
        }
    });
}

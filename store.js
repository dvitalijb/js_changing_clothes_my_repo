import { render } from "./render.js";
import { reducer } from "./reducer.js";

export const store = Redux.createStore(reducer);
store.subscribe(() => {
    render();
});
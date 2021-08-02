

import { Action, Reducer} from "redux";

export const ACTIONS = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT"

}
const initialState = 0;
const changeNumber: Reducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case ACTIONS.INCREMENT: return state + 1;
        case ACTIONS.DECREMENT: return state - 1;
        default : return state;
    }
}

export default changeNumber;

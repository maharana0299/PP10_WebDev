
import { Action, ActionCreator } from "redux"

export const incNumber = (): Action => {
    return {
        type: "INCREMENT"
    }
}

export const decNumber = (): Action => {
    return {
        type: "DECREMENT"
    }
}
import { OPEN_MODAL, CLOSE_MODAL, CHANGE_NAME, OPEN_CUSTOMIZE_CHARACTER, CLOSE_CUSTOMIZE_CHARACTER } from "./actions"

const reducer = (state, action) => {


    if (action.type === CLOSE_MODAL) {
        return { ...state, modal: false }
    }

    if (action.type === OPEN_MODAL) {
        return { ...state, modal: true }
    }

    if (action.type === CHANGE_NAME) {
        return { ...state, name: action.payload }
    }

    if (action.type === OPEN_CUSTOMIZE_CHARACTER) {
        return { ...state, customizeCharacter: true }
    }

    if (action.type === CLOSE_CUSTOMIZE_CHARACTER) {
        return { ...state, customizeCharacter: false }
    }

    return state
}

export default reducer
import { OPEN_MODAL, CLOSE_MODAL, CHANGE_NAME, OPEN_CUSTOMIZE_CHARACTER, CLOSE_CUSTOMIZE_CHARACTER, ADD_TO_DO, SET_TO_DO_VALUE, REMOVE_TO_DO_ITEM, INCREASE_EXPERIENCE } from "./actions"

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

    if (action.type === SET_TO_DO_VALUE) {

        return { ...state, TO_DO_Input_Value: action.payload }
    }

    if (action.type === ADD_TO_DO) {

        let change = { name: action.payload, id: new Date().getTime() }

        return { ...state, To_Do_List: state.To_Do_List.concat(change) }
    }

    if (action.type === REMOVE_TO_DO_ITEM) {

        let change = state.To_Do_List.filter((item) => item.id !== action.payload)

        return { ...state, To_Do_List: change }
    }

    if (action.type === INCREASE_EXPERIENCE) {

        let change = state.characterStats.map((singleStat) => {
            return { ...singleStat, experience: Math.floor((singleStat.experience + 1.3) * 100) / 100 }
        })


        console.log(change)

        return { ...state, characterStats: change }
    }

    return state
}

export default reducer
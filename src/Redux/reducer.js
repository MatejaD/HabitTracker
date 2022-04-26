import { act } from "react-dom/test-utils"
import { OPEN_MODAL, CLOSE_MODAL, CHANGE_NAME, OPEN_CUSTOMIZE_CHARACTER, CLOSE_CUSTOMIZE_CHARACTER, ADD_TO_LIST, SET_TO_DO_VALUE, REMOVE_TO_DO_ITEM, INCREASE_EXPERIENCE, REMOVE_NOTIFICATION, COMPLETE_ITEM, INCREASE_COINS, OPEN_SETTINGS, REMOVE_FROM_LIST, LEVEL_UP } from "./actions"

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

        console.log(action.secondPayload)

        return { ...state, TO_DO_Input_Value: action.payload }
    }

    if (action.type === ADD_TO_LIST) {


        // secondPayload --- To_Do_List
        let skrpa = action.list
        let change = skrpa.concat({ name: action.payload, id: new Date().getTime(), settings: false })

        if (action.list === state.To_Do_List) {
            return { ...state, To_Do_List: change }
        }
        else if (action.list === state.Daily_Task_List) {
            return { ...state, Daily_Task_List: change }
        }
        else if (action.list === state.Habit_List) {
            return { ...state, Habit_List: change }
        }
        return { ...state }
    }

    if (action.type === REMOVE_FROM_LIST) {

        let list = action.list
        let change = list.filter((item) => item.id !== action.payload)

        console.log(change)
        if (action.list === state.To_Do_List) {
            return { ...state, To_Do_List: change }
        }
        else if (action.list === state.Daily_Task_List) {
            return { ...state, Daily_Task_List: change }
        }
        else if (action.list === state.Habit_List) {
            return { ...state, Habit_List: change }
        }

        return { ...state }
    }


    if (action.type === COMPLETE_ITEM) {

        // secondPayload --- To_Do_List

        let change = action.secondPayload.filter((item) => item.id !== action.payload)
        let notification = state.notifications.concat('experience', 'coins')

        if (action.secondPayload === state.To_Do_List) {
            return { ...state, To_Do_List: change, notifications: notification }
        }
        else if (action.secondPayload === state.Daily_Task_List) {
            return { ...state, Daily_Task_List: change }
        }
        else if (action.secondPayload === state.Habit_List) {
            return { ...state, Habit_List: change, }
        }


        return { ...state, notification: state.notification.push('New Notification') }


        return { ...state, Daily_Task_List: change }
    }

    if (action.type === INCREASE_EXPERIENCE) {
        let change = state.characterStats.map((singleStat) => {
            return { ...singleStat, experience: Math.floor((singleStat.experience + action.payload) * 100 / 100) }
        })
        return { ...state, characterStats: change }
    }

    if (action.type === LEVEL_UP) {

        // let change = state.characterStats.map((singleStat) => {
        //     if (state.characterStats[2].experience === state.characterStats[2].maxExperience) {
        //         return { ...singleStat, experience: 0 }
        //     }

        // })

        return { ...state, characterStats: change }
    }

    if (action.type === INCREASE_COINS) {
        let change = (Math.floor((state.coins + action.payload) * 100) / 100)
        console.log(change)
        return { ...state, coins: change }
    }

    if (action.type === REMOVE_NOTIFICATION) {

        let change = state.notifications.filter((item, index) => index !== 0)

        return { ...state, notifications: change }
    }

    if (action.type === OPEN_SETTINGS) {

        let change = action.list.map((item) => {
            if (item.id === action.payload) {
                return { ...item, settings: !item.settings }
            }
            else {
                return { ...item, settings: false }
            }
        })

        if (action.list === state.To_Do_List) {
            return { ...state, To_Do_List: change, }
        }
        else if (action.list === state.Daily_Task_List) {
            return { ...state, Daily_Task_List: change }
        }
        else if (action.list === state.Habit_List) {
            return { ...state, Habit_List: change, }
        }


        return { ...state }
    }

    return state
}

export default reducer
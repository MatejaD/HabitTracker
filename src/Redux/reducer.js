import { act } from "react-dom/test-utils"
import { OPEN_MODAL, CLOSE_MODAL, CHANGE_NAME, OPEN_CUSTOMIZE_CHARACTER, CLOSE_CUSTOMIZE_CHARACTER, ADD_TO_LIST, SET_TO_DO_VALUE, REMOVE_TO_DO_ITEM, INCREASE_EXPERIENCE, REMOVE_NOTIFICATION, COMPLETE_ITEM, INCREASE_COINS, OPEN_SETTINGS, REMOVE_FROM_LIST, LEVEL_UP, INCREASE_COUNTER, SHOW_NOTIFICATION, DECREASE_COUNTER, DECREASE_HEALTH, CLOSE_LVL_MODAL, OPEN_LVL_MODAL, OPEN_NO_HEALTH_MODAL, CLOSE_NO_HEALTH_MODAL, CHECK_OUT_DAILY_TASK, RESET_CHECK_OUT, DECREASE_COINS, DECREASE_EXPERIENCE, TO_BOTTOM, CLOSE_SETTINGS, SHOW_SETTINGS_ICON } from "./actions"

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

    if (action.type === CLOSE_LVL_MODAL) {
        return { ...state, lvlUpModal: false }
    }
    if (action.type === OPEN_LVL_MODAL) {
        return { ...state, lvlUpModal: true }
    }
    if (action.type === OPEN_NO_HEALTH_MODAL) {

        let change = state.characterStats.map((stat) => {
            if (stat.level > 1) {
                return { ...stat, health: 50, level: stat.level - 1, experience: 0, }
            }
            else {
                return { ...stat, health: 50, experience: 0 }
            }
        })
        return { ...state, noHealthModal: true, characterStats: change }
    }
    if (action.type === CLOSE_NO_HEALTH_MODAL) {
        return { ...state, noHealthModal: false, }
    }

    if (action.type === SET_TO_DO_VALUE) {

        console.log(action.secondPayload)

        return { ...state, TO_DO_Input_Value: action.payload }
    }

    if (action.type === ADD_TO_LIST) {


        // secondPayload --- To_Do_List
        let skrpa = action.list
        let change = skrpa.concat({
            name: action.payload,
            id: new Date().getTime(),
            // Habit List
            increaseCounter: 0,
            decreaseCounter: 0,
            // ---------- //
            // Daily Task List
            isCheckedOut: false,
            DailyCounter: 0,
            // ------------//
            // ITEM SETTINGS
            settings: false,
            showSettingsIcon: false

        })

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

        if (action.secondPayload === state.To_Do_List) {
            return { ...state, To_Do_List: change }
        }
        else if (action.secondPayload === state.Daily_Task_List) {
            return { ...state, Daily_Task_List: change }
        }
        else if (action.secondPayload === state.Habit_List) {
            return { ...state, Habit_List: change, }
        }


        // return { ...state, notification: state.notification.push('New Notification') }


        return { ...state, Daily_Task_List: change }
    }

    if (action.type === CHECK_OUT_DAILY_TASK) {



        let change = state.Daily_Task_List.map((item) => {
            if (item.id === action.payload) {
                if (item.isCheckedOut) {


                    return { ...item, isCheckedOut: !item.isCheckedOut, DailyCounter: item.DailyCounter - 1 }
                }
                if (!item.isCheckedOut) {

                    return { ...item, isCheckedOut: !item.isCheckedOut, DailyCounter: item.DailyCounter + 1 }
                }
            }
            else {
                return { ...item }
            }

        })




        console.log(change)

        return { ...state, Daily_Task_List: change }
    }

    if (action.type === RESET_CHECK_OUT) {

        let change = state.Daily_Task_List.map((item) => {
            return { ...item, isCheckedOut: false }
        })

        return { ...state, Daily_Task_List: change }
    }

    if (action.type === INCREASE_EXPERIENCE) {
        let change = state.characterStats.map((singleStat) => {
            return {
                ...singleStat,
                experience: Math.floor((singleStat.experience + action.payload) * 100 / 100),
            }
        })
        return { ...state, characterStats: change, notifications: state.notifications.concat({ exp: 'experience', amount: action.payload, type: 'increase' }) }
    }

    if (action.type === DECREASE_EXPERIENCE) {
        let change = state.characterStats.map((singleStat) => {
            return {
                ...singleStat,
                experience: Math.floor((singleStat.experience - action.payload) * 100 / 100),
            }
        })
        return { ...state, characterStats: change, notifications: state.notifications.concat({ exp: 'experience', amount: action.payload, type: 'decrease' }) }
    }

    if (action.type === LEVEL_UP) {

        let change = state.characterStats.map((singleStat) => {
            if (state.characterStats[2].experience >= state.characterStats[2].maxExperience) {
                return { ...singleStat, experience: 0, maxExperience: singleStat.maxExperience + 10, level: singleStat.level + 1 }
            }
            return { ...singleStat }

        })

        return { ...state, characterStats: change }
    }

    if (action.type === INCREASE_COINS) {
        let change = (Math.floor((state.coins + action.payload) * 100) / 100)
        return {
            ...state, coins: change, notifications: state.notifications.concat({
                coins: 'coins',
                amount: action.payload,
                type: 'increase'
            })
        }
    }

    if (action.type === DECREASE_COINS) {
        let change = (Math.floor((state.coins - action.payload) * 100) / 100)
        return {
            ...state, coins: change, notifications: state.notifications.concat({
                coins: 'coins',
                amount: action.payload,
                type: 'decrease'
            })
        }
    }

    // if (action.type === SHOW_NOTIFICATION) {

    //     return { ...state, notifications: state.notifications.concat({
    //         exp:'experience',
    //         amount: action.payload
    //     }) }
    // }

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

    if (action.type === CLOSE_SETTINGS) {

        let change = action.list.map((item) => {
            return { ...item, settings: false, showSettingsIcon: false }
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


        return { ...state, }
    }

    if (action.type === SHOW_SETTINGS_ICON) {

        let change = action.list.map((item) => {
            if (item.id === action.payload) {
                return { ...item, showSettingsIcon: true }
            }
            else {
                return { ...item, showSettingsIcon: false }
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
        return { ...state, }
    }

    if (action.type === INCREASE_COUNTER) {

        let change = state.Habit_List.map((item, index) => {
            if (action.payload === item.id) {
                return { ...item, increaseCounter: item.increaseCounter + 1 }
            }
            else {
                return { ...item }
            }

        })

        return { ...state, Habit_List: change }
    }

    if (action.type === DECREASE_COUNTER) {

        let change = state.Habit_List.map((item, index) => {
            if (action.payload === item.id) {
                return { ...item, decreaseCounter: item.decreaseCounter - 1 }
            }
            else {
                return { ...item }
            }

        })

        return { ...state, Habit_List: change }
    }

    if (action.type === DECREASE_HEALTH) {

        let change = state.characterStats.map((stats) => {

            return { ...stats, health: stats.health - action.payload }
        })


        return { ...state, characterStats: change, notifications: state.notifications.concat({ health: 'health', amount: action.payload }) }
    }

    if (action.type === TO_BOTTOM) {
        let list = action.list
        // list.sort((a, b) => {
        //     return b.id - a.id
        // })

        let pickedItem = list.find((item) => item.id === action.payload)
        pickedItem.settings = false
        pickedItem.showSettingsIcon = false
        let filter = list.filter((item) => item.id !== action.payload)

        let change = [...filter.concat(pickedItem)]

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

    return state
}

export default reducer
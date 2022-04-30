

const initalState = {
    name: 'skrpa',
    modal: false,
    customizeCharacter: false,
    lvlUpModal: false,
    noHealthModal: false,

    notifications: [],
    // To_Do
    To_Do_Input_Value: '',
    To_Do_List: [

    ],
    // Daily_Task
    Daily_Task_Input_Value: '',
    Daily_Task_List: [

    ],

    // Habit
    Habit_Input_Value: '',
    Habit_List: [

    ],
    characterStats: [
        {
            health: 50,
            maxHealth: 50,
        },

        {
            hunger: 50,
            maxHunger: 50,
        },

        {
            experience: 0,
            maxExperience: 200,
        },
        {
            level: 1
        }

    ],
    coins: 0.00


}

export default initalState
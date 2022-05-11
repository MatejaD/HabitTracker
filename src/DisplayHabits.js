import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// Components
import Habits from "./Components/HabitComponents/Habits";
import { db } from "./Firebase/firebase";
import { arrayUnion } from "firebase/firestore";

export default function DisplayHabits() {


    const state = useSelector(state => state)

    // To-Do
    const To_Do_Listt = useSelector(state => state.To_Do_List)
    const To_Do_Input_Value = useSelector(state => state.To_Do_Input_Value)
    const experience = useSelector(state => state.characterStats[2].experience)

    // Daily Task
    const Daily_Task_List = useSelector(state => state.Daily_Task_List)
    const Daily_Task_Input_Value = useSelector(state => state.Daily_Task_Input_Value)


    // Daily Task
    const Habit_List = useSelector(state => state.Habit_List)
    const Habit_Input_Value = useSelector(state => state.Habit_Input_Value)

    // FIREBASE
    // dispatch = useDispatch()
    const [firebaseDB, setFirebaseDB] = useState(Daily_Task_List)
    const usersCollectionRef = collection(db, 'users')
    const userUID = useSelector(state => state.userUID)
    const getData = async () => {
        const data = await getDocs(usersCollectionRef)
        let dataValue = data.docs.map((doc) => ({ ...doc.data() }))
        console.log(dataValue[0].Daily_Task_List)
        console.log(userUID)
        await setDoc(doc(db, 'users', userUID), {
            Daily_Task_List: { ...Daily_Task_List, }
        })
        setFirebaseDB(dataValue[0].Daily_Task)

        // updateDoc(doc(db, 'users', userUID),
        //     arrayUnion({ name: 'Lolara' })
        // )
    }




    return (
        <div className='flex justify-evenly gap-4 py-4 items-top ml-4 min-h-0 w-11/12  '>
            <button onClick={getData}>Get Data</button>
            <button onClick={() => {
                useDispatch({ type: 'SET_DB_VALUE', payload: firebaseDB })

            }}>Load</button>
            <Habits

                taskList={Habit_List}
                taskName={'Habit'}
                taskAction={Habit_Input_Value}
                characterStat={experience}
                placeHolder={'Add a Habit'}
                skrr={<h2>skrrrr</h2>}
            />

            <Habits
                taskList={Daily_Task_List}
                taskName={'Daily Task'}
                taskAction={Daily_Task_Input_Value}
                characterStat={experience}
                placeHolder={'Add a Daily'}
                skrr={<h2>skrrrr</h2>}

            />

            <Habits
                taskList={To_Do_Listt}
                taskName={'To Do'}
                taskAction={To_Do_Input_Value}
                characterStat={experience}
                placeHolder={'Add a To-Do'}
                skrr={<h2>skrrrr</h2>}

            />


        </div>
    )
}

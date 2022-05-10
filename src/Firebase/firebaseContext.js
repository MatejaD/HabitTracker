import React, { createContext, useEffect } from 'react'
import firebaseConfig from './firebaseConfig';
import app from 'firebase/app'
import 'firebase/database';
import { useDispatch } from 'react-redux';

const FirebaseContext = createContext(null)

export {FirebaseContext}

export default ({ children }) => {
    let firebase = {
        app: null,
        database: null
    }

    const dispatch = useDispatch()

    if (!app.apps.length) {
        app.initializeApp(firebaseConfig);
        firebase = {
            app: app,
            database: app.database(),

            api: {
                getTodos
            }
        }
    }

    // function to query Todos from the database and
    // fire a Redux action to update the items in real-time
    function getTodos() {
        firebase.database.ref('todos').on('value', (snapshot) => {
            const vals = snapshot.val();
            let _records = [];
            for (var key in vals) {
                _records.push({
                    ...vals[key],
                    id: key
                });
            }
            // setTodos is a Redux action that would update the todo store
            // to the _records payload
            dispatch(setTodos(_records));
        })
    }

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )
}
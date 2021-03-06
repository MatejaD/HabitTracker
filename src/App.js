// Components 
import Sidebar from './Components/Sidebar';
import CharacterStats from './Components/CharacterStats';
import { useState, useEffect, useRef } from 'react';
import Modal from './Components/Modals/Modal';
import CustomizeCharacter from './Components/Modals/CustomizeCharacter';
import LvlUpModul from './Components/Modals/LvlUpModul';
import Shop from './Components/Shop';
import Calendar from 'react-calendar'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_SETTINGS, OPEN_LVL_MODAL, OPEN_MODAL, OPEN_NO_HEALTH_MODAL, REMOVE_LOADING_SCREEN, REMOVE_NOTIFICATION, RESET_CHECK_OUT, SET_EDIT_TASK, SET_NAME } from './Redux/actions';
// Router
import { useLocation, useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage';
import CalendarPage from './Components/CalendarPage';
// Icons
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { BsCoin, BsHeartFill, } from 'react-icons/bs'
import NoHealthModal from './Components/Modals/NoHealthModal';
import EditingTab from './Components/HabitComponents/EditingTab';
// Google Auth
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import { gapi } from 'gapi-script';
import Loading from './Components/Loading';

// Firestore DB
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './Firebase/firebase'
import { initalState } from './Redux/initalState';
import { auth, provider } from './Firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { arrayUnion } from 'firebase/firestore';

const clientID = '286571261070-cjkoe7gk3mo32h375e6t43qla80k205u.apps.googleusercontent.com'

function App() {


  // const [data, setData] = useState([])

  // // Firestore DB
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const usersCollectionRef = collection(db, 'users')
  const getUsers = async () => {

    const data = await getDocs(usersCollectionRef)
    dispatch({ type: 'USERS', payload: data })
    dispatch({ type: 'SET_DB', payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) })
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {

    getUsers()
  }, [])

  const createUser = async () => {
    let docRef = doc(db, 'users', 'NEW ID')
    await setDoc(docRef, { email: 'EDITED' })
    dispatch({ type: REMOVE_LOADING_SCREEN })
    await getUsers()
  }


  // Google Auth

  useEffect(() => {

    // function start() {
    //   gapi.client.init({
    //     clientId: clientID,
    //     scope: ''
    //   })
    // }
    // gapi.load('client:auth2', start)

  }, [])


  // MODALS
  const modal = useSelector(state => state.modal)
  const customizeCharacter = useSelector(state => state.customizeCharacter)
  const lvlUpModal = useSelector(state => state.lvlUpModal)
  const noHealthModal = useSelector(state => state.noHealthModal)
  // EXP
  const experience = useSelector(state => state.characterStats[2].experience)
  const maxExperience = useSelector(state => state.characterStats[2].maxExperience)
  // HEALTH
  const health = useSelector(state => state.characterStats[0].health)
  const maxHealth = useSelector(state => state.characterStats[0].maxHealth)

  // Loading
  const isLoading = useSelector(state => state.isLoading)

  const dispatch = useDispatch()


  function setCookie(c_name, value, exdays) { var exdate = new Date(); exdate.setDate(exdate.getDate() + exdays); var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()); document.cookie = c_name + "=" + c_value; }
  function getCookie(c_name) { var c_value = document.cookie; var c_start = c_value.indexOf(" " + c_name + "="); if (c_start == -1) { c_start = c_value.indexOf(c_name + "="); } if (c_start == -1) { c_value = null; } else { c_start = c_value.indexOf("=", c_start) + 1; var c_end = c_value.indexOf(";", c_start); if (c_end == -1) { c_end = c_value.length; } c_value = unescape(c_value.substring(c_start, c_end)); } return c_value; }
  function checkSession() {
    const c = getCookie("visited");
    if (c === "yes") {
      // If user refrehes the page
      if (performance.navigation.type == PerformanceNavigation.TYPE_RELOAD) {
      }
      else {
        console.log('welcome back')
      }
    } else {
      alert("Welcome new visitor!");
      // Might need fixing!!!!!
      dispatch({ type: OPEN_MODAL })

    }
    setCookie("visited", "yes", null); // expire in 1 year; or use null to never expire
  }
  checkSession();

  useEffect(() => {
    if (experience >= maxExperience) {
      dispatch({ type: OPEN_LVL_MODAL })

    }
  }, [experience])

  useEffect(() => {
    if (health <= 0) {
      dispatch({ type: OPEN_NO_HEALTH_MODAL })
    }
  }, [health])

  const [isEmailExistent, setIsEmailExistent] = useState(true)

  // USERS ID
  const userUID = useSelector(state => state.userUID)
  // FIREBASE

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem('isLoggedIn', true)
        let docRef = doc(db, 'users', res.user.uid)
        console.log(res)
        setDoc(docRef, { email: res.user.email, name: res.user.displayName })
        dispatch({type:'SET_USER_UID', payload: res.user.uid})
        dispatch({type:SET_NAME, payload:res.user.displayName})
        getUsers()
        
      })
  }

  

  return (
    <main className='w-screen bg-blue-500  relative  flex flex-col justify-start gap-4 items-center min-h-screen p-4  '>
      <Sidebar />

      <button onClick={signInWithGoogle}>SIGN IN</button>
      {/* {
        users.map((user) => {
          return <h2>{user.name}</h2>
        })
      } */}

      <button onClick={() => createUser()
      }>Add User</button>

      <Login />
      <Logout />

      {
        isLoading ? <Loading /> : ''
      }

      {
        modal ? <Modal /> : ''
      }

      {
        customizeCharacter ? <Route path='/' element={<CustomizeCharacter />} /> : ''
      }
      {
        lvlUpModal ? <LvlUpModul /> : ''
      }
      {
        noHealthModal ? <NoHealthModal /> : ''

      }

      <Content />

    </main>
  );
}


function Content() {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");



  // useEffect(() => {
  //   if (location !== displayLocation) setTransistionStage("fadeOut");
  // }, [location, displayLocation]);



  // NOTIFICATION FOR EXPERIENCE AFTER COMPLETING A TO-DO
  const experience = useSelector(state => state.characterStats[2].experience)
  const notifcations = useSelector(state => state.notifications)
  const [notification, setNotification] = useState(false)
  const firstUpdate = useRef(true);

  // LISTS
  const Daily_Task_List = useSelector(state => state.Daily_Task_List)
  const Habit_List = useSelector(state => state.Habit_List)
  const To_Do_List = useSelector(state => state.To_Do_List)


  const dispatch = useDispatch()

  let array = [1, 2, 3]


  let notificationArray = notifcations.slice(0, 6)


  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    else {
      if (notifcations.length < 8) {
        let timeout = setInterval(() => {
          dispatch({ type: REMOVE_NOTIFICATION })
        }, 700);
        return () => clearInterval(timeout)

      }

      else if (notifcations.length >= 8) {
        let timeout = setInterval(() => {

          dispatch({ type: REMOVE_NOTIFICATION })
        }, 0);
        return () => clearInterval(timeout)

      }

    }
  }, [notificationArray])


  // RESET THE DAILY CHECK OUT EVERY 24H (NEEDS FIXING!)
  // SOLVE WITH https://docs.netlify.com/netlify-labs/experimental-features/scheduled-functions/
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    else {
      let timeout = setInterval(() => {
        dispatch({ type: RESET_CHECK_OUT })
      }, 86400000);
      return () => clearInterval(timeout)
    }

  }, [])





  const [inputValue, setInputValue] = useState('')


  const usersCollectionRef = collection(db, 'initialState')

  const [state, setState] = useState([])


  useEffect(() => {
    const getState = async () => {
      const data = await getDocs(usersCollectionRef)
      // dispatch({ type: 'USERS', payload: data })
      setState(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getState()
  }, [])




  return (
    <>

      <EditingTab taskList={Daily_Task_List} />
      <EditingTab taskList={Habit_List} />
      <EditingTab taskList={To_Do_List} />



      <div
        className={`${transitionStage} w-screen bg-blue-500   flex flex-col justify-center gap-4 items-center min-h-screen px-4 `}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}
      >

        <div className='fixed top-3 right-5 w-48 min-h-16 z-10 flex flex-col gap-2'>
          {/* Map through the array of notifications */}
          {notificationArray.map((notificationn) => {
            if (notificationn.exp === 'experience') {
              return (
                <div className={` flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10  border  ${notificationn.type === 'increase' ? 'bg-green-500 border-green-300' : 'bg-red-500 border-red-400'}`}>
                  <h2>{notificationn.type === 'increase' ? '+' : '-'} {(notificationn.amount).toFixed(2)} Experience</h2>
                  <span className='text-yellow-400 text-3xl '><AiFillStar /></span>
                </div>
              )
            }
            else if (notificationn.coins === 'coins') {
              return (
                <div className={`flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10 border  ${notificationn.type === 'increase' ? 'bg-green-500 border-green-300' : 'bg-red-500 border-red-400'}`}>
                  <h2>{notificationn.type === 'increase' ? '+' : '-'} {(notificationn.amount).toFixed(2)} Coins</h2>
                  <span className='text-yellow-400 text-3xl '><BsCoin /></span>
                </div>
              )
            }
            else if (notificationn.health === 'health') {
              return (
                <div className={`flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10  border  ${notificationn.type === 'increase' ? 'bg-green-500 border-green-300' : 'bg-red-500 border-red-400'}`}>
                  <h2>- {(notificationn.amount).toFixed(2)} Health</h2>
                  <span className='text-red-700 text-3xl '><BsHeartFill /></span>
                </div>
              )

            }

          })}

        </div>






        <Routes location={displayLocation}>
          <Route path='/' element={<MainPage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='*' element={<Calendar />} />
        </Routes>
      </div >
    </>

  );
}


export default (App);

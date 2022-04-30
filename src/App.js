// Components 
import Sidebar from './Components/Sidebar';
import CharacterStats from './Components/CharacterStats';
import { useState, useEffect, useRef } from 'react';
import Modal from './Components/Modals/Modal';
import CustomizeCharacter from './Components/Modals/CustomizeCharacter';
import LvlUpModul from './Components/Modals/LvlUpModul';
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_LVL_MODAL, OPEN_MODAL, OPEN_NO_HEALTH_MODAL, REMOVE_NOTIFICATION } from './Redux/actions';
// Router
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage';
import CalendarPage from './Components/CalendarPage';
// Icons
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { BsCoin, BsHeartFill } from 'react-icons/bs'
import NoHealthModal from './Components/Modals/NoHealthModal';




function App() {


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

  return (
    <main className="relative font-body w-screen min-h-screen   flex justify-center items-center bg-green-400">
      <Sidebar />

      {
        modal ? <Route path='/' element={<Modal />} /> : ''
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

  const To_Do_List = useSelector(state => state.To_Do_List)


  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  // NOTIFICATION FOR EXPERIENCE AFTER COMPLETING A TO-DO
  const experience = useSelector(state => state.characterStats[2].experience)
  const notifcations = useSelector(state => state.notifications)
  const [notification, setNotification] = useState(false)
  const firstUpdate = useRef(true);

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

      if (notifcations.length >= 8) {
        let timeout = setInterval(() => {

          dispatch({ type: REMOVE_NOTIFICATION })
        }, 100);
        return () => clearInterval(timeout)

      }

    }
  }, [notificationArray])

  return (
    <div
      className={`${transitionStage}flex relative flex-col items-start justify-start w-full ml-2 min-h-screen h-screen`}
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
          console.log(notificationn)
          if (notificationn.exp === 'experience') {
            return (
              <div className={`flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10 bg-green-500 border-green-300 border  ${notificationn ? 'pop-down' : 'pop-up'}`}>
                <h2>+ {(notificationn.amount).toFixed(2)} Experience</h2>
                <span className='text-yellow-400 text-3xl '><AiFillStar /></span>
              </div>
            )
          }
          else if (notificationn.coins === 'coins') {
            return (
              <div className={`flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10 bg-green-500 border-green-300 border  ${notificationn ? 'pop-down' : 'pop-up'}`}>
                <h2>+ {(notificationn.amount).toFixed(2)} Coins</h2>
                <span className='text-yellow-400 text-3xl '><BsCoin /></span>
              </div>
            )
          }
          else if (notificationn.health === 'health') {
            return (
              <div className={`flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10 bg-red-500 border-red-400 border  ${notificationn ? 'pop-down' : 'pop-up'}`}>
                <h2>- {(notificationn.amount).toFixed(2)} Health</h2>
                <span className='text-red-700 text-3xl '><BsHeartFill /></span>
              </div>
            )

          }

        })}

      </div>


      <Routes location={displayLocation}>
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/' element={<MainPage />} />
      </Routes>
    </div >
  );
}


export default (App);

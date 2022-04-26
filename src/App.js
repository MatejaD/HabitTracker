// Components 
import Sidebar from './Components/Sidebar';
import CharacterStats from './Components/CharacterStats';
import { useState, useEffect, useRef } from 'react';
import Modal from './Components/Modal';
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_MODAL, REMOVE_NOTIFICATION } from './Redux/actions';
import CustomizeCharacter from './Components/CustomizeCharacter';
// Router
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage';
import CalendarPage from './Components/CalendarPage';
// Icons
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { BsCoin } from 'react-icons/bs'





function App() {



  const modal = useSelector(state => state.modal)
  const customizeCharacter = useSelector(state => state.customizeCharacter)
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

  return (
    <main className="relative font-body w-screen min-h-screen   flex justify-center items-center bg-green-400">
      <Sidebar />

      {
        modal ? <Route path='/' element={<Modal />} /> : ''
      }

      {
        customizeCharacter ? <Route path='/' element={<CustomizeCharacter />} /> : ''
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
  const notifcationArray = useSelector(state => state.notifications)
  const [notification, setNotification] = useState(false)
  const firstUpdate = useRef(true);

  const dispatch = useDispatch()

  let array = [1, 2, 3]




  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    else {

      let timeout = setInterval(() => {
        dispatch({ type: REMOVE_NOTIFICATION })
      }, 1500);
      return () => clearInterval(timeout)
    }
  }, [notifcationArray])

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
        {notifcationArray.map((notificationn) => {
          if (notificationn === 'experience') {
            return (
              <div className={`flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10 bg-green-500 border-green-300 border  ${notificationn ? 'pop-down' : 'pop-up'}`}>
                <h2>+ 3 Experience</h2>
                <span className='text-yellow-400 text-3xl '><AiFillStar /></span>
              </div>
            )
          }
          else if (notificationn === 'coins') {
            return (
              <div className={`flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10 bg-green-500 border-green-300 border  ${notificationn ? 'pop-down' : 'pop-up'}`}>
                <h2>+ 0.4 Coins</h2>
                <span className='text-yellow-400 text-3xl '><BsCoin /></span>
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

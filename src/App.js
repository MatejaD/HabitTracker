// Components 
import Sidebar from './Components/Sidebar';
import CharacterStats from './Components/CharacterStats';
import { useState, useEffect, useRef } from 'react';
import Modal from './Components/Modal';
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_MODAL } from './Redux/actions';
import CustomizeCharacter from './Components/CustomizeCharacter';
// Router
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage';
import CalendarPage from './Components/CalendarPage';
// Icons
import { AiFillHeart, AiFillStar } from 'react-icons/ai'





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

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  // NOTIFICATION FOR EXPERIENCE AFTER COMPLETING A TO-DO
  const experience = useSelector(state => state.characterStats[2].experience)
  const [notification, setNotification] = useState(false)
  const firstUpdate = useRef(true);


  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    else {
      setNotification(true)

      let timeout = setTimeout(() => {
        setNotification(false)
      }, 3000);
      return () => clearTimeout(timeout)
    }
  }, [experience])

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
      <div className={`flex justify-evenly items-center rounded-sm absolute top-3 right-5 w-48 h-16 bg-green-500 border ${notification ? 'pop-down' : 'pop-up'}`}>
        <h2>+ 1.3 Experience</h2>
        <span className='text-yellow-400 text-3xl '><AiFillStar /></span>
      </div>

      <Routes location={displayLocation}>
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/' element={<MainPage />} />
      </Routes>
    </div>
  );
}


export default (App);

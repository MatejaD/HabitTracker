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
import { CLOSE_SETTINGS, OPEN_LVL_MODAL, OPEN_MODAL, OPEN_NO_HEALTH_MODAL, REMOVE_NOTIFICATION, RESET_CHECK_OUT, SET_EDIT_TASK } from './Redux/actions';
// Router
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage';
import CalendarPage from './Components/CalendarPage';
// Icons
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { BsCoin, BsHeartFill, BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
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
    <main className='w-screen bg-blue-500   flex flex-col justify-center gap-4 items-center min-h-screen p-4  '>
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

  const Daily_Task_List = useSelector(state => state.Daily_Task_List)

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

  // calnedar

  const [openCalendar, setOpenCalendar] = useState(false)

  const [clickedDate, setClickedDate] = useState('')

  const [getMonth, setGetMonth] = useState()
  const [getYear, setGetYear] = useState()

  let monthsName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const handleEdit = (id) => (e) => {
    e.preventDefault()
    dispatch({ type: SET_EDIT_TASK, list: Daily_Task_List, payload: id })

  }


  return (
    <>

      {Daily_Task_List.map((item, index) => {
        if (item.isEditing) {



          let day = new Date().getDay()
          let month = new Date().getMonth()
          let year = new Date().getFullYear()

          // console.log(day, month, year)
          // console.log(item)



          return (
            <div className='flex  justify-center items-center gap-4 py-7 fixed bg-opacity-30 top-0 right-0 z-50 w-screen h-screen bg-black '>
              <form onSubmit={handleEdit(item.id)} className='flex p-4 relative flex-col justify-start gap-5 items-center w-1/3 h-full border-2 border-black bg-slate-200'>

                <div className='w-full h-16 flex  justify-end items-start gap-2'>
                  <button className='w-24 h-10 rounded-md bg-red-500 font-semibold text-slate-100'>Close</button>

                  <button className='w-24 h-10 rounded-md bg-blue-600 font-semibold text-slate-100'>Submit</button>

                </div>
                <div className='flex flex-col w-full h-16 justify-center items-start'>
                  <h2>Name</h2>
                  <input value={item.editName} onChange={(e) => dispatch({ type: 'EDIT', payload: e.target.value })} className='h-10 w-full rounded-md outline-none px-2' type="text" />

                </div>

                <div className='flex flex-col justify-center items-start w-full h-16   '>
                  <h2>Start Date</h2>
                  <p
                    onClick={() => setOpenCalendar(!openCalendar)}
                    className='flex justify-start px-2  items-center w-full h-2/3 bg-white'>
                    {clickedDate ? `${clickedDate}/${monthsName[getMonth - 1]}/${getYear}` : `${day}/${monthsName[month - 1]}/${year}`}
                  </p>
                </div>

                {openCalendar ?
                  <Calendar className={`calendar w-full z-20  h-20 mt-10  grid `}
                    tileClassName={`bg-slate-200 border-2 border-black h-12 w-full `}
                    minDetail='decade'
                    view="month"
                    prev2Label=''
                    next2Label=''
                    prevLabel={
                      <BsFillCaretLeftFill />
                    }
                    nextLabel={
                      <BsFillCaretRightFill />
                    }
                    locale="en"
                    onClickDay={(value) => {
                      // setClickedDate(value)
                      setClickedDate((value.getDate()))
                      setGetMonth(value.getMonth() + 1)
                      setGetYear(value.getFullYear())
                      setOpenCalendar(false)
                      //
                    }}
                  />

                  : ""}
              </form>
            </div>)
        }
      })}


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
            console.log(notificationn)
            if (notificationn.exp === 'experience') {
              return (
                <div className={`flex justify-between px-2 items-center rounded-sm  z-10  w-48 h-10  border  ${notificationn.type === 'increase' ? 'bg-green-500 border-green-300' : 'bg-red-500 border-red-400'}`}>
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
          <Route path='/calendar' element={<CalendarPage />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </div >
    </>

  );
}


export default (App);

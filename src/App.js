// Components 
import Sidebar from './Components/Sidebar';
import CharacterStats from './Components/CharacterStats';
import { useState } from 'react';
import Modal from './Components/Modal';
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_MODAL } from './Redux/actions';
import CustomizeCharacter from './Components/CustomizeCharacter';


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
    <main className="relative w-screen h-screen flex justify-center items-center bg-green-500">


      {
        modal ? <Modal /> : ''
      }

      {
        customizeCharacter ? <CustomizeCharacter /> : ''
      }


      <Sidebar />
      <article className='w-11/12 ml-12 flex justify-around   h-screen p-4 '>

        <div className='h-full w-1/2 '>
          <CharacterStats />


          <div>

          </div>
        </div>

        <div className='h-full w-1/2 '>


        </div>
      </article>
    </main>
  );
}



export default (App);

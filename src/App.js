// Components 
import Sidebar from './Components/Sidebar';
import CharacterStats from './Components/CharacterStats';

function App() {

  function setCookie(c_name, value, exdays) { var exdate = new Date(); exdate.setDate(exdate.getDate() + exdays); var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()); document.cookie = c_name + "=" + c_value; }

  function getCookie(c_name) { var c_value = document.cookie; var c_start = c_value.indexOf(" " + c_name + "="); if (c_start == -1) { c_start = c_value.indexOf(c_name + "="); } if (c_start == -1) { c_value = null; } else { c_start = c_value.indexOf("=", c_start) + 1; var c_end = c_value.indexOf(";", c_start); if (c_end == -1) { c_end = c_value.length; } c_value = unescape(c_value.substring(c_start, c_end)); } return c_value; }


  function checkSession() {
    const c = getCookie("visited");
    if (c === "yes") {
      console.log('welcome back')
    } else {
      alert("Welcome new visitor!");
    }
    setCookie("visited", "yes", null); // expire in 1 year; or use null to never expire
  }
  checkSession();

  return (
    <main className="relative w-screen h-screen flex justify-center items-center bg-green-500">
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

export default App;

import '../../style/Header.css';
import './Header';
function DisplayHeader() {
  window.onclick = function (event) {
    if (!event.target.matches('.drop-btn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  function dropFunction() {
    document.getElementById('temp-dropdown').classList.toggle('show');
  }

  return (
    <div>
      <h1>Weather App</h1>
      <div class="temp-selection">
        <button onClick={dropFunction} class="drop-btn">
          Temperature
        </button>
        <div id="temp-dropdown" class="dropdown-content">
          <a href="#">Celsius</a>
          <a href="#">Fahrenheit</a>
        </div>
      </div>
    </div>
  );
}

export default DisplayHeader;

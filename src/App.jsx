
import { useState } from "react";
import './App.css'

const App = () => {

    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});

    const api = {
        key : "fcd263b920f40b5a650c8f16731702ea",
        base : "https://api.openweathermap.org/data/2.5/weather"
    }

    function handleSearch() {
        fetch(`${api.base}?q=${search}&units=metric&APPID=${api.key}`)
        .then(res=>res.json())
        .then(d=>setWeather(d))
        
    }

    function location() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
        .then(res=>res.json())
        .then(d=>setWeather(d))    
    }

    var lat;
    var lon;
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      // The user's position is now available in the position object
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        lat=position.coords.latitude;
        lon=position.coords.longitude;

    }
    
    function error() {
      console.log('Error getting user position');
    }
    

    return(
        <div className="main"> 
             <div className="card">
             <input type="search" placeholder="Enter your City" onChange={(e)=>setSearch(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <button onClick={location}>Current Location</button>
            <div>
                { (typeof weather.main !== 'undefined')? (
                        <div>
                            <p>{weather.name}</p>
                            <p>{weather.main.temp}°C</p>
                            <p>{weather.weather[0].main}</p>
                            <p>{weather.weather[0].description}</p>
                        </div>
                    ) : ("Not Found")
                }
            </div>
            </div>
            
        </div>
    )
}
export default App
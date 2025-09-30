import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import './SearchBox.css';

import {useState} from 'react'
const API_KEY = import.meta.env.VITE_API_KEY;
console.log("API KEY:", API_KEY);
import Forecast from './Forecast';

export default function SearchBar({updatedInfo}){
    // let[city,setCity]=useState("");
    const [city, setCity] = useState(() => localStorage.getItem("lastPlace") || "");
    let[error,setError]=useState(false);
    let[inputError,setInputError]=useState(false);
    let [loading, setLoading] = useState(false);
  
    
    const [showForecast, setShowForecast] = useState(false);
    let API_URL="https://api.openweathermap.org/data/2.5/weather";
    console.log("Final URL:", `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);


    let handleSearch=(event)=>{
          const value = event.target.value;  
          setCity(value);                     
          if (inputError) setInputError(false);

          localStorage.setItem("lastPlace", value);

    }


    let getWeatherInfo=async()=>{
        
       

        
        // let response= await fetch(
        // `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        // );
        let response = await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );


        if (!response.ok) {
            throw new Error("City not found");
        }
        let jsonResponse=await  response.json();
        console.log(jsonResponse);
        let result={
            city:jsonResponse.name,
            temp:jsonResponse.main.temp,
            min_temp:jsonResponse.main.temp_min,
            max_temp:jsonResponse.main.temp_max,
            humidity:jsonResponse.main.humidity,
            feelsLike:jsonResponse.main.feels_like,
            description:jsonResponse.weather[0].description,
            

        }
        console.log(result)
        return result
        
            
    }
    let handleSubmit = async (event) => {
     
        event.preventDefault();
        try {
            setError(false);
            if (city.trim()==="") {
                setInputError(true);
                return; 
            }
            setInputError(false);
            setLoading(true); // start loader
            console.log(city);
            console.log(API_KEY);
            
            

            let newInfo = await getWeatherInfo();
            updatedInfo(newInfo);
            // Save the last searched city in localStorage
           
            
            // setCity(city);
            // setCity("");


        } catch (err) {
            setError(true);
            console.log("error is", err);

        } finally {
            setLoading(false); // stop loader
        }
    }


    
    return(
       <div className="searchBox">
        
        
        <h2>Weather App</h2>
         
        <br></br>
        <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "10px",justifyContent: "center"}}>
            <TextField id="outlined-basic" label="search" variant="outlined" value={city}  onChange={handleSearch}  error={inputError}
              helperText={inputError ? "Please enter a city" : ""} />
             <br></br><br></br>
             
            <Button variant="contained" type="submit" style={{height:"2.7rem",marginTop:"5px"}}>Search</Button>
            <Button variant="outlined" style={{height:"2.7rem",marginTop:"5px"}} onClick={() => 
                {
                setCity("");
                setError(false);
                setInputError(false);
               }
            }> Clear
            </Button>
            </div>
          

             
             {loading && <CircularProgress />}
            
             {error && <p style={{color:"red"}}>No such place exists!</p>}
        </form>
        
        <Button 
            variant="outlined" onClick={() => {
                if (!city.trim()) {
                    setInputError(true);
                    return;
                }
                setShowForecast(prev => !prev)}
            }
            style={{marginTop:"1rem"}}
        >
        {showForecast ? "Close Forecast" : "Show Next 5 Days Forecast"}
        </Button>
       
      
        {showForecast && city && <Forecast city={city} />}
        
    </div>
    )
}

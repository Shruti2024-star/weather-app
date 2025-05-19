import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import {useState} from 'react'
const API_KEY = import.meta.env.VITE_API_KEY;
console.log("API KEY:", API_KEY);



export default function SearchBar({updatedInfo}){
    let[city,setCity]=useState("");
    let[error,setError]=useState(false);
    let[inputError,setInputError]=useState(false)

    let API_URL="https://api.openweathermap.org/data/2.5/weather";
    console.log("Final URL:", `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);


    let handleSearch=(event)=>{
        setCity(event.target.value);
        if (inputError) setInputError(false);

    }


    let getWeatherInfo=async()=>{
        
        let response= await fetch(
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
    
    let handleSubmit=async(event)=>{
        try{
            setError(false)
            event.preventDefault();
            if (city.trim() === "") {
                 setInputError(true);
                 return; 
            }
            console.log(city);
            console.log(API_KEY);
            setCity("");
            let newInfo=await getWeatherInfo();
            updatedInfo(newInfo);

            
        }catch(err){
            setError(true)
            console.log("error is",err)

        }
       

    }

    
    return(
       <div className="searchBox">
        <h2>Weather App</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="search" variant="outlined" value={city}  onChange={handleSearch}  error={inputError}
              helperText={inputError ? "Please enter a city" : ""} />
             <br></br><br></br>
             <Button variant="contained" type="submit">Search</Button><br></br>
            
             {error && <p style={{color:"red"}}>No such place exists!</p>}
        </form>
        

       </div>
    )
}

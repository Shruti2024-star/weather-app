import SearchBar from './SearchBar.jsx';
import Infocard from './Infocard.jsx';
import {useState} from 'react'

export default function WeatherApi(){
    let [info,setInfo]=useState({
           city:"hyderabad",
            temp:32.29,
            min_temp:32.29,
            max_temp:32.29,
            humidity:44,
            feelsLike:33.5,
            description:"overcast clouds",
    })
    
    let updatedInfo=(newInfo)=>{
        setInfo(newInfo)

    }

    return(
        <div>
            <SearchBar updatedInfo={updatedInfo}/>
            <Infocard info={info}/>
        </div>
        

    )
}
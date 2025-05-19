import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SunnyIcon from '@mui/icons-material/Sunny';
import './InfoBox.css'

export default function Infocard({info}){
    let HOT_URL="https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=";
    let RAIN_URL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBENGMwJUzX3JcBd_Hw9CS_Dhc200nZ5GEg&s";
    let COLD_URL="https://i.pinimg.com/736x/b2/e7/5f/b2e75f9773d56b63a46d9dedde94a5ce.jpg";

    return (
        <div className="card">
            <h3>Weather Report</h3>
            <Card sx={{ width:'100%' ,maxWidth: 345 }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={info.humidity>80?RAIN_URL:info.temp>15?HOT_URL:COLD_URL}
          alt="weather"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city} {info.humidity>80?<ThunderstormIcon/>:info.temp>15?<SunnyIcon/>:<AcUnitIcon/>}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
            {info.description} 
            <p>Temperature: {info.temp}&deg;C</p>
            <p>Minimum Temperature: {info.min_temp}&deg;C</p>
            <p>Maximum Temperature: {info.max_temp}&deg;C</p>
            <p>Humidity: {info.humidity}</p>
            <p>Feels Like:{info.feelsLike}&deg;C</p>

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </div>
    )
}
import './css/tempCel.css'

function TempCel(prop) {
    return (
        <>
            <div className={prop.isDayTrue?"big-box-light":"big-box-dark"}>
                <div className='icon-temp'>
                    <b><img src={prop.iconWeather} className='icon'/></b>
                    <b><p>{prop.tempCel}&deg;C</p></b>
    
                </div>
                <b className="two"><p >{prop.IsDay} Time</p></b>
                <b className="three"><p>UV: {prop.uvIndex}</p></b>
                <b className="four"><p>Pressure(inHg): {prop.pressure}</p></b>
                <b className="five" ><p >Temp:{prop.maxTemp}&deg;C- {prop.minTemp}&deg;C</p></b>
                <b className="six"><p>Sunrise: {prop.sunrise}<br/>Sunset: {prop.sunset}</p></b>


            </div>
        </>
    )
}
export default TempCel;
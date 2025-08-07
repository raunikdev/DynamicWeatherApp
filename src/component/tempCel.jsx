import './css/tempCel.css'

function TempCel(prop) {
    return (
        <>
            <div className={prop.isDayTrue ? "big-box-light" : "big-box-dark"}>
                <div className='icon-temp'>
                    <b><img src={prop.iconWeather} className='icon' /></b>
                    <b><p>{prop.tempCel}&deg;C</p></b>

                </div>
                <b><p className="two">{prop.IsDay} Time</p></b>
                <b><p className="three">UV: {prop.uvIndex}</p></b>
                <b><p className="four">Pressure(inHg): {prop.pressure}</p></b>
                <b><p className="five">Temp:{prop.minTemp}&deg;C | {prop.maxTemp}&deg;C</p></b>
                <b><p className="six">Sunrise: {prop.sunrise}<br />Sunset: {prop.sunset}</p></b>


            </div>
        </>
    )
}
export default TempCel;
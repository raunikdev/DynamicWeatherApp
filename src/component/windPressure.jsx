import './css/windPressure.css'
function WindPressure(prop){
    return(
        <>
            <div className="windpressure" style={prop.style}>
                <p>Wind Speed: {prop.windSpeed} km/h</p>
                <p>Wind Degree: {prop.windDegree}</p>
                <p>Weather: {prop.WeatherConditionText}</p>
                <p>Precipitation(in inches): {prop.precipitationInInches}</p>
                <p>Humidity: {prop.humidity} </p>
                <p>Date Last Updated: {prop.dateLastUpdated}</p>
            </div>
        </>
    )
}
export default WindPressure;
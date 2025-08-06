import './css/countryRegion.css'
function CountryRegion(prop){
    return(
        <>
            <div className="country-region" style={prop.style}>
                <p>Name: {prop.name}</p>
                <p>Region: {prop.region}</p>
                <p>Country: {prop.country}</p>
                <p>Longitute & Latitude:<br/> {prop.long}&deg;N, {prop.lat}&deg;W</p>
                <p>Time Zone: {prop.timeZone} </p>
                <p>Local Time: {prop.localTime}</p>
                {/* <p>Condition Text: {prop.conditionText}</p> */}
            </div>
        </>
    )
}
export default CountryRegion;
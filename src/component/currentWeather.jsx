import { useState } from "react";

function CurrentWeather() {
    const [city, setCity] = useState("");
    const [data,setData] = useState("");
    const [tempCelcius,setTempCelcius] = useState("");

    async function current(city) {
            try{
            const information = await fetch(`https://api.weatherapi.com/v1/current.json?key=9f08915818eb43fe8f5172210250508&q=${city}`)
            const json = await information.json();
            const data = await json.location.name;
            const temp = await json.current.temp_c;

            setTempCelcius(temp);
            setData(data);
            console.log("abbra ka dabara "+data)}
            catch(error){
                alert("whoppsies:"+ error)
            }
    }
    function cityInputHandler(e) {
        setCity(e.target.value);
        console.log(city)
    }
    function buttonSearchHandler(){
        current(city)
        console.log(city)
        console.log(data)
    }
    return (
        <>
            <input className="input-city"
                   onChange={cityInputHandler}
                   value={city}
                   placeholder="City..." />
                   <button onClick={buttonSearchHandler}>Search</button>
                   {data}<br/>
                   {/* <img src={}></img> */}
                   {tempCelcius}
        </>
    )
}
export default CurrentWeather;
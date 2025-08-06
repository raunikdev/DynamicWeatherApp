import { useState } from "react";
import CountryRegion from "./countryRegion.jsx";
import './css/weatherApp.css'
import WindPressure from "./windPressure.jsx";
function Weatherapp() {
    const [city, setCity] = useState("");
    const [data, setData] = useState({
        region: "",
        country: "",
        lat: "",
        long: "",
        timeZone: "",
        localTime: "",
        name: "",
        conditionText: ""
    });
    const [suggestions, setSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);


    async function current(city) {
        try {
            const information = await fetch(`https://api.weatherapi.com/v1/current.json?key=9f08915818eb43fe8f5172210250508&q=${city}`)
            const data = await information.json();
            setData({
                region: data.location.region,
                country: data.location.country,
                lat: data.location.lat,
                long: data.location.lon,
                timeZone: data.location.tz_id,
                localTime: data.location.localtime,
                name: data.location.name,

                windSpeed: data.current.wind_kph,
                windDegree: data.current.wind_degree,
                WeatherConditionText: data.current.condition.text,
                dateLastUpdated: data.current.last_updated,
                precipitationInInches: data.current.precip_in,
                humidity: data.current.humidity

            })
        }
        catch (error) {
            alert("whoppsies: " + error)
        }
    }

    async function fetchSuggestions(input) {
        if (input.length < 2) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await fetch(
                `https://api.weatherapi.com/v1/search.json?key=9f08915818eb43fe8f5172210250508&q=${input}`
            );
            const results = await res.json();
            setSuggestions(results);
        } catch (err) {
            console.error("Autocomplete fetch error:", err);
        }
    }
    function handleKeyDown(e) {
        if (suggestions.length === 0) {
            if (e.key === "Enter") {
                e.preventDefault();
                current(city);  // Trigger search
                setSuggestions([]);
            }
            return;
        }


        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1
            );
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            const selected = suggestions[highlightedIndex];
            selectSuggestion(selected.name, selected.region, selected.country);
        } else if (e.key === "Escape") {
            setSuggestions([]);
            setHighlightedIndex(-1);
        }
    }


    function cityInputHandler(e) {
        setCity(e.target.value);
        console.log(city)
        fetchSuggestions(e.target.value);
    }
    function selectSuggestion(name, region, country) {
        setCity(`${name}, ${region}, ${country}`);
        setSuggestions([]);
        current(name);
    }
    function buttonSearchHandler() {
        current(city)
        setSuggestions([])
        console.log(city)
        console.log(data)
    }

    const getBackgroundStyle = (condition) => {
        if (condition === "Sunny") {
            return { background: "linear-gradient(to right, #fbc2ebd0, #ffb87ec7)" , backdropFilter: "blur(2px)"};
        } else if (condition === "Partly cloudy") {
            return { background: "linear-gradient(to top, #a4c4ffc7, #cfdef3cb)", backdropFilter: "blur(2px)" };
        } else if (condition === "Cloudy") {
            return { background: "linear-gradient(to right, #bdc3c7cc, #2c3e50c5)", color: "white", backdropFilter: "blur(2px)" };
        } else if (condition === "Rain") {
            return { background: "linear-gradient(to right, #5f9cffcb, #c2e9fbcc)" , backdropFilter: "blur(2px)"};
        } else if (condition === "Snow") {
            return { background: "linear-gradient(to right, #e0eafccb, #fff)" , backdropFilter: "blur(2px)"};
        } else if (condition === "Thunderstorm" || condition === "Overcast") {
            return { background: "linear-gradient(to right, #283e51d2, #485563c7)", color: "white", backdropFilter: "blur(2px)" };
        } else if (condition === "Mist") {
            return { background: "linear-gradient(to right, #cccccce3, #556475cc)" , backdropFilter: "blur(2px)"};
        } else {
            return { background: "linear-gradient(to right, #ffac59c9, #ffa0a0cb)", backdropFilter: "blur(2px)" }; // default
        }
    };
    return (
        <>
            <h1 style={{ marginTop: "0", textShadow: "1px 1px 10px black" }}>Weather App: </h1>
            <div className="input-search-dropdown">
                <div className="input-search-dropdown-subdiv">
                    <div className="input-button">
                        <input className="input-city"
                            onChange={cityInputHandler}
                            onKeyDown={handleKeyDown}
                            value={city}
                            placeholder="City..."
                        />

                        <button onClick={buttonSearchHandler}
                            className="search-button">Search</button>
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="autocomplete-list">
                            {suggestions.map((s, index) => (
                                <li
                                    key={index}
                                    onClick={() => selectSuggestion(s.name, s.region, s.country)}
                                    className={index === highlightedIndex ? "highlighted" : ""}
                                >
                                    {s.name}, {s.region}, {s.country}
                                </li>
                            ))}
                        </ul>

                    )}
                </div>
            </div>
            <div className="region-wind">
                {data.country !== "" && <CountryRegion country={data.country}
                    region={data.region}
                    lat={data.lat}
                    long={data.long}
                    timeZone={data.timeZone}
                    localTime={data.localTime}
                    name={data.name}
                    // conditionText={data.conditionText}
                    style={{...getBackgroundStyle(data.WeatherConditionText),
                            flex: "1"
                    }} />}
                {data.country !== "" && <WindPressure
                    windSpeed = {data.windSpeed}
                    windDegree = {data.windDegree}
                    WeatherConditionText = {data.WeatherConditionText}
                    precipitationInInches = {data.precipitationInInches}
                    humidity = {data.humidity}
                    dateLastUpdated = {data.dateLastUpdated}
                    style={{...getBackgroundStyle(data.WeatherConditionText),
                            flex: "1"}}/>}
            </div>

        </>
    )
}
export default Weatherapp;
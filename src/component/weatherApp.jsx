import { useState } from "react";
import CountryRegion from "./countryRegion.jsx";
import './css/weatherApp.css'
import WindPressure from "./windPressure.jsx";
import TempCel from "./tempCel.jsx";

import sunnyImg from './images/sunny.webp';
import partlyCloudyImg from './images/partlyCloudy.webp';
import cloudyImg from './images/cloudy.webp';
import rainImg from './images/rain.webp';
import snowImg from './images/snow.webp';
import thunderstormImg from './images/thunderstorm.webp';
import mistImg from './images/mist.webp';
import lightRainShowerImg from './images/lightRainShower.webp';
import defaultImg from './images/startingBackgroundImage.webp';



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
            const information = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9f08915818eb43fe8f5172210250508&q=${city}`)
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
                humidity: data.current.humidity,


                tempCel: data.current.temp_c,
                IsDay: data.current.is_day ? "Day" : "Night",
                isDayTrue: data.current.is_day,
                iconWeather: data.current.condition.icon,
                uvIndex: data.current.uv,
                pressure: data.current.pressure_in,
                maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
                minTemp: data.forecast.forecastday[0].day.mintemp_c,
                sunrise: data.forecast.forecastday[0].astro.sunrise,
                sunset: data.forecast.forecastday[0].astro.sunset,

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


    

        const getBackgroundImageStyle = (condition) => {
            const lowerCond = typeof condition === 'string' ? condition.toLowerCase() : '';

            let imageUrl;

            if (lowerCond.includes("sunny")) {
                imageUrl = sunnyImg;
            } else if (lowerCond.includes("partly cloudy") || lowerCond.includes("partly")) {
                imageUrl = partlyCloudyImg;
            } else if (lowerCond.includes("cloudy") || lowerCond.includes("cloud") ) {
                imageUrl = cloudyImg;
            } else if (lowerCond.includes("light rain") || lowerCond.includes("drizzle")) {
                // This catches: light rain, rain shower, patchy rain, etc.
                imageUrl = lightRainShowerImg;
            } else if (lowerCond.includes("rain")) {
                imageUrl = rainImg
            } else if (lowerCond.includes("thunder") || lowerCond.includes("overcast")) {
                imageUrl = thunderstormImg;
            } else if (lowerCond.includes("snow")) {
                imageUrl = snowImg;
            } else if (lowerCond.includes("mist") || lowerCond.includes("clear") || lowerCond.includes("fog")) {
                imageUrl = mistImg;
            } else {
                imageUrl = defaultImg; // fallback
            }

            return {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundattachment: "fixed",
                backdropFilter: 'blur(2px)',
                transition: 'background-image 0.5s ease-in-out',
            };
        };








        // const getBackgroundStyle = (condition) => {
        //     // const cond = condition.toLowerCase();

        //     if (condition === "Sunny") {
        //         return {
        //             background: "linear-gradient(to right, rgba(251, 194, 235, 0.85), rgba(255, 184, 126, 0.85))",
        //             backdropFilter: "blur(2px)",
        //             className: "SunnyBackground"
        //         };
        //     } else if (condition === "Partly cloudy" || condition === "Partly Cloudy") {
        //         return {
        //             background: "linear-gradient(to top, rgba(127, 158, 216, 0.85), rgba(198, 222, 255, 0.85))",
        //             backdropFilter: "blur(2px)"
        //         };
        //     } else if (condition === "Cloudy") {
        //         return {
        //             background: "linear-gradient(to right, rgba(201, 188, 188, 0.85), rgba(44, 62, 80, 0.85))",
        //             color: "white",
        //             backdropFilter: "blur(2px)"
        //         };
        //     } else if (condition === "Rain") {
        //         return {
        //             background: "linear-gradient(to right, rgba(95, 156, 255, 0.85), rgba(194, 233, 251, 0.85))",
        //             backdropFilter: "blur(2px)"
        //         };
        //     } else if (condition === "Snow") {
        //         return {
        //             background: "linear-gradient(to right, rgba(224, 234, 252, 0.85), rgba(255, 255, 255, 0.85))",
        //             backdropFilter: "blur(2px)"
        //         };
        //     } else if (condition === "Thunderstorm" || condition === "Overcast" || condition === "Patchy light rain with thunder" || condition === "Moderate or heavy rain with thunder") {
        //         return {
        //             background: "linear-gradient(to right, rgba(32, 49, 63, 0.85), rgba(88, 105, 122, 0.85))",
        //             color: "white", 
        //             backdropFilter: "blur(2px)"
        //         };
        //     } else if (condition === "Mist" || condition === "Clear") {
        //         return {
        //             background: "linear-gradient(to right, rgba(221, 221, 221, 0.85), rgba(81, 98, 117, 0.85))",
        //             backdropFilter: "blur(2px)"
        //         };
        //     } else if (condition === "Light rain shower" || condition === "Light rain" || condition === "Patchy rain nearby"){
        //         return {
        //             background: "linear-gradient(to right, rgba(221, 221, 221, 0.85), rgba(81, 98, 117, 0.85))",
        //             backdropFilter: "blur(2px)"
        //         };}
        //     else {
        //         return {
        //             background: "linear-gradient(to right, rgba(255, 172, 89, 0.85), rgba(255, 160, 160, 0.85))",
        //             backdropFilter: "blur(2px)"
        //         }; // default
        //     }
        // };





        const getBackgroundStyle = (condition) => {
            const cond = condition.toLowerCase();

            if (cond.includes("sunny")) {
                return {
                    background: "linear-gradient(to right, rgba(251, 194, 235, 0.6), rgba(255, 184, 126, 0.6))",
                    backdropFilter: "blur(2px)"
                };
            } else if (cond.includes("partly") || cond.includes("cloudy")) {
                return {
                    background: "linear-gradient(to top, rgba(127, 158, 216, 0.6), rgba(198, 222, 255, 0.6))",
                    backdropFilter: "blur(2px)"
                };
            } else if (cond.includes("overcast")) {
                return {
                    background: "linear-gradient(to right, rgba(201, 188, 188, 0.6), rgba(44, 62, 80, 0.6))",
                    color: "white",
                    backdropFilter: "blur(2px)"
                };
            } else if (cond.includes("thunder")) {
                return {
                    background: "linear-gradient(to right, rgba(32, 49, 63, 0.6), rgba(88, 105, 122, 0.6))",
                    color: "white",
                    backdropFilter: "blur(2px)"
                };
            } else if (cond.includes("rain")) {
                return {
                    background: "linear-gradient(to right, rgba(95, 156, 255, 0.6), rgba(194, 233, 251, 0.6))",
                    backdropFilter: "blur(2px)"
                };
            } else if (cond.includes("snow")) {
                return {
                    background: "linear-gradient(to right, rgba(224, 234, 252, 0.6), rgba(255, 255, 255, 0.6))",
                    backdropFilter: "blur(2px)"
                };
            } else if (cond.includes("mist") || cond.includes("fog") || cond.includes("clear")) {
                return {
                    background: "linear-gradient(to right, rgba(221, 221, 221, 0.6), rgba(81, 98, 117, 0.6))",
                    backdropFilter: "blur(2px)"
                };
            } else {
                return {
                    background: "linear-gradient(to right, rgba(255, 172, 89, 0.6), rgba(255, 160, 160, 0.6))",
                    backdropFilter: "blur(2px)"
                }; // default fallback
            }
        };

        return (
            <div className="all" style={getBackgroundImageStyle(data.WeatherConditionText)}>
                <div className= {data.isDayTrue?"":"cover-after-all"} >
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
                    {data.country !== "" && <div className="body-divs">
                        <div className="region-wind">
                            {data.country !== "" && <CountryRegion country={data.country}
                                region={data.region}
                                lat={data.lat}
                                long={data.long}
                                timeZone={data.timeZone}
                                localTime={data.localTime}
                                name={data.name}
                                // conditionText={data.conditionText}
                                style={{
                                    ...getBackgroundStyle(data.WeatherConditionText),
                                    flex: "1"
                                }} />}
                            {data.country !== "" && <WindPressure
                                windSpeed={data.windSpeed}
                                windDegree={data.windDegree}
                                WeatherConditionText={data.WeatherConditionText}
                                precipitationInInches={data.precipitationInInches}
                                humidity={data.humidity}
                                dateLastUpdated={data.dateLastUpdated}
                                style={{
                                    ...getBackgroundStyle(data.WeatherConditionText),
                                    flex: "1"
                                }} />}
                        </div>
                        <TempCel
                            iconWeather={data.iconWeather}
                            tempCel={data.tempCel}
                            IsDay={data.IsDay}
                            uvIndex={data.uvIndex}
                            pressure={data.pressure}
                            isDayTrue={data.isDayTrue}
                            maxTemp={data.maxTemp}
                            minTemp={data.minTemp}
                            sunrise={data.sunrise}
                            sunset={data.sunset} />
                    </div>}
                </div>
            </div>
        )
    }
    export default Weatherapp;
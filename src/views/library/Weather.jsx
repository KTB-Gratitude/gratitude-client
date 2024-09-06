import { useEffect, useState } from "react";

function Weather () {
    const apiKey = import.meta.env.VITE_APP_WEATHER_KEY;
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              setLatitude(lat);
              setLongitude(lon);
            },
            (error) => {
              console.error("Error getting location: ", error);
            }
          );
        } else {
          console.error("Geolocation이 작동 안함");
        }
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=kr`;
            console.log(apiKey);
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setWeatherData(data);
                    setLoading(false);
                    console.log(data);
                })
                .catch((error) => {
                    console.log("fetch 에러");
                    setLoading(false);
                })
        }
    }, [latitude, longitude, apiKey]); 

    return (
        <>
        {isLoading ? (
            <p>Loading...</p>
        ) : weatherData && weatherData.weather ? (
        <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
                <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt="weather icon"
                />
            </div>

            <div className="text-gray-700">
                <div className="text-xl font-bold">{Math.round((weatherData.main.temp - 273.15) * 10) / 10} °C</div>
                <div className="text-base">{weatherData.weather[0].main}</div>
            </div>
        </div>
        ) : (
            <p>날씨 정보를 불러올 수 없습니다.</p>
        )}
        </>
    )
}

export default Weather;
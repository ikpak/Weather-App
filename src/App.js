import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "./App.css";

import Weather from "./components/weather";

const apiKey = process.env.REACT_APP_APIKEY;

function App() {
  const [searchCity, setSearchCity] = useState("");
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState(null);
  const [temp, setTemp] = useState(null);
  const [desc, setDesc] = useState("");
  const [humid, setHumid] = useState(null);
  const [wind, setWind] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);

  const search = async (e) => {
    e.preventDefault();

    if (searchCity) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
      let data = await fetch(url);
      let result = await data.json();
      console.log(result);

      setCity(`${result.name}, ${result.sys.country}`);
      setTemp(Math.floor(result.main.temp));
      setDesc(result.weather[0].description);
      setHumid(result.main.humidity);
      setWind(result.wind.speed);
      setMinTemp(Math.floor(result.main.temp_min));
      setMaxTemp(Math.floor(result.main.temp_max));

      getWeatherIcon(weatherIcon, result.weather[0].id);
    } else {
      getWeather();
    }
  };

  const getWeather = () => {
    const success = (position) => {
      getCurrentWeather(position.coords.latitude, position.coords.longitude);
    };

    const error = () => {
      alert("Unable to retrieve location");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert(
        "Your browser does not support location tracking, or permission is denied."
      );
    }
  };

  const getCurrentWeather = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let data = await fetch(url);
    let result = await data.json();

    setCity(`${result.name}, ${result.sys.country}`);
    setTemp(Math.floor(result.main.temp));
    setDesc(result.weather[0].description);
    setHumid(result.main.humidity);
    setWind(result.wind.speed);
    setMinTemp(Math.floor(result.main.temp_min));
    setMaxTemp(Math.floor(result.main.temp_max));

    getWeatherIcon(weatherIcon, result.weather[0].id);
  };

  const weatherIcon = {
    Thunderstorm: "fa-bolt",
    Drizzle: "fa-cloud-rain",
    Rain: "fa-cloud-showers-heavy",
    Snow: "fa-snowflake",
    Atmosphere: "fa-cloud-sun-rain",
    Clear: "fa-sun",
    Clouds: "fa-cloud",
  };

  const getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setIcon(weatherIcon.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(weatherIcon.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 531:
        setIcon(weatherIcon.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(weatherIcon.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(weatherIcon.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(weatherIcon.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(weatherIcon.Clouds);
        break;
      default:
        setIcon(weatherIcon.Clouds);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="App">
      <Container className="mainCont">
        <Form onSubmit={search} className="form">
          <Row>
            <Col className="formCol" xs={12} md={7}>
              <div>
                <i className="fas fa-search"></i>
                <Form.Control
                  className="formInput"
                  type="text"
                  name="city"
                  autoComplete="off"
                  placeholder="City"
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
            </Col>
            <Col className="formCol" xs={12} md={5}>
              <Button className="searchBtn" type="submit" variant="success">
                Get Weather
              </Button>
            </Col>
          </Row>
        </Form>

        <Weather
          city={city}
          temp={temp}
          desc={desc}
          icon={icon}
          humidity={humid}
          wind={wind}
          maxTemp={maxTemp}
          minTemp={minTemp}
        />
      </Container>
    </div>
  );
}

export default App;

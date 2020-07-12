import React from "react";
import { Container, Card } from "react-bootstrap";

const Weather = (props) => {
  return (
    <div className="weatherDiv">
      <div className="weatherInfo">
        <h2>{props.city}</h2>
        <i className={`fas ${props.icon} fa-3x`}></i>
        <h5>{props.desc}</h5>
        {props.temp ? <h1>{props.temp}°C</h1> : null}
        <ul>
          <li className="mb-1">
            {props.maxTemp}°C / {props.minTemp}°C
          </li>
          <li className="mb-1">
            <i class="fas fa-tint"></i>
            {props.humidity}%
          </li>
          <li>
            <i class="fas fa-wind"></i>
            {props.wind} m/s
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Weather;

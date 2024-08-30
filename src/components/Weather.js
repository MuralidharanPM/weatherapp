import React, { useState } from "react";
import axios from 'axios';
import "../components/Weather.css";
import HumidiyLogo from "../weatherAppAssets/setTwo/Humidity.png";
import TemperatureLogo from "../weatherAppAssets/setTwo/Cold.png";
import MonkeyException from "../weatherAppAssets/setTwo/404MonkeyBoy.png";
import IdleState from "../weatherAppAssets/setTwo/island.png";
import Ashes from "../weatherAppAssets/setTwo/ashes.png";
import Clear from "../weatherAppAssets/setTwo/clear.png";
import Drizzles from "../weatherAppAssets/setTwo/drizzle.png";
import Clouds from "../weatherAppAssets/setTwo/clouds.png";
import Dust from "../weatherAppAssets/setTwo/dust.png";
import Fog from "../weatherAppAssets/setTwo/fog.png";
import Haze from "../weatherAppAssets/setTwo/haze.png";
import Mist from "../weatherAppAssets/setTwo/mist.png";
import OverlayClouds from "../weatherAppAssets/setTwo/overcastClouds.png";
import Rain from "../weatherAppAssets/setTwo/rain.png";
import Sand from "../weatherAppAssets/setTwo/sand.png";
import Smoke from "../weatherAppAssets/setTwo/smoke.png";
import Snow from "../weatherAppAssets/setTwo/snow.png";
import ThunderStorm from "../weatherAppAssets/setTwo/thunderstorm.png";
import Tornado from "../weatherAppAssets/setTwo/tornado.png";

const apiKey = 'd9a77540cfdedd8f282f4c83b2b5aace'; // Ensure this is defined and correct

export default function Weather() {
    const [zipCode, setZipCode] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [climate, setClimate] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [apiStatus, setApiStatus] = useState('fresh');
    const [climateImage, setClimteImage] = useState();

    const fetchWeatherData = async (lat, lon) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            setClimate(response.data.weather[0].description);
            setTemperature(response.data.main.temp);
            setHumidity(response.data.main.humidity);
            setCimateImage((response.data.weather[0].description).toLowerCase());
            setApiStatus('success');
        } catch (error) {
            setApiStatus('failure');
            console.log('Error fetching weather data:', error);
        }
    };

    const latLongTrigger = async () => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},IN&appid=${apiKey}`);
            const { lon, lat } = response.data;
            setLongitude(lon);
            setLatitude(lat);
            console.log(longitude + " " + latitude); 
            fetchWeatherData(lat, lon);
            setZipCode('');
        } catch (error) {
            setApiStatus('failure');
            console.log('Error fetching lat/long data:', error);
        }
    };

    const textFormat = (text) => {
        return (text.charAt(0)).toUpperCase() + (text.slice(1)).toLowerCase();
    }

    const setCimateImage = (text) => {
        if ((text).toString() === (("Thunderstorm").toLocaleLowerCase()).toString()) {
            setClimteImage(ThunderStorm);
        } else if ((text).toString() === (("Drizzle").toLocaleLowerCase()).toString()) {
            setClimteImage(Drizzles);
        } else if ((text).toString() === (("Rain").toLocaleLowerCase()).toString() || ((text).toString()).includes(("Rain").toLocaleLowerCase())) {
            setClimteImage(Rain);
        } else if ((text).toString() === (("Snow").toLocaleLowerCase()).toString()) {
            setClimteImage(Snow);
        } else if ((text).toString() === (("Mist").toLocaleLowerCase()).toString()) {
            setClimteImage(Mist);
        } else if ((text).toString() === (("Smoke").toLocaleLowerCase()).toString()) {
            setClimteImage(Smoke);
        } else if ((text).toString() === (("Haze").toLocaleLowerCase()).toString()) {
            setClimteImage(Haze);
        } else if ((text).toString() === (("Dust").toLocaleLowerCase()).toString()) {
            setClimteImage(Dust);
        } else if ((text).toString() === (("Fog").toLocaleLowerCase()).toString()) {
            setClimteImage(Fog);
        } else if ((text).toString() === (("Sand").toLocaleLowerCase()).toString()) {
            setClimteImage(Sand);
        } else if ((text).toString() === (("Ash").toLocaleLowerCase()).toString()) {
            setClimteImage(Ashes);
        } else if ((text).toString() === (("Squall").toLocaleLowerCase()).toString()) {
            setClimteImage(Tornado);
        } else if ((text).toString() === (("Clouds").toLocaleLowerCase()).toString()) {
            setClimteImage(Clouds);
        } else if ((text).toString() === (("clear").toLocaleLowerCase()).toString()) {
            setClimteImage(Clear);
        } else if (((text).toString()).includes(("Rain").toLocaleLowerCase())) {
            setClimteImage(OverlayClouds);
        } else {
            setClimteImage(ThunderStorm);
        }
    }

    const weatherResultRend = (apiStatus) => {
        if (apiStatus === "failure") {
            return (
                <div className="weatherIdleCls">
                    <img src={MonkeyException} alt="Error" className="404MoneyLogoCls" />
                </div>
            );
        } else if (apiStatus === "success") {
            return (
                <div className="weatherBoxCls">
                    <div className="weatherMainResultCls">
                        <p className="climateTxtCls">Climate : {textFormat((climate).toString())}</p>
                        <img src={climateImage} alt="Idle State" className="climateResCls"/>
                    </div>
                    <div className="weatherSubResultsCls">
                        <div className="humidityResSecCls">
                            <img src={HumidiyLogo} alt="Humidity" className="humidityLogoCls" />
                            <p className="HumidityTxtCls">Humidity: {humidity}%</p>
                        </div>
                        <div className="temperatureResSecCls">
                            <img src={TemperatureLogo} alt="Temperature" className="temperatureLogoCls" />
                            <p className="TemperatureTxtCls">Temperature: {temperature}°K</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="weatherIdleCls">
                    <img src={IdleState} alt="Idle State" className="IdleLogoCls" />
                    <p className="weatherIdleTxtCls">Start searching ....</p>
                </div>
            );
        }
    }

    return (
        <div className="pincodeParentCls">
            <div className="pincodeContCls">
                <div className="pincodeFieldSecCls">
                    <div className="pincodeContTitCls">Please enter your pincode to find the current weather in your area (within India). 🌦️</div>
                    <div className="pincodeFieldContainnerCls">
                        <p className="pincodeLblCLs">Please enter your pincode</p>
                        <input
                            maxLength={6}
                            className="pincodeFieldClass"
                            placeholder="Enter Pincode"
                            name="pincode"
                            id="pincode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="pincodeFindBtnCls" onClick={latLongTrigger}>Find</button>
                    </div>
                </div>
                <div className="pincodeResultSecCls">
                    <div className="weatherResultSecCls">
                        {weatherResultRend(apiStatus)}
                    </div>
                </div>
            </div>
        </div>
    );
}

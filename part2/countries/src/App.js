import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
 

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  
  
 

  const PrintCountry = ({ country }) => {
    return (
      <div>
        {country.map((c) => (
          <div key={c.alpha2Code}>
            <h1>{c.name}</h1>
            <p>Capital:{c.capital}</p>
            <p>Population:{c.population}</p>
            <ul>
              Languages:
              {c.languages.map((lang) => (
                <li key={lang.iso639_1}>{lang.name}</li>
              ))}
            </ul>
            <img alt="flag" src={c.flag} height="160px" width="160px"></img>
            <PrintWeather country={c}></PrintWeather>
          </div>
        ))}
      </div>
    );
  };

  const PrintWeather = ({country}) => {
    const [weather, setWeather] = useState([]);
    useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`).then((response) => {
      setWeather(response.data.current)
    });
  }, [country.name]);
    const imgurl = weather.weather_icons;
    return (
      <div>
        
        <h1>Weather in {country.capital}</h1>
        <img alt="icon" src={imgurl} height="100px" width="100px"></img>
        <p>Wind Speed: {weather.wind_speed} km/h {weather.wind_dir} direction</p>
        <p>Temperature: {weather.temperature} celsius</p>
        
      </div>
    )
  }

  const handleFilter = (e) => {
    const filteredText = e.target.value;
    const filteredArray = countries.filter((country) =>
      country.name.startsWith(filteredText)
    );
    setFilteredCountries(filteredArray);
  };

  const RenderHTML = () => {
    const data = [...filteredCountries]
    return !data.length || data.length > 10
      ? <p>Too many matches, specify another filter</p>
      : data.length === 1 ? <PrintCountry country={data}></PrintCountry> 
      : data.map(country => <p key={country.alpha2Code}>{country.name} <button onClick={() => setFilteredCountries([country])}>show</button></p>)

  }


  return (
    <div>
      <input type="text" onChange={handleFilter}></input>
      <RenderHTML></RenderHTML>

    </div>
  );
};

export default App;

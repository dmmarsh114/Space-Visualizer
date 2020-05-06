import React, { useState } from 'react';
import { Card } from 'antd';

const SolarSystemCard = (props) => {

    const [planetName, setPlanetName] = useState('');

    const [numberOfMoons, setNumberOfMoons] = useState('');
    const [planetMoons, setPlanetMoons] = useState([]);

    const [sideralOrbit, setSideralOrbit] = useState('');
    const [sideralRotation, setSideralRotation] = useState('');
  
    const [planetVolValue, setPlanetVolValue] = useState(0);
    const [planetVolExponent, setPlanetVolExponent] = useState(0);

    const fetchPlanetInfo = (planet) => {
        fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planet}`, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(planetData => {
                setPlanetName(planetData.englishName);
                setSideralOrbit(Math.round(planetData.sideralOrbit));
                setSideralRotation(Math.round(planetData.sideralRotation));
                setSideralOrbit(planetData.sideralOrbit);
                setSideralRotation(planetData.sideralRotation);
                setPlanetVolValue(planetData.vol.volValue)
                setPlanetVolExponent(planetData.vol.volExponent)
                if (planetData.moons === null) {
                    setNumberOfMoons('0')
                } else {
                    setNumberOfMoons(planetData.moons.length);
                }
                props.setPlanet('');
            })
    }

    const howManyEarths = (planet, value, exponent) => {
        
        let planetBaseVol = value; //volValue from data
        let planetExponent = Math.pow(10, exponent); //15 = volExponent from data
        
        let earthsBaseVol = 1.08321;
        let earthsExponent = Math.pow(10, 12);
        let earthsVol = earthsExponent * earthsBaseVol;
        let planetVol = planetExponent * planetBaseVol;
        
        return planetVol > earthsVol 
        ? `There are ${Math.round(planetVol / earthsVol)} earth's inside of ${planet}.`
        : ''
        ;
    }

    const cardContent = () => {
        return (
            <div>
                <p> {planetName} has {sideralOrbit} days in a year...</p>
                <p>and {sideralRotation} hours in a day!</p>
                {
                    numberOfMoons > 0 ?
                        <p>{planetName} has {numberOfMoons} {numberOfMoons === 1 ? 'moon' : 'moons'}.</p>
                        : <p>{planetName} doesn't have any moons.</p>
                }
                <p>{howManyEarths(planetName, planetVolValue, planetVolExponent)}</p>
                <a href="">click here to learn more about {planetName}!</a>
            </div>
        )
    }



    return (
        <Card
            title={planetName === '' ? 'click a planet pls' : planetName.toUpperCase()}
            style={{ width: 300 }}
        >
            {props.planet !== '' ? fetchPlanetInfo(props.planet) : null}
            {planetName !== '' ? cardContent() : null}
        </Card>
    )
}

export default SolarSystemCard;
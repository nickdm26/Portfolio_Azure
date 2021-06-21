import React, { Component } from 'react';
const functions = require('firebase-functions');


class temperature_api extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: null,
            error: null,
            isLoaded: false,
            JSON: []
        };
    }

    componentDidMount() {
        console.log('componentDidMount')
        const API_KEY = functions.config().openweather.key
        const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=Dunedin&units=metric&appid=${API_KEY}`;
        fetch(apiURL)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    JSON: result
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, JSON } = this.state;
        if (error) {
            return <p>Error: {error.message}</p>;
        } else if (!isLoaded) {
            return <p>Loading...</p>;
        } else {
            return(
                <p>Temperature: {Math.round(JSON.main.temp)}°C</p>
            )
        }
    }
}

export default temperature_api;
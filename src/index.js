import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const Cars = {};
const Tariffs = {};

function getData() {
    const url = "https://city-mobil.ru/api/cars";
    fetch(url)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(new Error(response.statusText))
            }
            return Promise.resolve(response)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            Cars.data = data.cars;
            Tariffs.data = data.tariffs_list;
            console.log("cars", Cars.data);
            console.log("tariffs", Tariffs.data);
            render();
        })

        .catch((error) => {
            console.log("error", error);
        })
}

getData();

function render() {
    ReactDOM.render(
        <App cars={Cars.data} tariffs={Tariffs.data}/>,
        document.getElementById('root')
    );
}
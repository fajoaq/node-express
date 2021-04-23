console.log('Client side javascript loaded');

const fetchWeatherData = (address, callback) => {
    const url = encodeURI(`/weather?address=${address}`);
    try {
        fetch(url).then((response) => {
            try {
                response.json().then((data) => {
                    if(data.error) callback({ error: data.error});
                    else callback(data);
                });
            } catch (e) {
                console.log('error: ', e);
            }
        })
    } catch (e) {
        console.log('error: ', e);
    }
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorPanel = document.querySelector('.error_panel');
const weatherPanel = document.querySelector('.weather_panel');
const locationContainer = document.querySelector('.location_container');
const forecastContainer = document.querySelector('.forecast_container');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = search.value;

    errorPanel.textContent='';
    locationContainer.textContent='loading ...';
    forecastContainer.textContent='';

    fetchWeatherData(address, (data) => {
        if(data.error) {
            errorPanel.textContent=`${data.error}`;
            locationContainer.textContent='';
        }
        else if(data.location) {
            locationContainer.textContent = data.location;
            forecastContainer.textContent = data.forecast;
        }

        search.value='';
    });
});
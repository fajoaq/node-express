const $weatherForm = document.querySelector('form');
const $search = document.querySelector('input');
const $userLocationButton = $weatherForm.querySelector('button[name="user-location"]')
const $errorPanel = document.querySelector('.error_panel');
//const weatherPanel = document.querySelector('.weather_panel');
const $locationContainer = document.querySelector('.location_container');
const $forecastContainer = document.querySelector('.forecast_container');

const fetchWeatherData = ({ address, long, lat }, callback) => {
    const url = (address === undefined) ? 
        `/weather/me?long=${long}&lat=${lat}` 
        : 
        encodeURI(`/weather?address=${address}`);

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

const performSearch = ({address, long , lat}) => {
    $errorPanel.textContent='';
    $locationContainer.textContent='loading ...';
    $forecastContainer.textContent='';

    fetchWeatherData({address, long, lat}, (data) => {
        if(data.error) {
            $errorPanel.textContent=`${data.error}`;
            $locationContainer.textContent='';
        }
        else if(data.location) {
            console.log(data)
            $locationContainer.textContent = data.location;
            $forecastContainer.textContent = data.forecastedData;
        }
    });

    $search.value='';
}

$weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = $search.value;
    
    performSearch({ address });
});

$userLocationButton.addEventListener('click', (event) => {
    event.preventDefault();

    if(!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser.");
    } else {
    navigator.geolocation.getCurrentPosition( (position) => {
        const { longitude, latitude } = position.coords;

        performSearch({ undefined, long: longitude, lat: latitude });
})}});
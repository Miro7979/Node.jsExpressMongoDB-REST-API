window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureTimezone = document.querySelector('.location-timezone');
    let tempIcon = document.querySelector('.icon');



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?q=Malmo
            &APPID=0e4352c7d27654631ee046f5129d4ede&lang=sv&units=metric`;

            fetch(api).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                // const {temp, timezone} = data;
                temperatureDegree.textContent = data.main.temp;
                temperatureTimezone.textContent = data.name;
                temperatureDescription.textContent = data.weather[0].description;
                tempIcon.textContent = data.weather[0].icon;
                setIcons(icon, document.querySelector('.icon'));
            });
        });  
    };
    function setIcons(icon, iconID) {
        const skycons = new skyicons({color: 'white'});
        const currentIcon = icon.replace("_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
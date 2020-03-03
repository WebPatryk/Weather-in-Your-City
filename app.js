window.addEventListener('load', function () {
    let long;
    let lat;
    const temperatureDOM = document.querySelector('.temperature');
    const temp_info = document.querySelector('.temp_info');
    const cityDOM = document.querySelector('.cityDOM');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const KEY = '80f5f92579ef390a0cf2de3cb33b284f';
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const API = `${proxy}https://api.darksky.net/forecast/${KEY}/${lat},${long}`;


            // fetch(API)
            //     .then(res => res.json())
            //     .then(data => console.log(data))

            const getWeather = async () => {
                const response = await fetch(API);
                const data = await response.json()
                console.log(data);

                //Destructurisation
                const { temperature, summary, icon, pressure } = data.currently;


                // Set DOM

                temperatureDOM.textContent = Math.floor((temperature - 32) / 1.8) + '°C';
                temp_info.textContent = summary;
                cityDOM.textContent = data.timezone

                setIcons(icon, document.querySelector('.icon'))
            }


            getWeather()

        })

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }


})


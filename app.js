window.addEventListener('load', function () {
    let long;
    let lat;
    const temperatureDOM = document.querySelector('.temperature');
    const temp_info = document.querySelector('.temp_info');
    const cityDOM = document.querySelector('.cityDOM');
    const humidityDOM = document.querySelector('.humidity');
    const apparentTemperatureDOM = document.querySelector('.apparentTemperature');
    const windSpeedDOM = document.querySelector('.wind-speed');

    const day1 = document.querySelector('.day-1');
    const day2 = document.querySelector('.day-2');
    const day3 = document.querySelector('.day-3');
    const day4 = document.querySelector('.day-4');

    const tempMax1 = document.querySelector('.temp-max-1');
    const tempMin1 = document.querySelector('.temp-min-1');

    const tempMax2 = document.querySelector('.temp-max-1');
    const tempMin2 = document.querySelector('.temp-min-1');

    const tempMax3 = document.querySelector('.temp-max-1');
    const tempMin3 = document.querySelector('.temp-min-1');

    const tempMax4 = document.querySelector('.temp-max-1');
    const tempMin4 = document.querySelector('.temp-min-1');

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
                const { temperature, summary, icon, pressure, humidity, apparentTemperature, windSpeed } = data.currently;

                // const { temperatureHigh, temperatureLow } = data.daily.data;


                // Set DOM

                temperatureDOM.textContent = Math.floor((temperature - 32) / 1.8) + '°C';
                temp_info.textContent = summary;
                cityDOM.textContent = data.timezone;
                humidityDOM.textContent = (humidity * 100) + '%';
                apparentTemperatureDOM.textContent = Math.floor((apparentTemperature - 32) / 1.8) + '°C';


                windSpeedDOM.textContent = windSpeed + 'm/s';

                // Next day 

                tempMax1.textContent = Math.floor((data.daily.data[0].temperatureHigh - 32) / 1.8) + '°C';
                tempMin1.textContent = Math.floor((data.daily.data[0].temperatureLow - 32) / 1.8) + '°C';

                tempMax2.textContent = Math.floor((data.daily.data[1].temperatureHigh - 32) / 1.8) + '°C';
                tempMin2.textContent = Math.floor((data.daily.data[1].temperatureLow - 32) / 1.8) + '°C';

                tempMax3.textContent = Math.floor((data.daily.data[2].temperatureHigh - 32) / 1.8) + '°C';
                tempMin3.textContent = Math.floor((data.daily.data[2].temperatureLow - 32) / 1.8) + '°C';

                tempMax4.textContent = Math.floor((data.daily.data[3].temperatureHigh - 32) / 1.8) + '°C';
                tempMin4.textContent = Math.floor((data.daily.data[3].temperatureLow - 32) / 1.8) + '°C';


                const actual1 = new Date(data.daily.data[0].time * 1000)
                const actual2 = new Date(data.daily.data[1].time * 1000)
                const actual3 = new Date(data.daily.data[2].time * 1000)
                const actual4 = new Date(data.daily.data[3].time * 1000)

                var day_arr = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];


                day1.textContent = day_arr[actual1.getDay() - 1];
                day2.textContent = day_arr[actual2.getDay() - 1];
                day3.textContent = day_arr[actual3.getDay() - 1];
                day4.textContent = day_arr[actual4.getDay() - 1];



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


    function time() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        function addZero(a) {
            if (a < 10) {
                return `0${a}`
            }
            else {
                return a;
            }

        }


        const time = document.querySelector('.time');
        time.innerHTML = `${addZero(hours)}: ${addZero(minutes)}: ${addZero(seconds)}`;
    }

    setInterval(time, 1000)

})


window.addEventListener('load', function () {
    let long;
    let lat;
    const temperatureDOM = document.querySelector('.temperature');
    const temp_info = document.querySelector('.temp_info');
    const cityDOM = document.querySelector('.cityDOM');
    const humidityDOM = document.querySelector('.humidity');
    const apparentTemperatureDOM = document.querySelector('.apparentTemperature');
    const windSpeedDOM = document.querySelector('.wind-speed');
    const exactDateDOM = document.querySelector('.exact-date')



    const day1 = document.querySelector('.day-1');
    const day2 = document.querySelector('.day-2');
    const day3 = document.querySelector('.day-3');
    const day4 = document.querySelector('.day-4');

    const tempMax1 = document.querySelector('.temp-max-1');
    const tempMin1 = document.querySelector('.temp-min-1');

    const tempMax2 = document.querySelector('.temp-max-2');
    const tempMin2 = document.querySelector('.temp-min-2');

    const tempMax3 = document.querySelector('.temp-max-3');
    const tempMin3 = document.querySelector('.temp-min-3');

    const tempMax4 = document.querySelector('.temp-max-4');
    const tempMin4 = document.querySelector('.temp-min-4');


    Swal.fire('Please allow the rights to use your navigation')

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
                humidityDOM.textContent = (humidity * 100).toFixed(0) + '%';
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


                day1.textContent = day_arr[actual1.getDay()];
                day2.textContent = day_arr[actual2.getDay()];
                day3.textContent = day_arr[actual3.getDay()];
                day4.textContent = day_arr[actual4.getDay()];


                //main icon
                setIcons(icon, document.querySelector('.icon'))

                //next day icon 

                setIcons(data.daily.data[0].icon, document.querySelector('.day1-icon'))

                setIcons(data.daily.data[1].icon, document.querySelector('.day2-icon'))

                setIcons(data.daily.data[2].icon, document.querySelector('.day3-icon'))

                setIcons(data.daily.data[3].icon, document.querySelector('.day4-icon'))

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

    function addZero(a) {
        if (a < 10) {
            return `0${a}`
        }
        else {
            return a;
        }

    }


    function time() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();



        const time = document.querySelector('.time');
        time.innerHTML = `${addZero(hours)}: ${addZero(minutes)}: ${addZero(seconds)}`;
    }

    setInterval(time, 1000)


    function exactDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        exactDateDOM.innerHTML = `${addZero(day)}.${addZero(month)}.${addZero(year)}r.`;
    }

    exactDate()


})



function changeBackground() {
    const app = document.querySelector('.App');
    const date = new Date();
    const hours = date.getHours();

    switch (hours) {
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            app.style.backgroundImage = `url('morning.jpg')`
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
            app.style.backgroundImage = `url('in_the_afternoon.jpg')`
            break;
        case 19:
        case 20:
        case 21:
            app.style.backgroundImage = `url('dusk.jpg')`
            break;
        case 22:
        case 23:
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            app.style.backgroundImage = `url('night.jpg')`
            break;
    }

}

const writeCity = document.querySelector('.write-city');

function getCity() {


    if (localStorage.getItem('city') === null) {
        writeCity.textContent = '[Enter City]'
    }
    else {
        writeCity.textContent = localStorage.getItem('city')
    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('city', e.target.innerText);
            writeCity.blur();
        }
    }
    else {
        localStorage.setItem('city', e.target.innerText)
    }
}



writeCity.addEventListener('keypress', setCity)


getCity()
changeBackground()
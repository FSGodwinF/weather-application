window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperature = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.degree-section');
    temperatureSpan = document.querySelector('.degree-section span');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}, ${long}?unitGroup=us&key=Y73RMBHFUXS24VSQRXPKA2PSP`;
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{

                const {conditions, temp, icon} = data.currentConditions;
                // setting DOM from API
                temperature.textContent = temp;
                temperatureDescription.textContent = conditions;
                locationTimezone.textContent = data.timezone;
                //Set Icon
                setIcons(icon, document.querySelector('.icon'));

                //converting to celsius
                let celsius  = (temp - 32) * (5/9);

                //changing temperature
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === "°F"){
                        temperatureSpan.textContent = "°C";
                        temperature.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "°F";
                        temperature.textContent = temp;
                    }
                })
            });
        });

        
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }

});
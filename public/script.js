$(document).ready(function () {
    const cities = [
        "New York",
        "Los Angeles",
        "London",
        "Paris",
        "Tokyo",
        "Sydney",
        "Moscow",
        "Rio de Janeiro",
        "Cape Town",
        "Bangkok"
    ];

    function fetchWeather(city, units) {
        const apiUrl = `fetch_weather.php?city=${city}&units=${units}`;
        return $.get(apiUrl);
    }

    function displayWeather(weatherData) {
        const weatherCard = `
      <div class="weather-card">
        <h2>${weatherData.name}</h2>
        <p>${weatherData.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description}">
        <div class="weather-details">
          <p>Temperature: ${weatherData.main.temp}°</p>
          <p>Wind: ${weatherData.wind.speed} m/s</p>
          <p>Humidity: ${weatherData.main.humidity}%</p>
          <p>Clouds: ${weatherData.clouds.all}%</p>
        </div>
      </div>
    `;
        $('#weather-container').append(weatherCard);
    }

    function fetchAllWeather(units) {
        $('#weather-container').empty();

        const ajaxRequests = cities.map(city => fetchWeather(city, units));
        $.when(...ajaxRequests)
            .then((...responses) => {
                responses.forEach(response => {
                    const weatherData = response[0];
                    displayWeather(weatherData);
                });
            })
            .fail(() => {
                alert("Error fetching weather data for one or more cities.");
            });
    }

    function fetchCurrentWeather(city, units) {
        $('#weather-container').empty();

        fetchWeather(city, units)
            .done(displayWeather)
            .fail(() => alert("Error fetching weather data for " + city));
    }

    fetchAllWeather('metric');

    $('#unit-select').on('change', function () {
        const units = $(this).val();
        const city = $('#search').val();
        if (city) {
            fetchCurrentWeather(city, units);
        } else {
            fetchAllWeather(units);
        }
    });

    $('#search').on('keydown', function (event) {
        if (event.keyCode === 13) {
            const city = $(this).val();
            const units = $('#unit-select').val();
            if (city) {
                fetchCurrentWeather(city, units);
                $('#units').remove();
                $(this).val('');
            }
        }
    });

    $('header a').on('click', function () {
        fetchAllWeather('metric');
    });
});

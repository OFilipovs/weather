<?php

namespace App;

class Weather
{
    private $api;

    public function __construct($api)
    {
        $this->api = $api;
    }

    public function fetchWeather($city, $units = 'metric')
    {
        $endpoint = '/data/2.5/weather';
        $params = ['q' => $city, 'units' => $units];

        $weatherData = $this->api->fetchData($endpoint, $params);
        return $weatherData;
    }
}

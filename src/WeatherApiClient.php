<?php

namespace App;

class WeatherApiClient
{
    private $apiKey;
    private $baseUrl;

    public function __construct($apiKey, $baseUrl)
    {
        $this->apiKey = $apiKey;
        $this->baseUrl = $baseUrl;
    }

    public function fetchData($endpoint, $params)
    {
        $url = "{$this->baseUrl}{$endpoint}?appid={$this->apiKey}&" . http_build_query($params);
        $data = file_get_contents($url);
        return $data;
    }
}

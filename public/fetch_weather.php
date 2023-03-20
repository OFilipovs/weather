<?php

use App\Weather;

require_once __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

$city = isset($_GET['city']) ? $_GET['city'] : '';
$units = isset($_GET['units']) ? $_GET['units'] : 'metric';

$container = require __DIR__ . '/../src/container.php';
$weather = $container->get(Weather::class);

if (!empty($city)) {
    $weatherData = $weather->fetchWeather($city, $units);
    echo $weatherData;
} else {
    echo json_encode(['error' => 'City not provided']);
}

<?php

namespace App;

use DI\ContainerBuilder;
use Dotenv\Dotenv;

require_once 'WeatherApiClient.php';
require_once 'Weather.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions([
    'api_key' => $_ENV['OPENWEATHERMAP_API_KEY'],
    'base_url' => 'https://api.openweathermap.org',
    WeatherApiClient::class => function ($container) {
        return new WeatherApiClient($container->get('api_key'), $container->get('base_url'));
    },
    Weather::class => function ($container) {
        return new Weather($container->get(WeatherApiClient::class));
    },
]);

return $containerBuilder->build();

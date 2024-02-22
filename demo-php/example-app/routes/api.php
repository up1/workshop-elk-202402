<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/search', function () {
    $data = "{
        \"query\": {
            \"match\": {
                \"name\": \"name\"
            }
        }
    }";
    $headers = ["Content-Type: application/json"];
    $result = post("https://host.docker.internal:9200/demo/_search", $data, $headers);
    return $result;
});


function post($url, $data, $headers)
{
    $username = "elastic";
    $password = "_M3sq-_9g+vMAEjNjxNl";
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_POSTFIELDS => $data,
        CURLOPT_USERPWD => $username . ":" . $password,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
    ));
    if (!empty($headers)) {
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    }
    $response = curl_exec($curl);
    $errno = curl_errno($curl);
    if ($errno) {
        echo "Error: " . curl_error($curl);
        return false;
    }
    curl_close($curl);
    return $response;
}

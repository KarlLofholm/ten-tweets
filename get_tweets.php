<?php
ini_set('display_errors', 1);
require_once('twitter_proxy.php');
require_once('twitter_access_tokens.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => $oauth_access_token,
    'oauth_access_token_secret' => $oauth_access_token_secret,
    'consumer_key' => $consumer_key,
    'consumer_secret' => $consumer_secret
);

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
if(isset($_GET['query']))
{
    $query = $_GET['query'];
}
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q=#'.$query.'&count=10';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
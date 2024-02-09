<?php

require "connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $json = file_get_contents('php://input');

    $data = json_decode($json, true);

    if ($data !== null) {
        $title = $data['title'];
        $description = $data['description'];
        $category = $data['category'];
        $mobile = $data['mobile'];

        if (empty($title)) {
            echo "Please enter a Title.";
        } else if (empty($description)) {
            echo "Please enter a Description.";
        } else if (empty($category)) {
            echo "Please Select a Category.";
        } else {

            // echo "Received mobile: " . $mobile . "<br>";
            // echo "Received Title: " . $title . "<br>";
            // echo "Received Description: " . $description . "<br>";
            // echo "Received Category: " . $category . "<br>";

            $date = new DateTime();
            $timeZone = new DateTimeZone("Asia/Colombo");
            $date->setTimezone($timeZone);
            $CurrentDate = $date->format("Y-m-d H:i:s");

            Database::iud("INSERT INTO `note` (`title`,`description`,`category`,`date_time`,`user_mobile`) 
            VALUES ('".$title."','".$description."','".$category."','".$CurrentDate."','".$mobile."')");

            echo "success";
        }
    } else {

        http_response_code(400);
        echo "Failed to decode JSON data.";
    }
} else {

    http_response_code(405);
    echo "Invalid request method.";
}

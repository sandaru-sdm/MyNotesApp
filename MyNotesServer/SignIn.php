<?php

require "connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $json = file_get_contents('php://input');

    $data = json_decode($json, true);

    if ($data !== null) {
        $mobile = $data['mobile'];
        $password = $data['password'];

        if (empty($mobile)) {
            echo "Please enter your Mobile Number.";
        } else if (strlen($mobile) != 10) {
            echo "Mobile Number should contain 10 characters.";
        } else if (!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/", $mobile)) {
            echo "Invalid Mobile Number.";
        }else if (empty($password)) {
            echo "Please enter your Password.";
        } else {

            $query = Database::search("SELECT * FROM `user` WHERE `mobile` = '" . $mobile . "' && `password` = '".$password."' ");
            $row = $query->num_rows;

            if ($row < 1) {
                echo "User Doesn't Exist. Please Register.";
            } else {

                echo "success";
            }
        }

    } else {

        http_response_code(400);
        echo "Failed to decode JSON data.";
    }
} else {

    http_response_code(405);
    echo "Invalid request method.";
}

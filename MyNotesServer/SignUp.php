<?php

require "connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $json = file_get_contents('php://input');

    $data = json_decode($json, true);

    if ($data !== null) {
        $mobile = $data['mobile'];
        $fname = $data['fname'];
        $lname = $data['lname'];
        $utype = $data['utype'];
        $password = $data['password'];

        if (empty($mobile)) {
            echo "Please enter your Mobile Number.";
        } else if (strlen($mobile) != 10) {
            echo "Mobile Number should contain 10 characters.";
        } else if (!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/", $mobile)) {
            echo "Invalid Mobile Number.";
        } else if (empty($fname)) {
            echo "Please enter your First Name.";
        } else if (strlen($fname) > 50) {
            echo "First Name must be less than 50 characters.";
        } else if (empty($lname)) {
            echo "Please enter your Last Name.";
        } else if (strlen($lname) > 50) {
            echo "Last Name must be less than 50 characters.";
        } else if (empty($utype)) {
            echo "Please select User Type.";
        } else if (empty($password)) {
            echo "Please enter your Password.";
        } else if (strlen($password) < 5 || strlen($password) > 20) {
            echo "Password length should be between 05 and 20";
        } else {

            $query = Database::search("SELECT * FROM `user` WHERE `mobile` = '" . $mobile . "' ");
            $row = $query->num_rows;

            if ($row > 0) {
                echo "Mobile Number Already Exists";
            } else {

                $date = new DateTime();
                $timeZone = new DateTimeZone("Asia/Colombo");
                $date->setTimezone($timeZone);
                $CurrentDate = $date ->format("Y-m-d H:i:s");

                Database::iud("INSERT INTO `user` (`mobile`,`first_name`,`last_name`,`user_type`,`password`,`date_time`) 
                VALUES ('".$mobile."','".$fname."','".$lname."','".$utype."','".$password."','".$CurrentDate."')");

                echo "success";
            }
        }

        // echo "Received mobile: " . $mobile . "<br>";
        // echo "Received First Name: " . $fname . "<br>";
        // echo "Received Last Name: " . $lname . "<br>";
        // echo "Received User Type: " . $utype . "<br>";
        // echo "Received Password: " . $password;
    } else {

        http_response_code(400);
        echo "Failed to decode JSON data.";
    }
} else {

    http_response_code(405);
    echo "Invalid request method.";
}

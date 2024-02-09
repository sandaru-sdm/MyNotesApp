<?php

require "connection.php";

// $mobile = $_GET['mobile'];

// $result = Database::search("SELECT * FROM `note` WHERE `note`.`user_mobile` = '".$mobile."' ");
// $data = $result -> fetch_assoc();

// header('Content-Type: application/json');
// error_log(json_encode($data));
// echo json_encode($data);


$mobile = $_GET['mobile'];
$notes = [];

$result = Database::search("SELECT * FROM `note` WHERE `note`.`user_mobile` = '".$mobile."' ORDER BY `note`.`id` DESC ");

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }
}

$result->close();
header('Content-Type: application/json');
echo json_encode($notes);


?>
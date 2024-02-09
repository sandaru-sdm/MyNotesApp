<?php
require "connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $json = file_get_contents('php://input');

    $data = json_decode($json, true);

    if ($data !== null) {
        $id = $data['id'];

        Database::iud("DELETE FROM `note` WHERE `id` = '" . $id . "'");

        echo json_encode(array("message" => "Note deleted successfully"));
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Note ID not provided"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}

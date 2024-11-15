<?php
header('Content-Type: application/json');

// Path to the JSON file
$file_path = 'newsContent.json';

// Get JSON data from request body
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Check if we received an array
if (is_array($data)) {
    // Write the array directly to the JSON file
    if (file_put_contents($file_path, json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(["status" => "success", "message" => "News updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to write to file"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid data format"]);
}
?>

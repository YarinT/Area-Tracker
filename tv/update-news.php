<?php
// Path to the JSON file
$file_path = 'newsContent.json';

// Read the current contents of the JSON file
if (file_exists($file_path)) {
    $current_data = json_decode(file_get_contents($file_path), true);
} else {
    $current_data = [];
}

// Get the new data from the POST request
if (isset($_POST['news'])) {
    $new_news = $_POST['news'];

    // Update the news content
    $current_data['news'] = $new_news;

    // Write the updated data back to the JSON file
    file_put_contents($file_path, json_encode($current_data, JSON_PRETTY_PRINT));

    echo json_encode(["status" => "success", "message" => "News updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "No news data provided"]);
}
?>

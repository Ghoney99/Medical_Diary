<?php

$user = "root";
$pass = "1234";
$host = "localhost";
$db = "db";
    
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$id = $_POST["id"];
$pw = $_POST["pw"];
$name = $_POST["name"];
$location = 0;

$statement = mysqli_prepare($conn, "INSERT INTO user_entity(id,pw,name,location) VALUES(?,?,?,?)");

mysqli_stmt_bind_param($statement, "sssi", $id, $pw, $name, $location);
mysqli_stmt_execute($statement);
mysqli_commit($conn);

$response = array();
$response["success"] = true;

echo json_encode($response);

?>
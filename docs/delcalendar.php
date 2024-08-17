<?php

$user = "root";
$pass = "1234";
$host = "localhost";
$db = "db";
    
$conn = mysqli_connect($host, $user, $pass, $db);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

mysqli_set_charset($conn,"utf8");

$id = $_POST["id"];
$startdate = $_POST["startdate"];
$finishdate = $_POST["finishdate"];

$statement = mysqli_prepare($conn, "DELETE FROM calendar_entity WHERE id=? AND startdate=? AND finishdate=?");

mysqli_stmt_bind_param($statement, "sss", $id, $startdate, $finishdate);
mysqli_stmt_execute($statement);
mysqli_commit($conn);

$response = array();
$response["success"] = true;

echo json_encode($response);


?>
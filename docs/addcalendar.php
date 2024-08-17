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
$medicine = $_POST["medicine"];
$startdate = $_POST["startdate"];
$finishdate = $_POST["finishdate"];
$detail1 = $_POST["detail1"];
$detail2 = $_POST["detail2"];
$detail3 = $_POST["detail3"];
$detail4 = $_POST["detail4"];
$detail5 = $_POST["detail5"];
$memo = $_POST["memo"];

$statement = mysqli_prepare($conn, "INSERT INTO calendar_entity(id,medicine,startdate,finishdate,detail1,detail2,detail3,detail4,detail5,memo) VALUES(?,?,?,?,?,?,?,?,?,?)");

mysqli_stmt_bind_param($statement, "ssssiiiiis", $id, $medicine, $startdate, $finishdate, $detail1, $detail2, $detail3, $detail4, $detail5, $memo);
mysqli_stmt_execute($statement);
mysqli_commit($conn);

$response = array();
$response["success"] = true;

echo json_encode($response);

?>
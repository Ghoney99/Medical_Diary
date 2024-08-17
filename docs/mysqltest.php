<?php

echo "MySql 연결 테스트<br>";
 
$user = "root";
$pass = "1234";
$host = "localhost";
$dbdb = "db";
    
$conn = new mysqli($host, $user, $pass, $dbdb);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

echo "It works, Connected successfully<br><br>";

$result = mysqli_query($conn, "SELECT id, pw, name FROM user_entity");

while($data = mysqli_fetch_array($result)){
	echo $data['id']."  ".$data['pw']."  ".$data['name']."<br>";
}


?>
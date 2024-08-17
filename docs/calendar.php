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
$sql = "SELECT id,medicine,startdate,finishdate,detail1,detail2,detail3,detail4,detail5,memo,medicine_id FROM calendar_entity WHERE id='$id'";

$result=mysqli_query($conn,$sql);
$response=array();
if($result){
	while($row=mysqli_fetch_array($result)){
	   	array_push($response,
		      	array('id'=>$row[0],
		      	'medicine'=>$row[1],
		      	'startdate'=>$row[2],
		      	'finishdate'=>$row[3],
		      	'detail1'=>$row[4],
		      	'detail2'=>$row[5],
		      	'detail3'=>$row[6],
		      	'detail4'=>$row[7],
		      	'detail5'=>$row[8],
			'memo'=>$row[9],
			'medicine_id'=>$row[10]
		));
	}
	header('Content-Type: application/json; charset=utf8');
	$json = json_encode(array("medicines"=>$response), JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
	echo $json;
}


?>
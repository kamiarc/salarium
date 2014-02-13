<?
	require_once('../reg/conn.php');
	$qry = "SELECT * FROM company";
	$r = mysql_query($qry);

	$return = array();

	while($row = mysql_fetch_array($r)){
		$return[$row['company_id']] = array("name" => $row['company_name'],
									"img" => "images/emp/".$row['company_image']);
	}

	echo json_encode($return);
?>
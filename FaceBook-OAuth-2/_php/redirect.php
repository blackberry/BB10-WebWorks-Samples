<?php
	$queryString = 	$_SERVER['QUERY_STRING'];
	header("Location: local:///index.html?" . $queryString);
?>

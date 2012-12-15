<?php
mysql_connect('hostname', 'user', 'psw');
mysql_select_db('xxx');

$sql = "SELECT * FROM tbl_xxxxxxxxxxxxxx";
$rows = mysql_query($sql);

$helloWorlds = array();
while($row = mysql_fetch_row($rows)) {
    $helloWorlds[] = $rows;
}


$sql = "SELECT * FROM tbl_yyyyyyyyyyy";
$rows = mysql_query($sql);

$helloWorldsY = array();
while($row = mysql_fetch_row($rows)) {
    $helloWorlds[] = $rows;
}

$sql = "SELECT * FROM tbl_zzzzzzzzzz";
$rows = mysql_query($sql);

$helloWorldsZ = array();
while($row = mysql_fetch_row($rows)) {
    $helloWorlds[] = $rows;
}

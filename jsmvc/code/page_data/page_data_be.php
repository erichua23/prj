<?php
mysql_connect('hostname', 'user', 'psw');
mysql_select_db('xxx');

$sql = "SELECT * FROM tbl_xxxxxxxxx";
$rows = mysql_query($sql);

$helloWorlds = array();
while($row = mysql_fetch_row($rows)) {
    $helloWorlds[] = $row;
}

$sql = "SELECT * FROM tbl_yyyyyyyyyyy";
$rows = mysql_query($sql);

$helloWorldsY = array();
while($row = mysql_fetch_row($rows)) {
    $helloWorlds[] = $row;
}

$sql = "SELECT * FROM tbl_xxxxxxxxx";
$rows = mysql_query($sql);

$helloWorlds2 = array();
while($row = mysql_fetch_row($rows)) {
    $helloWorlds2[] = $row;
}


$sql = "SELECT * FROM tbl_yyyyyyyyyyy";
$rows = mysql_query($sql);

$helloWorldsY2 = array();
while($row = mysql_fetch_row($rows)) {
    $helloWorlds2[] = $row;
}


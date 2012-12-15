<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <?php for($i = 10; $i--;){ ?>
    <h1><?php echo "hello world" . $i; ?></h1>
    <?php } ?>
</body>
</html>


    <?php 
    $resultSet = mysql_query('SELECT * FROM xxx_tbl;');
    while($row = mysql_fetch_row($resultSet)){ 
    ?>
    <h1><?php echo $row['hello']; ?></h1>
    <?php } ?>


<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="url_of_css_file" />
    <script type="text/javascript" src="url_of_js_file"></script>
</head>
<body>
    <!-- HTML Content -->
    <script type="text/javascript">
        App.init();
    </script>
</body>
</html>

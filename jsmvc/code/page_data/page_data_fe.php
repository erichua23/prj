<!-- 通过此文件获取数据 -->
<?php require('./page_data_be.php');?>
<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <?php foreach($helloWorlds as $hw){ ?>
    <h1><?php echo $hw; ?></h1>
    <?php } ?>
</body>
</html>


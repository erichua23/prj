<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <?php foreach($this->helloList as $hello){ ?>
    <h1><?php echo $hello; ?></h1>
    <?php } ?>
    <hr>
    <?php foreach($this->worldList as $world){ ?>
    <h1><?php echo $world; ?></h1>
    <?php } ?>
</body>
</html>


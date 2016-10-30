<?php
header("Content-Type: text/html; charset=utf-8");

if (isset($_FILES['file'])) {

    $errors = array();
    $file_name = $_FILES['file']['name'];
    $file_size = $_FILES['file']['size'];
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];
    $new_file_name = $_POST['image_name'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("jpeg", "jpg", "png");


    if (in_array($file_ext, $extensions) === false) {
        $errors[] = "image extension not allowed, please choose a JPEG or PNG file.";
    }
    if (empty($errors) == true) {
        move_uploaded_file($file_tmp, "images/" . iconv("utf-8", "windows-1250", $new_file_name) . '.' . $file_ext);
        echo " uploaded file: " . "images/" . $new_file_name . '.' . $file_ext;
    } else {
        print_r($errors);
    }
}
?>
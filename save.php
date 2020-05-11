<?php
if (isset($_POST['jeu'])) {
    file_put_contents(date('d/m/o H:i:s'),$_POST['jeu']);
}

?>
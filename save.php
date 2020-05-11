<?php

    $fill = fopen("/home/sangi/Games/".date('d/m/o H:i:s').".json","w");
    fwrite($fill, "oui");
    fclose($fill);
    //file_put_contents(date('d/m/o H:i:s'),"oui");


?>
<?php
  $data = $_POST['obj'];
  $orig = file_get_contents('data.json');
  $origd = json_decode($orig, true);

  for($i = 0; $i < count($origd); $i++) {
    if ($origd[$i]['id'] == $data['id']) {
      foreach($data as $key=>$value) {
        $origd[$i][$key] = $value;
      }
      break;
    }
  }

  $origde = json_encode($origd);
  file_put_contents('data.json', $origde);
  echo $origde;
?>

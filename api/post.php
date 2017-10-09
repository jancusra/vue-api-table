<?php
  $data = $_POST['obj'];
  $orig = file_get_contents('data.json');
  $origd = json_decode($orig, true);
  $id = 1;

  for($i = 0; $i < count($origd); $i++) {
    if ($origd[$i]['id'] >= $id) {
      $id++;
    }
  }

  $data['id'] = $id;
  array_push($origd, $data);
  $origde = json_encode($origd);

  file_put_contents('data.json', $origde);
  echo $origde;
?>

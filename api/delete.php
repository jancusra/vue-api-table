<?php
  $id = $_POST['id'];
  $orig = file_get_contents('data.json');
  $origd = json_decode($orig, true);
  $index = -1;

  for($i = 0; $i < count($origd); $i++) {
    if ($origd[$i]['id'] == $id) {
      $index = $i;
      break;
    }
  }

  if ($index != -1) {
    array_splice($origd, $index, 1);
    file_put_contents('data.json', json_encode($origd));
  }

  echo json_encode($origd);
?>

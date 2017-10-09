<?php
  $id = $_GET['id'];
  $data = file_get_contents('data.json');

  if (empty($id)) {
    echo $data;
  }
  else {
    $dd = json_decode($data, true);
    $index = -1;

    for($i = 0; $i < count($dd); $i++) {
      if ($dd[$i]['id'] == $id) {
        $index = $i;
        break;
      }
    }

    if ($index != -1) {
      echo json_encode($dd[$index]);
    }
    else {
      echo json_encode(json_decode("{}"));
    }
  }
?>

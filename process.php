<?php


include_once ('classes/army.php');
include_once ('classes/battle.php');
include_once ('functions.php');


$red_soldiers_prepered = new Army($_POST['red_army_num'], 'red');
$blue_soldiers_prepered = new Army($_POST['blue_army_num'], 'blue');

//deklariranje varijable koja sluzi da detekciju kojoj je vojsci dana pomoc
$help = 'null';
if(isset($_POST['help'])){
	$help = $_POST['help'];
}
//petlja u koju su parametri vojnici poslani u bitku i varijabla $help
battle($red_soldiers_prepered, $blue_soldiers_prepered, $help);

//iz bitke se dobiva pobjednicka vojska
$survival_army = max($red_soldiers_prepered->army_array, $blue_soldiers_prepered->army_array);

$red_reducing_number = $_POST['army1'] - $_POST['red_army_num'];
$blue_reducing_number = $_POST['army2'] - $_POST['blue_army_num'];

//instanciranje dvije vojske. parametar je ukupni broj vojnika umanjen za vojnike poslane u bitku
$red_arrmy = new Army($red_reducing_number, 'red');
$blue_arrmy = new Army($blue_reducing_number, 'blue');

//pribrajanje prezivjelih vojnika ukupnom broju vojske koju je moguce poslati u sljedecu bitku
if(isset($survival_army)){
	add_survival_soldiers_to_army($blue_arrmy, $red_arrmy, $survival_army);
}

$result = array (
	'totalRed'=> $red_arrmy->current_number_soldiers(),
	'totalBlue' => $blue_arrmy->current_number_soldiers(),
	'survivalRed' => $red_soldiers_prepered->current_number_soldiers(),
	'survivalBlue' => $blue_soldiers_prepered->current_number_soldiers()
);
echo json_encode($result);
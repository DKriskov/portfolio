<?php

function half_battle_num($array1, $array2) {

	$shortest = min($array1, $array2);
	$half_battle = count($shortest);

	return $half_battle;
}

function difference_array($array1, $array2) {

	if(count($array1) > count($array2)) { 
		$diff = array_diff_key($array1, $array2);
		return $diff;
	} elseif(count($array1) < count($array2)) { 
		$diff = array_diff_key($array2, $array1);
		return $diff;
	} else {
		return 0;
	}
}

function add_survival_soldiers_to_army($blue_arrmy, $red_arrmy, $survival_army) {
	if (substr($survival_army[0], 0, 1) == 'R') {
		if (count($red_arrmy->army_array) > 0) {
			$red_arrmy->add_soldiers(count($survival_army), 'R');
		} else {
			$red_arrmy->new_array(count($survival_army), 'R');
		}
	} else {
		if (count($blue_arrmy->army_array) > 0) {
			$blue_arrmy->add_soldiers(count($survival_army), 'B');
		} else {
			$blue_arrmy->new_array(count($survival_army), 'B');
		}
	}
}

function battle($red_soldiers_prepered, $blue_soldiers_prepered, $help) {

	if($red_soldiers_prepered->current_number_soldiers() != 0 && $red_soldiers_prepered->current_number_soldiers() != 0) {
		
		//uzima se manji broj od dvije vojske poslane u bitku. To je broj vojnika koji sudjeluje u prvoj borbi
		$half_battle = half_battle_num($red_soldiers_prepered->army_array, $blue_soldiers_prepered->army_array);

		//poziva se funkcija iz koje se dobiva razlika u broju vojnika dvije vojske poslanih u bitku
		$diff = difference_array($red_soldiers_prepered->army_array, $blue_soldiers_prepered->army_array);

		//petlja koja se vrti dok god ima preostalih vojnika poslanih u bitku
		do {
			if($help != 'null'){
				//instanca objekta bitke, kojoj je parametar broj vojnika uslih u prvu borbu.
				$battle= new Battle($half_battle, $help);
			} else {
				$battle= new Battle($half_battle);
			}
			if($diff == 0){ // slucaj da je u bitku poslan jednak broj vojnika obje vojske
				$blue_soldiers_prepered->check_survivals(1, $battle, $help);
				$red_soldiers_prepered->check_survivals(2, $battle, $help);
			} else {
				foreach ($diff as $value) {
					if(substr($value, 0, 1) == "B"){ //slucaj da je vise vojnika poslanih u bitku bio iz vojske plavih
						
						//reformmiranje vojske plavih ostavljajuci visak vojnika 
						//za sljedecu borbu ako bude bilo prezivjelih iz crvene vosjke 
						$blue_soldiers_prepered->new_array(count($diff), 'B'); 
						$blue_survivals = 0;

						//prebrojavanje prezivjelih
						if(isset($battle->survivals[1])) $blue_survivals += $battle->survivals[1];

						//u slucaju da je vojsci pridruzen karizmaticni voda
						if($help == 'blue' && isset($battle->survivals[3])) $blue_survivals += $battle->survivals[3];

						//pribrojavanje broja prezivjelih iz borbe preostalim vojnicima za tu bitku
						if($blue_survivals > 0) $blue_soldiers_prepered->add_soldiers($blue_survivals, 'B');
						
						//pribrojavnje prezivjelih suprotnoj vojsci
						$red_soldiers_prepered->check_survivals(2, $battle, $help);
						break;
					} else {
						$red_soldiers_prepered->new_array(count($diff), 'R');
						$red_survivals = 0;
						if(isset($battle->survivals[2])) $red_survivals += $battle->survivals[2];
						if($help == 'red' && isset($battle->survivals[3])) $red_survivals += $battle->survivals[3];
						if($red_survivals > 0) $red_soldiers_prepered->add_soldiers($red_survivals, 'R');
						$blue_soldiers_prepered->check_survivals(1, $battle, $help);
						break;
					}
				}
			}

			//formiranje nove borbe, tj. ponovno odredivanje broja vojnika za borbu
			$half_battle = half_battle_num($red_soldiers_prepered->army_array, $blue_soldiers_prepered->army_array);
			$diff = difference_array($red_soldiers_prepered->army_array, $blue_soldiers_prepered->army_array);
		} while ( $half_battle > 0);
	}
}

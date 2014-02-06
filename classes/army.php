<?php

class Army 
{
 	public $army_array;

 	function __construct($num, $army)
 	{
 		if($army == 'red'){
	 		for($i=1; $i<= $num; $i++){
	 			$this->army_array[] = 'R'.$i;
	 		}
	 	} else {
	 		for($i=1; $i<= $num; $i++){
	 			$this->army_array[] = 'B'.$i;
	 		}
	 	}
 	}

 	public function current_number_soldiers() {
 		$current_number = count($this->army_array);
 		return $current_number;
 	}

 	public function new_array($num, $type=0) {
 		$replacement = array();
 		
 		if($num > 0) {
	 		for($i=1; $i<=$num; $i++){
	 			$replacement[] = $type.$i;
	 		}
	 	}
 		$this->army_array = $replacement;
 	}

 	public function add_soldiers($num, $type) {
 		$replacement = array();

 		for($i=1; $i<=$num; $i++){
 			$replacement[] = $type.'X'.$i;
 		}
 		$this->army_array = array_merge($this->army_array, $replacement);
 	}

 	public function check_survivals($type, $battle, $help) {
 		$survivals=0;
 		if(isset($battle->survivals[$type])) $survivals += $battle->survivals[$type];
 		if($help == 'red' && isset($battle->survivals[3]) && $type == 2) $survivals += $battle->survivals[3];
 		if($help == 'blue' && isset($battle->survivals[3]) && $type == 1) $survivals += $battle->survivals[3];
 		if($type == 1) $this->new_array($survivals, 'B'); else $this->new_array($survivals, 'R');
 	}
} 

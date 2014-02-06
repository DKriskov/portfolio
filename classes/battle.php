<?php

 class Battle 
 {
 	public $array;
 	public $survivals;

 	//Ideja bitke je ta da u bitku ulazi jednak broj clanova svake vojske.
 	//Izlazi 50% vojnika. Battle objekt generira array od pola ukupne vojske u borbi (prezivjeli), cije su vrijednosti
 	//slucajno generirani brojevi 1 ili 2, koji oznacuju kojoj vojsci pripadaju prezivjeli.
 	//Plava vojska broje jedinice, a crvena dvojke.

 	//U slucaju da neka vojska ima pomoc dodaje se i broj 3 u array prezivjelih
 	//kako se broj prezivjelih ne povecava, vjerojatnost da ce bilo koji od tih brojeva bit izvucen je 1/3
 	//ekipa kojoj je dodjeljena pomoc povecava svoje sanse u bitki za 33%

 	function __construct($half, $help=0){
 		if($help === 0){
 			for($i=1; $i<=$half; $i++){
 				$this->array[]=rand(1, 2);
	 		}
	 		$this->survivals=array_count_values($this->array);
 		} else {
 			for($i=1; $i<=$half; $i++){
 				$this->array[]=rand(1, 3);
	 		}
	 		$this->survivals=array_count_values($this->array);
 		}	
 	}
 }
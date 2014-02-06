var o,
AppWidget = {

	settings: {
		redSlider: $( ".slider1" ),
		redNumInput: $('.amount1'),
		blueSlider: $( ".slider2" ),
		blueNumInput: $('.amount2'),
		redScore: $('#red-score'),
		blueScore: $('#blue-score'),
		currentTotalRed: $('#battle-army-red'),
		currentTotalBlue: $('#battle-army-blue'),
		redMax: '',
		blueMax: '',
		battleNum: 0,
		totalScore: {
			totalRedWins: 0,
			totalBlueWins: 0
		},
		template: _.template(
	      $( "script.template-survivals" ).html()
	    ),
	    templateFinish: _.template(
	      $( "script.template-finish" ).html()
	    )
	},

	init: function() {

		o = this.settings;
		this.toggleFeature();

		$( "#startForm" ).validate({
    	  submitHandler: function() { 
    	  	o.redMax = $('#init-red-num').val();
		  	o.blueMax = $('#init-blue-num').val();

		  	AppWidget.sliderInit();
		  	AppWidget.warInit();
    	  	return false;
    	  },
		  rules: {
		    redArmy: {
		    	required: true,
		    	number: true,
		        min: 1
		    },
		    blueArmy: {
		    	required: true,
		    	number: true,
		        min: 1
		    }
		  }
		});

		$('.survivals-message').remove();
	},

	sliderInit: function() {
		o.redSlider.slider({
	      min: 0,
	      max: o.redMax,
	      step: 1,
	      value: 0,
	      
	      slide: function( event, ui ) {
	        o.redNumInput.val(ui.value);
	      }
	    });

		o.blueSlider.slider({
	      min: 0,
	      max: o.blueMax,
	      step: 1,
	      value: 0,
	      
	      slide: function( event, ui ) {
	        o.blueNumInput.val(ui.value);
	      }
	    });
	},

	toggleFeature: function() {

		$('#special-feature-trigger').click(function(e){
	    	$('.special-feature').toggle('slow');
	    	e.preventDefault();
	    });
	},

	warInit: function(data) {
		
		o.redScore.html(o.redMax);
		o.blueScore.html(o.blueMax);

		o.currentTotalRed.val(o.redMax);
		o.currentTotalBlue.val(o.blueMax);

		o.redNumInput.val(0);
		o.blueNumInput.val(0);

		$('#startForm').parent().hide();
		$('#battle-form-cont').show();

		$('.final-message').remove();
		$('.total-score').remove();
		o.battleNum = 0;
		$('#battle-form').show();
	},

	processFormJson: function(data) {
		console.log(data);
		
		if(data.totalRed == 0 || data.totalBlue == 0) {

			if(data.totalRed == 0) {
				o.totalScore.totalBlueWins += 1;
				winArmy = {
					army: 'plava',
					button: 'primary',
					survival: data.totalBlue,
					h2h: o.totalScore
				};
			} else if (data.totalBlue == 0) {
				o.totalScore.totalRedWins += 1;
				winArmy = {
					army: 'crvena',
					button: 'danger',
					survival: data.totalRed,
					h2h: o.totalScore
				};
			}
			$('#battle-form').hide();
			$('#startForm').parent().show();
			$('#init-red-num').val(0);
			$('#init-blue-num').val(0);
			$('#battle-form-cont').prepend(o.templateFinish(winArmy));
			
			o.redScore.html(data.totalRed);
			o.blueScore.html(data.totalBlue);
			AppWidget.init();

		} else {
			AppWidget.setOptiopns(data);

			redSurvivals = {
		    	survivals: data.survivalRed,
		    	battleNum: o.battleNum,
		    	army: 'crvene'
		    };

		    blueSurvivals = {
		    	survivals: data.survivalBlue,
		    	battleNum: o.battleNum,
		    	army: 'plave'
		    };

		    AppWidget.sliderInit();

	    	$('.survivals-blue').append(o.template(blueSurvivals));
	    	$('.survivals-red').append(o.template(redSurvivals));
		}
    },

    setOptiopns: function(data) {

    	o.battleNum += 1;
		o.redMax = data.totalRed;
		o.blueMax = data.totalBlue;

		o.currentTotalRed.val(o.redMax);
		o.currentTotalBlue.val(o.blueMax);

		o.redNumInput.val(0);
		o.blueNumInput.val(0);

		o.redScore.html(data.totalRed);
		o.blueScore.html(data.totalBlue);
    },

    errorMessage: function() {
    	var message = '<p class="battleValidation">Obje vojske moraju imati barem jednog vojnika u bitci</p>';
    	$('#battleSubmit').after(message);
    }

}
var DataService = {

    serviceBase: 'data/',

    getProjects: function(callback) {
        $.getJSON(this.serviceBase + 'projects.json?nocache=12',
          function(data) {
            callback(data);           //render template
            s.projectsData = data;   //cashe data in settings
        });
    },

    ajaxForm: function() {
    	$('#battle-form').ajaxForm({ 
    		beforeSubmit: function(formData, jqForm, options) {
    			$('.battleValidation').remove();
    			if(formData[1].value == 0 || formData[3].value == 0) {
    				DataService.errorMessage();
    				return false;
    			}
    			return true;
    		},
	        dataType:  'json',
	        success:   AppWidget.processFormJson 
	    });
    },

    errorMessage: function() {
    	var message = '<p class="battleValidation">Obje vojske moraju imati barem jednog vojnika u bitci</p>';
    	$('#battleSubmit').after(message);
    }

};
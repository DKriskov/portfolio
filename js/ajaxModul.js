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
    				AppWidget.errorMessage();
    				return false;
    			}
    			return true;
    		},
	        dataType:  'json',
	        success:   AppWidget.processFormJson 
	    });
    }

};
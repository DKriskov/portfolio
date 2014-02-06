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
	        dataType:  'json',
	        success:   AppWidget.processFormJson 
	    });
    }

};
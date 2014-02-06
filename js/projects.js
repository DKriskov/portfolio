var s,
ProjectsWidget = {

  settings: {

    moreButton: $(".more-button"),
    projectName: '',
    projectsData: '',
    loaded: false,
    template: _.template(
      $( "script.template" ).html()
    )

  },

  init: function() {

    s = this.settings;
    this.bindUIActions();

  },

  bindUIActions: function() {

    s.moreButton.on("click", function() {

      thisDom = $(this);
      s.projectName = thisDom.data('project');
      clickedButton = thisDom.attr("clicked");

      
      ProjectsWidget.toggleEffects(clickedButton, thisDom);
      ProjectsWidget.readMoreAction(clickedButton, thisDom);
      
      thisDom.attr("clicked", "yes");

    });

  },

  renderProjects: function(data) {

    single_project = {
      project: _.where(data.projects, {id: s.projectName})
    };
    
    $( "#"+s.projectName ).after(s.template( single_project ));

  },

  readMoreAction: function(clickedButton, thisDom) {

    if(!s.loaded && clickedButton != "yes"){

        DataService.getProjects(ProjectsWidget.renderProjects);
        s.loaded = true;
        thisDom.html('Hide');

      } else if (s.loaded && clickedButton == 'no') {

        if(thisDom.html() == "Read More") thisDom.html('Hide');
        ProjectsWidget.renderProjects(s.projectsData);

      }
  },

  toggleEffects: function(clickedButton, thisDom) {

    if(clickedButton == 'yes') {
        thisDom.next().slideToggle('slow');
        if(thisDom.html() == "Hide") {
          thisDom.html('Show');
        } else if (thisDom.html() == 'Show') {
          thisDom.html('Hide');
        }
      }
  }

};
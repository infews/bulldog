(function($) {
  bulldog.ProjectListAgent = function(view, projects) {
    var self = this;

    var currentSelection = 'All';

    self.setCurrentSelection = function(value) {
      if (projects.find(function(p){ return value === p.get('name'); })) {
        currentSelection = value;
      } else {
        currentSelection = 'All';
      }
    };

    self.getCurrentSelection = function() {
      return currentSelection;
    };

    self.getProjectLocals = function() {
      var locals = projects.map(function(project) {
        var p = {
          className: 'project',
          name: project.get('name')
        };

        if (p.name === currentSelection) {
          p.className += ' selected';
        }

        if (p.name == '') {
          p.name = '(none)';
        }

        p.name = prettyProjectName(p.name);

        return p;
      });

      return { projects: locals };

      function prettyProjectName(str) {

        return _(_(str).humanize()).titleize();
      }
    };

    return self;
  }
}(jQuery));
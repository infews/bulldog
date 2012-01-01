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
      return {
        projects: projects.map(buildLocals)
      };
    };

    return self;

    function buildLocals(project) {
      var name = project.get('name');
      if (name == '') {
        name = '(none)';
      }

      var classes = ['project'];
      if (name === currentSelection) {
        classes.push('selected');
      }

      return {
        name: prettyProjectName(name),
        className: classes.join(' '),
        url: "project/" + project.get('name')
      };
    }

    function prettyProjectName(str) {
      return _(_(str).humanize()).titleize();
    }

  }
}(jQuery));
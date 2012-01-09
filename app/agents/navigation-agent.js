(function($) {
  bulldog.NavigationAgent = function(view, projects) {
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

    self.findProjectByPrettyName = function(prettyName) {
      return projects.find(function(project) {
        return prettyProjectName(project.get('name')) === prettyName;
      });
    };

    return self;

    function buildLocals(project) {
      var name = project.get('name');

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
      if (str == '') {
        return '(none)';
      }

      return _(_(str).humanize()).titleize();
    }

  }
}(jQuery));
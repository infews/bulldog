(function($) {
  bulldog.NavigationAgent = function(view, options) {
    var self = this;

    var selectedTab = '+';
    var selectedProject = 'All';
    var selectedContext = '(none)';

    self.selectTab = function(value) {
      selectedTab = _(['+', '@']).include(value) ? value: '+';
      view.render();
    };

    self.getSelectedTab = function() {
      return selectedTab;
    };

    self.selectProject = function(value) {
      selectedProject = valueOrDefaultValue(options.projects, value, 'All');
    };

    self.getSelectedProject = function() {
      return selectedProject;
    };
    
    self.selectContext = function(value) {
      selectedContext = valueOrDefaultValue(options.contexts, value, '(none)');
    };

    self.getSelectedContext = function() {
      return selectedContext;
    };

    self.getLocals = function() {
      var tabs = [{text: '+', className: 'projects'}, {text: '@', className: 'contexts'}];
      var list = [];
      if (selectedTab == '+') {
        tabs[0].className += ' active';
        list = options.projects.map(projectsForLocals);
      } else {
        tabs[1].className += ' active';
        list = options.contexts.map(contextsForLocals)
      }

      return {
        tabs: tabs,
        list: list
      };
    };

    self.findProjectByPrettyName = function(prettyName) {
      return options.projects.find(function(project) {
        return prettyProjectName(project.get('name')) === prettyName;
      });
    };

    return self;

    function valueOrDefaultValue(collection, value, defaultValue) {
      return (collection.find(function(c){ return value === c.get('name'); }) ? value : defaultValue);
    }

    function projectsForLocals(project) {
      var name = project.get('name');

      var classes = ['project'];
      if (name === selectedProject) {
        classes.push('active');
      }

      return {
        name: prettyProjectName(name),
        className: classes.join(' '),
        url: "todo/project/" + project.get('name')
      };
    }

    function contextsForLocals(context) {
      var name = context.get('name');

      var classes = ['context'];
      if (name === selectedContext) {
        classes.push('active');
      }

      return {
        name: prettyContextName(name),
        className: classes.join(' '),
        url: "todo/context/" + name
      };
    }

    function prettyProjectName(str) {
      if (str == '') {
        return '(none)';
      }

      return _(_(str).humanize()).titleize();
    }

    function prettyContextName(str) {
      if (str == '') {
        return '(none)';
      }

      return _(str).humanize();
    }

  }
}(jQuery));
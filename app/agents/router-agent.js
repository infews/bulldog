(function($) {
  bulldog.RouterAgent = function(router, taskList) {
    var self = this;

    var projectList = new Backbone.Collection(projectsFrom(taskList));
    var contextList = new Backbone.Collection(contextsFrom(taskList));

    self.getProjectList = function() {
      return projectList;
    };

    self.getContextList = function() {
      return contextList;
    };

    self.selectProject = function(name) {
      var list = taskList;

      if (name != 'All') {
        var tasks = _(taskList.filter(byName)).sortBy(priority);
        list = new bulldog.TaskList(tasks);
      }

      router.select('projects', name, list);

      function byName(task) { return task.get('projectName') == name; }
    };

    self.selectContext = function(name) {
      var contextName = name ? name : contextList.first().get('name');
      var tasks = _(taskList.filter(byContextName)).sortBy(priority);

      router.select('contexts', contextName, new bulldog.TaskList(tasks));

      function byContextName(task) { return task.get('context') == contextName; }
    };

    return self;

    function projectsFrom(tasks) {
      var names = tasks.reduce(toUniqueProjectNames, []).sort();
      moveEmptyToEnd(names);
      names.unshift('All');

      return _(names).map(function(n) {
        return new Backbone.Model({name: n});
      });

      function toUniqueProjectNames(names, task) {
        addIfUnique(names, task.get('projectName'));
        return names;
      }
    }

    function contextsFrom(tasks) {
      var names = tasks.reduce(toUniqueContextNames, []).sort();

      moveEmptyToEnd(names);

      return _(names).map(function(n) {
        return new Backbone.Model({name: n});
      });

      function toUniqueContextNames(names, task) {
        addIfUnique(names, task.get('context'));
        return names;
      }
    }

    function moveEmptyToEnd(list) {
      var index = _(list).indexOf('');

      if (index >= 0) {
        list.splice(list.length - 1, 0, list.splice(index, 1)[0]);
      }
    }

    function addIfUnique(list, value) {
      if (!_(list).include(value)) {
        list.push(value);
      }
    }

    function priority(task) {
      if (task.isNextAction()) {
        return "0";
      }
      return task.get('priority') || "ZZ";
    }

  };
}(jQuery));
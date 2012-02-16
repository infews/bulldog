(function($) {
  bulldog.RouterAgent = function(router, taskList) {
    var self = this;

    var projectList = new Backbone.Collection(projectsFrom(taskList));
    var contextList = new Backbone.Collection(contextsFrom(taskList));
    var contextsWithNextActionsList = new Backbone.Collection(contextsWithNextActions(taskList));

    self.getProjectList = function() {
      return projectList;
    };

    self.getContextList = function() {
      return contextList;
    };

    self.getContextsWithNextActionsList = function() {
      return contextsWithNextActionsList;
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
      var tasks = _(taskList.filter(byContextName(contextName))).sortBy(priority);

      router.select('contexts', contextName, new bulldog.TaskList(tasks));
    };

    self.selectContextsWithNextActions = function(name) {
      var contextName = name ? name : contextsWithNextActionsList.first().get('name');
      var tasks = _(taskList.filter(byContextName(contextName))).sortBy(priority);

      router.select('nextActions', contextName, new bulldog.TaskList(tasks));
    };

    return self;

    function byContextName(name) {
      return function (task) {
        return task.get('context') == name;
      };
    }

    function projectsFrom(tasks) {
      var names = tasks.reduce(toUniqueProjectNames, []).sort();
      moveEmptyToEnd(names);
      names.unshift('All');

      return _(names).map(buildModels);

      function toUniqueProjectNames(names, task) {
        addIfUnique(names, task.get('projectName'));
        return names;
      }
    }

    function contextsFrom(tasks) {
      var names = tasks.reduce(toUniqueContextNames, []).sort();

      moveEmptyToEnd(names);

      return _(names).map(buildModels);
    }

    function contextsWithNextActions(tasks) {
      var names = _(tasks.filter(withNextActions))
        .reduce(toUniqueContextNames, [])
        .sort();

      moveEmptyToEnd(names);

      return _(names).map(buildModels);

      function withNextActions(task) {
        return task.isNextAction();
      }
    }

    function toUniqueContextNames(names, task) {
      addIfUnique(names, task.get('context'));
      return names;
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

    function buildModels(name) {
      return new Backbone.Model({name: name});
    }

  };
}(jQuery));
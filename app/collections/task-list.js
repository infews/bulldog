(function($, namespace) {
  namespace.TaskList = function(options) {
    var baseOptions = {
      localStorage: new Store("TaskList"), // TODO: probably don't need this
      model:        namespace.Task,
      comparator:   priority
    };

    var self = new (Backbone.Collection.extend(baseOptions))(options);

    self.actionsForProject = function(projectName) {
      if (projectName == 'All') {
        return self;
      } else {
        return filtered(byProjectName);
      }

      function byProjectName(task) {
        return task.get('projectName') == projectName;
      }
    };

    self.actionsForContext = function(contextName) {
      return filtered(byContextName);

      function byContextName(task) {
        return task.get('context') == contextName;
      }
    };

    self.nextActionsForContext = function(contextName) {
      return filtered(forNextActionsByContextName);

      function forNextActionsByContextName(task) {
        return task.get('context') == contextName && task.isNextAction();
      }
    };

    return self;

    function priority(task) {
      if (task.isNextAction()) {
        return "0";
      }
      return task.get('priority') || "ZZ";
    }

    function filtered(filterFn) {
      var tasks = self.filter(filterFn);
      return new namespace.TaskList(tasks);
    }
  };
}(jQuery, bulldog));
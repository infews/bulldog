(function($, namespace) {
  namespace.TaskList = function(options) {
    var baseOptions = {
      localStorage: new Store("TaskList"),
      model:        namespace.Task,
      comparator:   priority,
    };

    var self = new (Backbone.Collection.extend(baseOptions))(options);

    self.actionsForProject = function(projectName) {
      if (projectName == 'All') {
        return this.models;
      } else {
        return this.filter(byProjectName);
      }

      function byProjectName(task) {
        return task.get('projectName') == projectName;
      }
    };

    self.actionsForContext = function(contextName) {
      return this.filter(byContextName);

      function byContextName(task) {
        return task.get('context') == contextName;
      }
    };

    self.nextActionsForContext = function(contextName) {
      return this.filter(forNextActionsByContextName);

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
  };
}(jQuery, bulldog));
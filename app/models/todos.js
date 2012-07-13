(function($) {
  bulldog.models.ToDos = function(tasks) {
    var self = this;

    var taskList = new bulldog.collections.TaskList(tasks);

    var todos = {
      projects:       new Backbone.Collection(projectsFrom(taskList)),
      contexts:       new Backbone.Collection(contextsFrom(taskList)),
      'next-actions': new Backbone.Collection(contextsWithNextActions(taskList))
    };

    self.taskList = function() {
      return taskList;
    };

    self.projects = function() {
      return todos.projects;
    };

    self.contexts = function() {
      return todos.contexts;
    };

    self['next-actions'] = function() {
      return todos['next-actions'];
    };

    return self;

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
      var index = _(list).indexOf('__none');

      if (index >= 0) {
        list.splice(list.length - 1, 0, list.splice(index, 1)[0]);
      }
    }

    function addIfUnique(list, value) {
      if (_(list).include(value)) {
        return;
      }
      list.push(value);
    }

    function buildModels(name) {
      return new Backbone.Model({name: name});
    }
  }
}(jQuery));
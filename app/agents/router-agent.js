(function($) {
  bulldog.RouterAgent = function(router, taskList) {
    var self = this;

    var navigationLists = {
      projects:       new Backbone.Collection(projectsFrom(taskList)),
      contexts:       new Backbone.Collection(contextsFrom(taskList)),
      'next-actions': new Backbone.Collection(contextsWithNextActions(taskList))
    };

    var validNavigationTabs = ['projects', 'contexts', 'next-actions'];
    var currentList = validNavigationTabs[0];
    var currentItem = navigationLists[currentList].first().get('name');

    self.selectProject = function(name) {
      currentList = 'projects';
      setCurrentItem(name);
      updateWith('actionsForProject');
    };

    self.selectContext = function(name) {
      currentList = 'contexts';
      setCurrentItem(name);
      updateWith('actionsForContext');
    };

    self.selectContextsWithNextActions = function(name) {
      currentList = 'next-actions';
      setCurrentItem(name);
      updateWith('nextActionsForContext');
    };

    self.getCurrentSelection = function() {
      return {
        currentList: currentList,
        collection:  navigationLists[currentList],
        currentItem: currentItem
      };
    };

    return self;

    function setCurrentItem(name) {
      currentItem = name ? name : navigationLists[currentList].first().get('name');
    }

    function updateWith(filterName) {
      var tasks = taskList[filterName](currentItem);
      var list = new bulldog.TaskList(tasks);

      router.updateNavigationView();
      router.updateTaskListView(list);
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
      var index = _(list).indexOf('__none');

      if (index >= 0) {
        list.splice(list.length - 1, 0, list.splice(index, 1)[0]);
      }
    }

    function addIfUnique(list, value) {
      if (!_(list).include(value)) {
        list.push(value);
      }
    }

    function buildModels(name) {
      return new Backbone.Model({name: name});
    }

  };
}(jQuery));
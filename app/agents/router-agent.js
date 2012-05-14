(function($) {
  bulldog.RouterAgent = function(router, taskList) {
    var self = this;

    var navigationLists = {
      projects:       new Backbone.Collection(projectsFrom(taskList)),
      contexts:       new Backbone.Collection(contextsFrom(taskList)),
      'next-actions': new Backbone.Collection(contextsWithNextActions(taskList))
    };

    var validNavigationTabs = ['projects', 'contexts', 'next-actions'];
    var currentTab = validNavigationTabs[0];
    var currentItem = navigationLists[currentTab].first().get('name');

    self.selectProject = function(name) {
      currentTab = 'projects';

      setCurrentItem(name);

      var tasks;
      if (currentItem == 'All') {
        tasks = taskList.models;
      } else {
        tasks = taskList.filter(byProjectName);
      }

      var list = new bulldog.TaskList(tasks);

      router.updateNavigationView();
      router.updateTaskListView(list);

      function byProjectName(task) {
        return task.get('projectName') == name;
      }
    };

    self.selectContext = function(name) {
      currentTab = 'contexts';

      setCurrentItem(name);

      var tasks = taskList.filter(byContextName(currentItem));

      router.updateNavigationView();
      router.updateTaskListView(new bulldog.TaskList(tasks));
    };

    self.selectContextsWithNextActions = function(name) {
      currentTab = 'next-actions';

      setCurrentItem(name);

      var tasks = _(taskList.filter(byContextName(currentItem))).select(onlyNextActions);

      router.updateNavigationView();
      router.updateTaskListView(new bulldog.TaskList(tasks));
    };

    self.getCurrentSelection = function() {
      return {
        currentList:  currentTab,
        collection: navigationLists[currentTab],
        currentItem: currentItem
      };
    };

    return self;

    function setCurrentItem(name) {
      currentItem =  name ? name : navigationLists[currentTab].first().get('name');
    }

    function byContextName(name) {
      return function(task) {
        return task.get('context') == name;
      };
    }

    function onlyNextActions(task) {
      return task.isNextAction();
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
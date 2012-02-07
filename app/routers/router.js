(function($) {
  bulldog.Router = Backbone.Router.extend({

    routes: {
      '/':               'root',
      '/projects/:name': 'project',
      '/contexts/:name': 'context',
      '/contexts': 'firstContext'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
      this.projectList = new Backbone.Collection(projectsFrom(this.taskList));
      this.contextList = new Backbone.Collection(contextsFrom(this.taskList));

      this.navigationView = new bulldog.NavigationView({
        projects: this.projectList,
        contexts: this.contextList
      });

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
    },

    root: function() {
      $('nav').append(this.navigationView.render().el);
      this.project('All');
    },

    project: function(name) {
      var taskList = this.taskList;

      if (name != 'All') {
        var tasks = this.taskList.filter(function(task) {
          return task.get('projectName') == name;
        });
        taskList = new bulldog.TaskList(tasks);
      }

      this.select(taskList, 'projecs', name);
    },

    context: function(name) {
      var tasks = this.taskList.filter(function(task) {
        return task.get('context') == name;
      });
      var taskList = new bulldog.TaskList(tasks);

      this.select(taskList, 'contexts', name);
    },

    firstContext: function() {
      var contextName = this.contextList.first().get('name');
      var tasks = this.taskList.filter(function(task) {
        return task.get('context') == contextName;
      });
      var taskList = new bulldog.TaskList(tasks);

      this.select(taskList, 'contexts', contextName);
    },

    select: function(taskList, listName, itemName) {
      this.navigationView.select({list: listName, name: itemName});
      delete this.tasksView;
      this.tasksView = new bulldog.TaskListView({collection: taskList});
      $('section.tasks').html(this.tasksView.render().el);
    }
  });
}(jQuery));
(function($) {
  bulldog.Router = Backbone.Router.extend({

    routes: {
      '/':              'root',
      '/projects/:name': 'project',
      '/contexts/:name': 'context'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
      this.projectList = new Backbone.Collection(projectsFrom(this.taskList));
      this.contextList = new Backbone.Collection(contextsFrom(this.taskList));

      function projectsFrom(tasks) {
        var names = tasks.reduce(toUniqueProjectNames, ['All']);

        moveEmptyToEnd(names);

        return _(names).map(function(n) {
          return new Backbone.Model({name: n});
        });

        function toUniqueProjectNames(names, task) {
          addIfUnique(names, task.get('projectName'));
          return names;
        }
      }

      function contextsFrom(tasks) {
        var names = tasks.reduce(toUniqueContextNames, []);

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
      this.navigationView = new bulldog.NavigationView({
        projects: this.projectList,
        contexts: this.contextList
      });
      $('nav').append(this.navigationView.render().el);
      this.project('All');
    },

    project: function(projectName) {
      var taskList = this.taskList;

      if (projectName != 'All') {
        var tasks = this.taskList.filter(function(task) {
          return task.get('projectName') == projectName;
        });
        taskList = new bulldog.TaskList(tasks);
      }

      delete this.tasksView;
      this.tasksView = new bulldog.TaskListView({collection: taskList});
      var $taskList = $('.task-list');
      if ($taskList.length > 0) {
        this.replace('.task-list', this.tasksView.render().el);
      } else {
        $('section.tasks').append(this.tasksView.render().el);
      }
    },

    replace: function(selector, node) {
      var $appNode = $(selector);
      $appNode.empty();
      $appNode.append(node);
    }

  });
}(jQuery));
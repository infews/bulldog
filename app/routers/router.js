(function($) {
  bulldog.Router = Backbone.Router.extend({

    routes: {
      '/':              'view',
      '/project/:name': 'project'
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

      function addIfUnique(list, value)  {
        if (!_(list).include(value)) {
          list.push(value);
        }
      }

    },

    tasksFor: function(options) {
      var taskList = this.taskList;

      if (options.projectName != 'All') {
        var tasks = this.taskList.filter(function(task) {
          return task.get('projectName') == options.projectName;
        });
        taskList = new bulldog.TaskList(tasks);
      }

      this.tasksView = new bulldog.TaskListView({collection: taskList});
      this.replace('.tasks', this.tasksView.render().el);
    },

    allProjects: function() {
      this.allProjectsView = new bulldog.ProjectListView({collection: this.projectList});
      var self = this;
      this.replace('.projects', this.allProjectsView.render().el);
      this.allProjectsView.bind('project', function(project) {
        self.navigate('/project/' + project.get('name'), true);
      });
    },

    view: function() {
      this.allProjects();
      this.tasksFor({projectName: 'All'});
    },

    project: function(projectName) {
      this.tasksFor({projectName: projectName});
    },

    replace: function(selector, node) {
      var $appNode = $(selector);
      $appNode.empty();
      $appNode.append(node);
    }

  });
}(jQuery));
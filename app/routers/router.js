(function($) {
  bulldog.Router = Backbone.Router.extend({

    routes: {
      '/':              'view',
      '/project/:name': 'project'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
      this.projectList = new Backbone.Collection(projectsFrom(this.taskList));

      function projectsFrom(tasks) {
        var names = tasks.reduce(toUniqueProjectNames, ['All']);

        moveNoneToEnd(names);

        return _(names).map(function(n) {
          return new Backbone.Model({name: n});
        });

        function toUniqueProjectNames(names, task) {
          name = task.get('project');

          if (!_(names).include(name)) {
            names.push(name);
          }

          return names;
        }

        function moveNoneToEnd(list) {
          var index = _(list).indexOf('');

          if (index >= 0) {
            list.splice(list.length - 1, 0, list.splice(index, 1)[0]);
          }
        }
      }
    },

    tasksFor: function(options) {
      var taskList = this.taskList;

      if (options.project != 'All') {
        var tasks = this.taskList.filter(function(t) {
          return t.get('project') == options.project;
        });
        taskList = new bulldog.TaskList(tasks);
      }

      this.tasksView = new bulldog.TaskListView({collection: taskList});
      this.replace('.tasks', this.tasksView.render().el);
    },

    allProjects: function() {
      this.allProjectsView = new bulldog.ProjectListView({collection: this.projectList});
      this.replace('.projects', this.allProjectsView.render().el);
    },

    view: function() {
      this.allProjects();
      this.tasksFor({project: 'All'});
    },

    project: function(project) {
      this.tasksFor({project: project});
    },

    replace: function(selector, node) {
      var $appNode = $(selector);
      $appNode.empty();
      $appNode.append(node);
    }

  });
}(jQuery));
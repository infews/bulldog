(function($) {
  bulldog.App = Backbone.Router.extend({

    routes: {
      '/all':          'allTasks',
      '/projects/all': 'projectList'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
    },

    allTasks: function() {
      this.allTasksView = new bulldog.TaskListView({collection: this.taskList});
      var $appNode = $('.app');
      $appNode.empty();
      $appNode.append(this.allTasksView.render().el);
    },

    projectList: function() {
      var projects = new Backbone.Collection(projectsFrom(this.taskList));
      this.allProjectsView = new bulldog.ProjectListView({collection: projects});
      var $appNode = $('.app');
      $appNode.empty();
      $appNode.append(this.allProjectsView.render().el);

      function projectsFrom(tasks) {
        var names = tasks.reduce(addUniqueName, []);

        return _(names).map(function(n) {
          if (n == '') {
            n = '(none)';
          }

          return new Backbone.Model({name: n});
        });

        function addUniqueName(names, task) {
          name = task.get('project');

          if (!_(names).include(name)) {
            names.push(name);
          }

          return names;
        }
      }
    }
  });
}(jQuery));
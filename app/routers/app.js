(function($) {
  bulldog.App = Backbone.Router.extend({

    routes: {
      '/all': 'allTasks'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
    },

    allTasks: function() {
      this.allTasksView = new bulldog.TaskListView({collection: this.taskList});
      var $appNode = $('.app');
      $appNode.empty();
      $appNode.append(this.allTasksView.render().el);
    }

  });
}(jQuery));
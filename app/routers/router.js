(function($) {
  bulldog.Router = Backbone.Router.extend({

    routes: {
      '':           'todo',
      'todo':       'todo',
      'todo/*path': 'todo'
    },

    initialize: function(taskList) {
      this.toDoController = new bulldog.ToDoController(taskList);
    },

    todo: function(path) {
      var pathElements = path ? path.split('/') : [];
      this.toDoController.action(pathElements[0], pathElements[1]);
    }
  });
}(jQuery));
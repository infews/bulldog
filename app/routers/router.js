(function($, namespace) {
  namespace.Router = Backbone.Router.extend({

    routes: {
      '':           'todo',
      'todo':       'todo',
      'todo/*path': 'todo'
    },

    initialize: function() {
      var taskList = getDawg().getToDos().taskList();
      this.toDoController = new bulldog.controllers.ToDo(taskList);
    },

    todo: function(path) {
      var pathElements = path ? path.split('/') : [];
      this.toDoController.action(pathElements[0], pathElements[1]);
    }
  });
}(jQuery, bulldog));
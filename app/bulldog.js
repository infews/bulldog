(function($) {
  bulldog = {};
  bulldog.App = function() {
    var self = this;

    var todos, taskList, todotxt;

    self.version = "0.4.0";

    self.loadTodoTxt = function() {
      todotxt.build(function(tasks) {
        taskList = new bulldog.TaskList(tasks.todo);
        todos = new bulldog.ToDos(tasks.todo);
      });
    };

    self.getToDos = function() {
      return todos;
    };

    self.start = function() {
      window.router = new bulldog.Router(taskList);
      Backbone.history.start();
    };

    initialize();

    return self;

    function initialize() {
      todotxt = new bulldog.TodoTxtApi();
    }
  };
}(jQuery));
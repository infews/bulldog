(function($) {
  bulldog.models.App = function() {
    var self = this;

    var todos, taskList, todotxt;

    self.version = "0.4.0";

    self.loadTodoTxt = function(done) {
      todotxt.build(function(tasks) {
        taskList = new bulldog.collections.TaskList(tasks.todo);
        todos = new bulldog.models.ToDos(tasks.todo);

        if (done) {
          done();
        }
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
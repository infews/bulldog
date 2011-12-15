(function ($) {

  todoTxt = {};
  todoTxt.load = function(onSuccess) {
    $.ajax({
      type: "GET",
      url: "todo.txt",
      dataType: "html",
      success: splitTasks
    });

    function splitTasks(data) {
      var tasks = data.split("\n");
      onSuccess(tasks);
    }
  };

  todoTxt.buildTasks = function(onSuccess)  {
    todoTxt.load(createTasks);

    function createTasks(descriptions) {
      var tasks = _.map(descriptions, function(desc) {
        return new bulldog.Task({
          description: desc
        });
      });

      onSuccess(tasks);
    }
  };

}(jQuery));
(function ($) {

  todoTxt = {};
  todoTxt.load = function(onSuccess) {
    $.ajax({
      type: "GET",
      url: "http://localhost/bulldog/build/dev/todo.txt",
      dataType: "html",
      success: splitTasks
    });

    function splitTasks(data) {
      var tasks = _(data.split("\n")).reject(function(item) { return item.length == 0; });
      onSuccess(tasks);
    }
  };

  todoTxt.buildTasks = function(onSuccess)  {
    todoTxt.load(createTasks);

    function createTasks(actions) {
      var i = 0;
      var tasks = _(actions).map(function(desc) {
        i++;
        return new bulldog.Task(taskProperties(desc, i));
      });

      onSuccess(tasks);
    }

    function taskProperties(taskText, number) {
      var projectRE = /\+(\w+)/,
          contextRE = /@(\w+)/,
          project, context;

      project = extract(projectRE);
      context = extract(contextRE);

      return {
        action: _.clean(taskText.replace(projectRE, '').replace(contextRE, '')),
        context: context,
        project: project,
        number: number
      };

      function extract(re) {
        var match = taskText.match(re);
        return match ? match[1] : ''
      }
    }
  };

}(jQuery));
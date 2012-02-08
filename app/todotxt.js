(function ($) {

  todoTxt = {};
  todoTxt.load = function(onSuccess) {
    $.ajax({
      type: "GET",
      url: "./todo.txt",
      dataType: "html",
      success: splitTasks
    });

    function splitTasks(data) {
      var tasks = data.split("\n");
      onSuccess(tasks);
    }
  };

  todoTxt.build = function(onSuccess)  {
    todoTxt.load(parseData);

    function parseData(actions) {
      var i = 0;
      var tasks = _(actions).reduce(toOnlyNonEmptyTasks, []);

      onSuccess(tasks);

      function toOnlyNonEmptyTasks(tasks, taskline) {
        i++;
        if (taskline.length) {
          var properties = taskPropertiesFrom(taskline);
          properties.number = i;
          tasks.push(new bulldog.Task(properties));
        }
        return tasks;
      }
    }

    function taskPropertiesFrom(taskText) {
      var projectRE = /\+(\w+)/,
          contextRE = /@(\w+)/,
          project, context;

      project = extract(projectRE);
      context = extract(contextRE);

      return {
        action: _.clean(taskText.replace(projectRE, '').replace(contextRE, '')),
        context: context,
        projectName: project
      };

      function extract(re) {
        var match = taskText.match(re);
        return match ? match[1] : ''
      }
    }
  };

}(jQuery));
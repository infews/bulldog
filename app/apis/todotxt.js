(function($) {
  bulldog.TodoTxtApi = function() {
    var self = this;

    self.build = function(onSuccess) {
      var tasks = {};

      loadToDos()
        .done(function(data) {
          tasks.todo = parseTasks(data.split("\n"));
        })
        .fail(function() {
          tasks.todo = [];
        })
        .always(finish);

      loadDones()
        .done(function(data) {
          tasks.done = parseTasks(data.split("\n"));
        })
        .fail(function() {
          tasks.done = [];
        })
        .always(finish);

      function finish() {
        if (tasks.todo && tasks.done) {
          onSuccess(tasks);
        }
      }
    };

    return self;

    function loadToDos() {
      return ajaxGet("./todo.txt");
    }

    function loadDones() {
      return ajaxGet("./done.txt");
    }

    function ajaxGet(url) {
      return $.ajax({
        method:   "GET",
        url:      url,
        dataType: "html"
      });
    }

    function parseTasks(lines) {
      var i = 0;
      return  _(lines).reduce(toOnlyNonEmptyTasks, []);

      function toOnlyNonEmptyTasks(tasks, line) {
        i++;
        if (line.length) {
          var properties = taskPropertiesFrom(line);
          properties.number = i;
          tasks.push(new bulldog.Task(properties));
        }
        return tasks;
      }
    }

    function taskPropertiesFrom(taskText) {
      var none = '__none';

      var priorityRE = /\(([A-Z])\)/,
        projectRE = /\+([\w\S]+)/,
        contextRE = /@([\w\S]+)/,
        dateRE = /(\d\d\d\d-\d\d-\d\d)/;
      var properties;

      properties = {
        action:      actionFrom(taskText),
        context:     extract(contextRE),
        projectName: extract(projectRE)
      };

      var priority = extract(priorityRE);
      if (priority != none) {
        properties.priority = priority;
      }

      var date = extract(dateRE);
      if (date != none) {
        properties.date = new Date(date);
      }

      return properties;

      function extract(re) {
        var match = taskText.match(re);
        return match ? match[1] : none;
      }

      function actionFrom(text) {
        var regexs = [
          priorityRE,
          projectRE,
          contextRE,
          dateRE,
          /^x /
        ];

        var action = _(regexs).reduce(function(str, re) {
          return str.replace(re, '');
        }, text);

        return _.clean(action);
      }
    }
  };

}(jQuery));
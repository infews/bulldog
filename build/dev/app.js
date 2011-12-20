(function ($) {
  window.bulldog = {};
  bulldog.version = "0.1.0";

  $(startApp);

  function startApp() {
    var app;

    localStorage.clear();

    todoTxt.buildTasks(function(tasks){
      app = new bulldog.App(tasks);
      Backbone.history.start();
      app.navigate('/all');
    });
  }
}(jQuery));
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
(function ($) {
  bulldog.Task = Backbone.Model.extend({
  });
}(jQuery));
(function ($) {
  bulldog.TaskList = Backbone.Collection.extend({
    localStorage: new Store("TaskList")
  });
}(jQuery));
(function($) {
  bulldog.TaskAgent = function(view, task) {
    var self = this;

    self.getTaskLocals = function() {
      return {
        action: task.get('action'),
        number: task.get('number'),
        context: task.get('context'),
        project: task.get('project')
      };
    };

    return self;
  }
}(jQuery));
(function($, namespace) {

  namespace.TaskListView = function(options) {
    var tagOptions = {tagName: 'div', className: 'task-list'};
    var self = new (Backbone.View.extend(tagOptions))(options);

    self.render = function() {
      var $el = $(self.el);
      $el.empty();

      options.collection.each(function(task) {
        var taskView = new bulldog.TaskView(task);
        $el.append(taskView.render().el);
      });

      return self;
    };

    initialize();

    return self;

    function initialize() {
      options.collection.bind('reset', self.render);
    }
  };

}(jQuery, bulldog));
(function($, namespace) {

  namespace.TaskView = function(task) {
    var tagOptions = {tagName: 'div', className: 'task'};
    var self = new (Backbone.View.extend(tagOptions))(task);

    var agent = new bulldog.TaskAgent(self, task);

    self.render = function() {

      var $el = $(self.el);
      $el.remove();
      var locals = agent.getTaskLocals();
      $el.append(JST["task"](locals));

      return self;
    };

    initialize();

    return self;

    function initialize() {
    }
  };

}(jQuery, bulldog));

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
}(jQuery));(function(){
window.JST = window.JST || {};

window.JST['task'] = Mustache.template('<div class="data">\n  <div>\n    <span class="number">{{number}}</span>\n  </div>\n  {{#context}}\n  <div class="context">{{context}}</div>\n  {{/context}}\n</div>\n<div class="spacer">\n</div>\n<div class="right">\n  <div class="action">{{action}}</div>\n  {{#project}}\n  <div class="project">\n    <span>{{project}}</span>\n  </div>\n  {{/project}}\n</div>\n');
})();
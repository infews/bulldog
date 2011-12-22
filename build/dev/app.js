(function ($) {
  window.bulldog = {};
  bulldog.version = "0.1.0";
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

  todoTxt.build = function(onSuccess)  {
    todoTxt.load(parseData);

    function parseData(actions) {
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
  bulldog.Project = Backbone.Model.extend({
  });
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
        action: decorateLinks(task.get('action')),
        number: task.get('number'),
        context: task.get('context'),
        project: task.get('project')
      };
    };

    return self;

    function decorateLinks(text) {
      var urlRe = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:(?:[^\s()<>.]+[.]?)+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?Â«Â»â��â��â��â��]))/gi;

      var matchData = text.match(urlRe);
      if (!matchData) {
        return text;
      }

      var tag = _.template('<a target="_blank" href="<%=url%>">[link<%=count%>]</a>');

      for(var i=0; i < matchData.length; i++) {
        var count = matchData.length == 1 ? '' : ' ' + (i + 1);
        text = text.replace(matchData[i], tag({url: matchData[i], count: count}));
      }

      return text;
    }
  }
}(jQuery));
(function($, namespace) {

  namespace.ProjectListView = function(options) {
    var tagOptions = {tagName: 'div', className: 'project-list'};
    var self = new (Backbone.View.extend(tagOptions))(options);

    self.render = function() {
      var $el = $(self.el);
      $el.empty();

      var locals = {
        projects: self.collection.map(function(project) {
          return project.get('name');
        })
      };

      $el.append(JST["projects"](locals));

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
      '/all':          'allTasks',
      '/projects/all': 'projectList'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
    },

    allTasks: function() {
      this.allTasksView = new bulldog.TaskListView({collection: this.taskList});
      var $appNode = $('.app');
      $appNode.empty();
      $appNode.append(this.allTasksView.render().el);
    },

    projectList: function() {
      var projects = new Backbone.Collection(projectsFrom(this.taskList));
      this.allProjectsView = new bulldog.ProjectListView({collection: projects});
      var $appNode = $('.app');
      $appNode.empty();
      $appNode.append(this.allProjectsView.render().el);

      function projectsFrom(tasks) {
        var names = tasks.reduce(addUniqueName, []);

        return _(names).map(function(n) {
          if (n == '') {
            n = '(none)';
          }

          return new Backbone.Model({name: n});
        });

        function addUniqueName(names, task) {
          name = task.get('project');

          if (!_(names).include(name)) {
            names.push(name);
          }

          return names;
        }
      }
    }
  });
}(jQuery));(function(){
window.JST = window.JST || {};

window.JST['projects'] = Mustache.template('<h1>All Projects</h1>\n<ul>\n{{#projects}}\n  <li class="project">{{.}}</li>\n{{/projects}}\n</ul>');
window.JST['task'] = Mustache.template('<div class="data">\n  <div>\n    <span class="number">{{number}}</span>\n  </div>\n  {{#context}}\n  <div class="context">{{context}}</div>\n  {{/context}}\n</div>\n<div class="spacer">\n</div>\n<div class="right">\n  <div class="action">{{{action}}}</div>\n  {{#project}}\n  <div class="project">\n    <span>{{project}}</span>\n  </div>\n  {{/project}}\n</div>\n');
})();
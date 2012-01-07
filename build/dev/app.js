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
        number: number,
        projectName: project
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
  bulldog.ProjectListAgent = function(view, projects) {
    var self = this;

    var currentSelection = 'All';

    self.setCurrentSelection = function(value) {
      if (projects.find(function(p){ return value === p.get('name'); })) {
        currentSelection = value;
      } else {
        currentSelection = 'All';
      }
    };

    self.getCurrentSelection = function() {
      return currentSelection;
    };

    self.getProjectLocals = function() {
      return {
        projects: projects.map(buildLocals)
      };
    };

    self.findProjectByPrettyName = function(prettyName) {
      return projects.find(function(project) {
        return prettyProjectName(project.get('name')) === prettyName;
      });
    };

    return self;

    function buildLocals(project) {
      var name = project.get('name');

      var classes = ['project'];
      if (name === currentSelection) {
        classes.push('selected');
      }

      return {
        name: prettyProjectName(name),
        className: classes.join(' '),
        url: "project/" + project.get('name')
      };
    }

    function prettyProjectName(str) {
      if (str == '') {
        return '(none)';
      }

      return _(_(str).humanize()).titleize();
    }

  }
}(jQuery));
(function($) {
  bulldog.TaskAgent = function(view, task) {
    var self = this;

    self.getTaskLocals = function() {
      return {
        action: decorateLinks(task.get('action')),
        number: task.get('number'),
        context: task.get('context'),
        projectName: task.get('projectName')
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
    var baseOptions = {
      tagName: 'div',
      className: 'project-list'
    };
    var self = new (Backbone.View.extend(baseOptions))(options);
    var agent = new bulldog.ProjectListAgent(self, options.collection);

    self.render = function() {
      var $el = $(self.el);

      $el.unbind('click', self.selectProject);
      $el.empty();

      $el.append(JST["projects"](agent.getProjectLocals()));
      $el.bind('click', self.selectProject);

      return self;
    };

    self.selectProject = function(e) {
      $('.project.selected').removeClass('selected');
      var $project = $(e.target);
      $project.addClass('selected');

      self.trigger('project', agent.findProjectByPrettyName($project.text()));
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
  bulldog.Router = Backbone.Router.extend({

    routes: {
      '/':              'view',
      '/project/:name': 'project'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
      this.projectList = new Backbone.Collection(projectsFrom(this.taskList));

      function projectsFrom(tasks) {
        var names = tasks.reduce(toUniqueProjectNames, ['All']);

        moveNoneToEnd(names);

        return _(names).map(function(n) {
          return new Backbone.Model({name: n});
        });

        function toUniqueProjectNames(names, task) {
          name = task.get('projectName');

          if (!_(names).include(name)) {
            names.push(name);
          }

          return names;
        }

        function moveNoneToEnd(list) {
          var index = _(list).indexOf('');

          if (index >= 0) {
            list.splice(list.length - 1, 0, list.splice(index, 1)[0]);
          }
        }
      }
    },

    tasksFor: function(options) {
      var taskList = this.taskList;

      if (options.projectName != 'All') {
        var tasks = this.taskList.filter(function(task) {
          return task.get('projectName') == options.projectName;
        });
        taskList = new bulldog.TaskList(tasks);
      }

      this.tasksView = new bulldog.TaskListView({collection: taskList});
      this.replace('.tasks', this.tasksView.render().el);
    },

    allProjects: function() {
      this.allProjectsView = new bulldog.ProjectListView({collection: this.projectList});
      var self = this;
      this.replace('.projects', this.allProjectsView.render().el);
      this.allProjectsView.bind('project', function(project) {
        self.navigate('/project/' + project.get('name'), true);
      });
    },

    view: function() {
      this.allProjects();
      this.tasksFor({projectName: 'All'});
    },

    project: function(projectName) {
      this.tasksFor({projectName: projectName});
    },

    replace: function(selector, node) {
      var $appNode = $(selector);
      $appNode.empty();
      $appNode.append(node);
    }

  });
}(jQuery));(function(){
window.JST = window.JST || {};

window.JST['projects'] = Mustache.template('<div class="heading">All Projects</div>\n{{#projects}}\n<div class="{{className}}">{{name}}</div>\n{{/projects}}\n');
window.JST['task'] = Mustache.template('<div class="data">\n  <div>\n    <span class="number">{{number}}</span>\n  </div>\n  {{#context}}\n  <div class="context">{{context}}</div>\n  {{/context}}\n</div>\n<div class="spacer">\n</div>\n<div class="right">\n  <div class="action">{{{action}}}</div>\n  {{#projectName}}\n  <div class="project">\n    <span>{{projectName}}</span>\n  </div>\n  {{/projectName}}\n</div>\n');
})();
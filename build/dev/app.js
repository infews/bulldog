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
  bulldog.NavigationAgent = function(view, options) {
    var self = this;

    var selectedTab = '+';
    var selectedProject = 'All';
    var selectedContext = '(none)';

    self.selectTab = function(value) {
      selectedTab = _(['+', '@']).include(value) ? value: '+';
      view.render();
    };

    self.getSelectedTab = function() {
      return selectedTab;
    };

    self.selectProject = function(value) {
      selectedProject = valueOrDefaultValue(options.projects, value, 'All');
    };

    self.getSelectedProject = function() {
      return selectedProject;
    };
    
    self.selectContext = function(value) {
      selectedContext = valueOrDefaultValue(options.contexts, value, '(none)');
    };

    self.getSelectedContext = function() {
      return selectedContext;
    };

    self.getLocals = function() {
      var tabs = [{text: '+', className: 'projects'}, {text: '@', className: 'contexts'}];
      var list = [];
      if (selectedTab == '+') {
        tabs[0].className += ' active';
        list = options.projects.map(projectsForLocals);
      } else {
        tabs[1].className += ' active';
        list = options.contexts.map(contextsForLocals)
      }

      return {
        tabs: tabs,
        list: list
      };
    };

    self.findProjectByPrettyName = function(prettyName) {
      return options.projects.find(function(project) {
        return prettyProjectName(project.get('name')) === prettyName;
      });
    };

    return self;

    function valueOrDefaultValue(collection, value, defaultValue) {
      return (collection.find(function(c){ return value === c.get('name'); }) ? value : defaultValue);
    }

    function projectsForLocals(project) {
      var name = project.get('name');

      var classes = ['project'];
      if (name === selectedProject) {
        classes.push('active');
      }

      return {
        name: prettyProjectName(name),
        className: classes.join(' '),
        url: "project/" + project.get('name')
      };
    }

    function contextsForLocals(context) {
      var name = context.get('name');

      var classes = ['context'];
      if (name === selectedContext) {
        classes.push('active');
      }

      return {
        name: prettyContextName(name),
        className: classes.join(' '),
        url: "context/" + name
      };
    }

    function prettyProjectName(str) {
      if (str == '') {
        return '(none)';
      }

      return _(_(str).humanize()).titleize();
    }

    function prettyContextName(str) {
      if (str == '') {
        return '(none)';
      }

      return _(str).humanize();
    }

  }
}(jQuery));
(function($) {
  bulldog.NavigationListAgent = function(view, options) {
    var self = this;

    var validLists = ['projects', 'contexts'];
    var currentList = validLists[0];

    self.selectList = function(value) {
      currentList = _(validLists).include(value) ? value : validLists[0];
      selectedItem = options[currentList].first();

      view.render();
    };

    var selectedItem = options[currentList].first();

    self.selectItem = function(name) {
      var currentCollection = options[currentList];

      selectedItem = currentCollection.find(function(model) {
        var modelName = model.get('name');
        return modelName == name || prettyNameFor(modelName) === name;
      });

      selectedItem = selectedItem || currentCollection.first();

      view.render();
    };

    self.getSelection = function() {
      return { list: currentList, name: selectedItem.get('name') };
    };

    self.getLocals = function() {
      return {
        list: options[currentList].map(forLocals)
      };

      function forLocals(model) {
        var name = model.get('name');

        var itemType = currentList.substring(0, currentList.length - 1);
        var classes = [itemType];
        if (name === selectedItem.get('name')) {
          classes.push('active');
        }

        var url = _.template("#/<%=list%>/<%=name%>");
        return {
          name:      prettyNameFor(name),
          className: classes.join(' '),
          url:       url({list: currentList, name: name})
        };
      }
    };

    return self;

    function prettyNameFor(str) {
      if (str == '') {
        return '(none)';
      }

      return _(_(str).humanize()).titleize();
    }
  }
}(jQuery));
(function($) {
  bulldog.NavigationTabsAgent = function(view) {
    var self = this;

    var validValues = ['projects', 'contexts'];
    var selectedTab = validValues[0];

    self.selectTab = function(value) {
      selectedTab = _(validValues).include(value) ? value: validValues[0];
      view.render();
    };

    self.getSelectedTab = function() {
      return selectedTab;
    };

    self.getLocals = function() {
      var tabs = [
        {text: '+', className: 'projects', link: '#/'},
        {text: '@', className: 'contexts', link: '#/contexts'}
      ];

      var selectedIndex = _(validValues).indexOf(selectedTab);
      selectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
      tabs[selectedIndex].className += ' active';

      return {
        tabs: tabs
      };
    };

    return self;

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

  namespace.NavigationListView = function(options) {
    var baseOptions = {
      tagName: 'ul',
      className: 'nav nav-pills nav-stacked list'
    };
    var self = new (Backbone.View.extend(baseOptions))(options);
    var agent = new bulldog.NavigationListAgent(self, options);

    self.render = function() {
      var $el = $(self.el);

//      $el.unbind('click', self.select);
      $el.empty();

      var locals = agent.getLocals();
      var dom = JST["list"](locals);
      $el.append(dom);

//      $el.bind('click', self.selectItem);

      return self;
    };

    self.select = function(selection) {
      agent.selectList(selection.list);
      agent.selectItem(selection.name);
    };

    return self;
  };

}(jQuery, bulldog));
(function($, namespace) {
  namespace.NavigationTabsView = function() {
    var baseOptions = {
      tagName: 'ul',
      className: 'nav nav-tabs tabs'
    };
    var self = new (Backbone.View.extend(baseOptions))();
    var agent = new bulldog.NavigationTabsAgent(self);

    var $el;

    self.render = function() {
      $el = $(self.el);

      $el.empty();

      var locals = agent.getLocals();
      $el.append(JST["tabs"](locals));

      return self;
    };

    self.selectTab = function(newTab) {
      agent.selectTab(newTab);
      self.trigger('tabsUpdated');
    };

    return self;
  }
}(jQuery, bulldog));
(function($, namespace) {

  namespace.NavigationView = function(options) {
    var baseOptions = {
      tagName:   'div',
      className: 'navigation'
    };
    var self = new (Backbone.View.extend(baseOptions))(options);
    var tabsView = new bulldog.NavigationTabsView(options);
    var listView = new bulldog.NavigationListView(options);

    self.render = function() {
      self.renderTabs();
      self.renderList();
      return self;
    };

    self.renderTabs = function() {
      var $el = $(self.el);
      var $tabs = $('.tabs', $el);
      if (!$tabs.length) {
        $el.append(tabsView.render().el);
      }
    };

    self.renderList = function() {
      var $el = $(self.el);
      var $list = $('.list', $el);
      if (!$list.length) {
        $el.append(listView.render().el);
      }
    };

    self.select = function(selection) {
      tabsView.selectTab(selection.list);
      listView.select(selection);
    };

    initialize();

    return self;

    function initialize() {
//      tabsView.bind('tabsUpdated', self.renderTabs);
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
      '/':               'root',
      '/projects/:name': 'project',
      '/contexts/:name': 'context',
      '/contexts': 'firstContext'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
      this.projectList = new Backbone.Collection(projectsFrom(this.taskList));
      this.contextList = new Backbone.Collection(contextsFrom(this.taskList));

      this.navigationView = new bulldog.NavigationView({
        projects: this.projectList,
        contexts: this.contextList
      });

      function projectsFrom(tasks) {
        var names = tasks.reduce(toUniqueProjectNames, ['All']);

        moveEmptyToEnd(names);

        return _(names).map(function(n) {
          return new Backbone.Model({name: n});
        });

        function toUniqueProjectNames(names, task) {
          addIfUnique(names, task.get('projectName'));
          return names;
        }
      }

      function contextsFrom(tasks) {
        var names = tasks.reduce(toUniqueContextNames, []);

        moveEmptyToEnd(names);

        return _(names).map(function(n) {
          return new Backbone.Model({name: n});
        });

        function toUniqueContextNames(names, task) {
          addIfUnique(names, task.get('context'));
          return names;
        }
      }

      function moveEmptyToEnd(list) {
        var index = _(list).indexOf('');

        if (index >= 0) {
          list.splice(list.length - 1, 0, list.splice(index, 1)[0]);
        }
      }

      function addIfUnique(list, value) {
        if (!_(list).include(value)) {
          list.push(value);
        }
      }
    },

    root: function() {
      $('nav').append(this.navigationView.render().el);
      this.project('All');
    },

    project: function(name) {
      var taskList = this.taskList;

      if (name != 'All') {
        var tasks = this.taskList.filter(function(task) {
          return task.get('projectName') == name;
        });
        taskList = new bulldog.TaskList(tasks);
      }

      this.select(taskList, 'projecs', name);
    },

    context: function(name) {
      var tasks = this.taskList.filter(function(task) {
        return task.get('context') == name;
      });
      var taskList = new bulldog.TaskList(tasks);

      this.select(taskList, 'contexts', name);
    },

    firstContext: function() {
      var contextName = this.contextList.first().get('name');
      var tasks = this.taskList.filter(function(task) {
        return task.get('context') == contextName;
      });
      var taskList = new bulldog.TaskList(tasks);

      this.select(taskList, 'contexts', contextName);
    },

    select: function(taskList, listName, itemName) {
      this.navigationView.select({list: listName, name: itemName});
      delete this.tasksView;
      this.tasksView = new bulldog.TaskListView({collection: taskList});
      $('section.tasks').html(this.tasksView.render().el);
    }
  });
}(jQuery));(function(){
window.JST = window.JST || {};

window.JST['list'] = Mustache.template('{{#list}}\n<li class="{{className}}"><a href="{{url}}">{{name}}</a></li>\n{{/list}}\n');
window.JST['tabs'] = Mustache.template('{{#tabs}}\n<li class="{{className}}"><a href="{{link}}">{{text}}</a></li>\n{{/tabs}}\n');
window.JST['task'] = Mustache.template('<div class="data">\n  <div>\n    <a class="btn btn-info btn-disabled">{{number}}</a>\n  </div>\n  {{#context}}\n  <div class="context">@{{context}}</div>\n  {{/context}}\n</div>\n<div class="right">\n  <div class="action">{{{action}}}</div>\n  {{#projectName}}\n  <div class="project">\n    <span>{{projectName}}</span>\n  </div>\n  {{/projectName}}\n</div>\n');
})();
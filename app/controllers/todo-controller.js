(function($) {
  bulldog.controllers.ToDo = function() {
    var self = this;

    var views = {};
    var todos = getDawg().getToDos();
    var taskList = todos.taskList();
    var navSelection = new bulldog.models.ToDoNavSelection();

    self.action = function(action, name) {
      if (action == 'contexts') {
        self.selectContext(name);
      } else if (action == 'next-actions') {
        self.selectContextsWithNextActions(name);
      } else {
        self.selectProject(name);
      }
    };

    self.selectProject = function(name) {
      item = name ? name : todos['projects']().first().get('name');
      navSelection.set('projects', item);
      views.navigationView.select();
      views.taskListView.render(taskList['actionsForProject'](item));
    };

    self.selectContext = function(name) {
      item = name ? name : todos['contexts']().first().get('name');
      navSelection.set('contexts', item);
      views.navigationView.select();
      views.taskListView.render(taskList['actionsForContext'](item));
    };

    self.selectContextsWithNextActions = function(name) {
      item = name ? name : todos['next-actions']().first().get('name');
      navSelection.set('next-actions', item);
      views.navigationView.select();
      views.taskListView.render(taskList['nextActionsForContext'](item));
    };

    initialize();

    return self;

    function initialize() {
      views.navigationView = new bulldog.views.Navigation({
        el: 'nav',
        selection: navSelection
      });
      views.navigationView.render();

      views.taskListView = new bulldog.views.TaskList({
        el: $('section'),
        selection: navSelection
      });
      views.taskListView.render(taskList['actionsForProject']('All'));
    }
  };
}(jQuery));
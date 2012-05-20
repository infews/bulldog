(function($) {
  bulldog.ToDoController = function(taskList) {
    var self = this;

    var agent = new bulldog.ToDoAgent(self, taskList);
    var $tasks, views = {};

    self.action = function(action, name) {
      if (action == 'contexts') {
        agent.selectContext(name);
      } else if (action == 'next-actions') {
        agent.selectContextsWithNextActions(name);
      } else {
        agent.selectProject(name);
      }
    };

    // interface for Agent

    self.updateNavigationView = function() {
      views.navigationView.select();
    };

    self.updateTaskListView = function(collection) {
      delete views.tasksView;
      views.tasksView = new bulldog.TaskListView({collection: collection});
      $tasks.html(views.tasksView.render().el);

      var currentSelection = agent.getCurrentSelection();
      var taskSectionClasses = ['tasks', currentSelection.currentList];
      if (currentSelection.currentItem == 'All') {
        taskSectionClasses.push('all');
      }
      $tasks.attr('class', taskSectionClasses.join(' '));
    };

    initialize();

    return self;

    function initialize() {
      views.navigationView = new bulldog.NavigationView({
        app: agent
      });
      $('nav').append(views.navigationView.render().el);
      $tasks = $('section.tasks');
    }
  };
}(jQuery));
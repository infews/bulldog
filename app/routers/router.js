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
      this.agent = new bulldog.RouterAgent(this, this.taskList);

      this.navigationView = new bulldog.NavigationView({
        projects: this.agent.getProjectList(),
        contexts: this.agent.getContextList()
      });
    },

    root: function() {
      $('nav').append(this.navigationView.render().el);
      this.agent.selectProject('All');
    },

    project: function(name) {
      this.agent.selectProject(name);
    },

    context: function(name) {
      this.agent.selectContext(name);
    },

    firstContext: function() {
      this.agent.selectContext();
    },

    select: function(listName, itemName, taskList) {
      this.navigationView.select({list: listName, name: itemName});
      delete this.tasksView;
      this.tasksView = new bulldog.TaskListView({collection: taskList});
      $('section.tasks').html(this.tasksView.render().el);
    }
  });
}(jQuery));
(function($) {
  bulldog.Router = Backbone.Router.extend({

    routes: {
      '/':                  'firstProject',
      '/projects/:name':    'project',
      '/contexts':          'firstContext',
      '/contexts/:name':    'context',
      '/next-actions':       'firstNextActions',
      '/next-actions/:name': 'nextActions'
    },

    initialize: function(tasks) {
      this.taskList = new bulldog.TaskList(tasks);
      this.agent = new bulldog.RouterAgent(this, this.taskList);

      this.navigationView = new bulldog.NavigationView({
        app: this.agent
      });
      $('nav').append(this.navigationView.render().el);
    },

    firstProject: function() {
      this.agent.selectProject('All');
    },

    project: function(name) {
      this.agent.selectProject(name);
    },

    firstContext: function() {
      this.agent.selectContext();
    },

    context: function(name) {
      this.agent.selectContext(name);
    },

    firstNextActions: function() {
      this.agent.selectContextsWithNextActions();
    },

    nextActions: function(contextName) {
      this.agent.selectContextsWithNextActions(contextName);
    },

    updateNavigationView: function() {
      this.navigationView.select();
    },

    updateTaskListView: function(taskList) {
      delete this.tasksView;
      this.tasksView = new bulldog.TaskListView({collection: taskList});
      $('section.tasks').html(this.tasksView.render().el);
    }
  });
}(jQuery));
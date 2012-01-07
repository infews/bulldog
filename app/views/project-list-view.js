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
(function($, namespace) {

  namespace.ProjectListView = function(options) {
    var tagOptions = {tagName: 'div', className: 'project-list'};
    var self = new (Backbone.View.extend(tagOptions))(options);
    var agent = new bulldog.ProjectListAgent(self, options.collection);

    self.render = function() {
      var $el = $(self.el);
      $el.empty();

      var locals = agent.getProjectLocals();

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
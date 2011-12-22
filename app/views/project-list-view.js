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
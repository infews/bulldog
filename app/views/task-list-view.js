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
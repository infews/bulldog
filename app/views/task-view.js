(function($, namespace) {

  namespace.TaskView = function(task) {
    var tagOptions = {
      tagName: 'div',
      className: 'task'
    };
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

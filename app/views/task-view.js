(function($) {

  bulldog.views.Task = function(task) {
    var tagOptions = {
      tagName: 'div',
      className: 'task roundy'
    };
    var self = new (Backbone.View.extend(tagOptions))(task);

    var agent = new bulldog.agents.Task(self, task);

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

}(jQuery));

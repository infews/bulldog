(function($) {
  bulldog.TaskAgent = function(view, task) {
    var self = this;

    self.getTaskLocals = function() {
      return {
        action: task.get('action'),
        number: task.get('number'),
        context: task.get('context'),
        project: task.get('project')
      };
    };

    return self;
  }
}(jQuery));
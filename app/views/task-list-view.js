(function($) {

  bulldog.views.TaskList = function(options) {
    var self = new (Backbone.View.extend({}))(options);

    var selection = options.selection;

    self.render = function(taskList) {
      var current = selection.get();

      var classes = ['tasks', current.listName];
      if (current.item == 'All') {
        classes.push('all');
      }
      this.$el.attr('class', classes.join(' '));

      this.$el.empty();
      taskList.each(function(task) {
        var taskView = new bulldog.views.Task(task);
        self.$el.append(taskView.render().el);
      });

      return self;
    };

    return self;
  };

}(jQuery));
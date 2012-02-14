(function ($) {
  bulldog.TaskList = Backbone.Collection.extend({
    localStorage: new Store("TaskList"),
    model: bulldog.Task
  });
}(jQuery));
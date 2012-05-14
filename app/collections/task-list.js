(function ($) {
  bulldog.TaskList = Backbone.Collection.extend({
    localStorage: new Store("TaskList"),
    model: bulldog.Task,
    comparator: priority
  });

  function priority(task) {
    if (task.isNextAction()) {
      return "0";
    }
    return task.get('priority') || "ZZ";
  }
}(jQuery));
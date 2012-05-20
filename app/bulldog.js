(function($) {
  window.bulldog = {};
  bulldog.version = "0.3.0";
  $(document).ready(startApp);

  function startApp() {
    localStorage.clear();

    todoTxt.build(function(tasks) {
      var taskList = new bulldog.TaskList(tasks);
      window.app = new bulldog.Router(taskList);
      Backbone.history.start();
    });

    $('.modal-footer .version').text('v' + bulldog.version);
    $('.modal a').attr('target','_blank');
  }
}(jQuery));
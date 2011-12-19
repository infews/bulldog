(function ($) {
  window.bulldog = {};
  bulldog.version = "0.1.0";

  $(startApp);

  function startApp() {
    var app;

    localStorage.clear();

    todoTxt.buildTasks(function(tasks){
      app = new bulldog.App(tasks);
      Backbone.history.start();
      app.navigate('/all');
    });
  }
}(jQuery));
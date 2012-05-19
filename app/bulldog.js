(function($) {
  window.bulldog = {};
  bulldog.version = "0.3.0";
  $(document).ready(startApp);

  function startApp() {
    localStorage.clear();

    todoTxt.build(function(tasks) {
      window.app = new bulldog.Router(tasks);
      Backbone.history.start();
    });

    $('.modal-footer .version').text('v' + bulldog.version);
    $('.modal a').attr('target','_blank');
  }
}(jQuery));
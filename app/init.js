(function($) {
  $(document).ready(startApp);

  function startApp() {
    localStorage.clear();

    var dawg = new bulldog.models.App();
    window.getDawg = function() { return dawg; };

    // TODO: move this to dawg#modalSetup
    $('.modal-footer .version').text('v' + dawg.version);
    $('.modal a').attr('target','_blank');

    dawg.loadTodoTxt(dawg.start);
  }
}(jQuery));
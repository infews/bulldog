(function($) {
  $(document).ready(startApp);

  function startApp() {
    localStorage.clear();

    var dawg = new bulldog.App();
    window.getDawg = function() { return dawg; };

    $('.modal-footer .version').text('v' + dawg.version);
    $('.modal a').attr('target','_blank');

    dawg.start();
  }
}(jQuery));
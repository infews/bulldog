(function($) {
  $(document).ready(startApp);

  function startApp() {
    localStorage.clear();

    window.getDawg = function() { return window.dawg; };
    window.dawg = new bulldog.app();

    dawg.start();

    $('.modal-footer .version').text('v' + bulldog.version);
    $('.modal a').attr('target','_blank');
  }
}());
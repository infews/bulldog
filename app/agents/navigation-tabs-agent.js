(function($) {
  bulldog.NavigationTabsAgent = function(view, options) {
    var self = this;

    self.select = function() {
      view.render();
    };

    self.getLocals = function() {
      var tabs = [
        {text: '+', className: 'projects', link: '#/'},
        {text: '@', className: 'contexts', link: '#/contexts'},
        {text: '\u2794', className: 'next-actions', link: '#/next-actions' }
      ];

      _(tabs).each(function(tab) {
        if (tab.className === options.app.getCurrentSelection().currentList) {
          tab.className += ' active';
        }
      });

      return {
        tabs: tabs
      };
    };

    return self;

  }
}(jQuery));
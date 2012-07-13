(function($) {
  bulldog.agents.NavigationTabs = function(view, options) {
    var self = this;

    self.select = function() {
      view.render();
    };

    self.getLocals = function() {
      var tabs = [
        {text: '+', className: 'projects', link: '#/todo/projects'},
        {text: '@', className: 'contexts', link: '#/todo/contexts'},
        {text: '\u2794', className: 'next-actions', link: '#/todo/next-actions' }
      ];

      var currentList = options.selection.get().listName;

      _(tabs).each(function(tab) {
        if (tab.className === currentList) {
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
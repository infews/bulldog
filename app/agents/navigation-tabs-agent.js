(function($) {
  bulldog.NavigationTabsAgent = function(view) {
    var self = this;

    var validValues = ['projects', 'contexts'];
    var selectedTab = validValues[0];

    self.selectTab = function(value) {
      selectedTab = _(validValues).include(value) ? value: validValues[0];
      view.render();
    };

    self.getSelectedTab = function() {
      return selectedTab;
    };

    self.getLocals = function() {
      var tabs = [
        {text: '+', className: 'projects', link: '#/'},
        {text: '@', className: 'contexts', link: '#/contexts'}
      ];

      var selectedIndex = _(validValues).indexOf(selectedTab);
      selectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
      tabs[selectedIndex].className += ' active';

      return {
        tabs: tabs
      };
    };

    return self;

  }
}(jQuery));
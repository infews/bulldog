(function($, namespace) {

  namespace.NavigationView = function(options) {
    var baseOptions = {
      tagName:   'div',
      className: 'navigation'
    };
    var self = new (Backbone.View.extend(baseOptions))(options);
    var tabsView = new bulldog.NavigationTabsView(options);
    var listView = new bulldog.NavigationListView(options);

    self.render = function() {
      self.renderTabs();
      self.renderList();
      return self;
    };

    self.renderTabs = function() {
      var $el = $(self.el);
      var $tabs = $('.tabs', $el);
      if (!$tabs.length) {
        $el.append(tabsView.render().el);
      }
    };

    self.renderList = function() {
      var $el = $(self.el);
      var $list = $('.list', $el);
      if (!$list.length) {
        $el.append(listView.render().el);
      }
    };

    self.select = function() {
      tabsView.select();
      listView.select();
    };

    return self;
  };

}(jQuery, bulldog));
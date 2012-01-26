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
      if ($tabs.length) {
        $tabs.replaceWith(tabsView.el);
      } else {
        $el.append(tabsView.render().el);
      }
      tabsView.bind('tabSelected', self.selectList);
    };

    self.renderList = function() {
      var $el = $(self.el);
      var $list = $('.list', $el);
      if ($list.length) {
        $list.replaceWith(listView.el);
      } else {
        $el.append(listView.render().el);
      }
    };

    self.selectList = function(listName) {
      listView.selectList(listName);
    };

    self.propagateSelection = function(selection) {
      self.trigger('selection', selection);
    };

    initialize();

    return self;

    function initialize() {
      listView.bind('selection', self.propagateSelection);
    }
  };

}(jQuery, bulldog));
(function($, namespace) {

  namespace.NavigationView = function(options) {
    var baseOptions = {};
    var self = new (Backbone.View.extend(baseOptions))(options);

    var tabsView = new bulldog.NavigationTabsView({selection: options.selection});
    var listView = new bulldog.NavigationListView({selection: options.selection});

    self.render = function() {
      if (!this.$el.hasClass('navigation')) {
        this.$el.attr('class', 'navigation');
      }
      self.renderTabs();
      self.renderList();
      return self;
    };

    self.renderTabs = function() {
      var $tabs = $('.tabs', this.$el);
      if ($tabs.length) {
        return;
      }

      this.$el.append(tabsView.render().el);
    };

    self.renderList = function() {
      this.$el.append(listView.render().el);
    };

    self.select = function() {
      tabsView.select();
      listView.select();
    };

    return self;
  };

}(jQuery, bulldog));
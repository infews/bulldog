(function($, namespace) {
  namespace.NavigationTabsView = function(options) {
    var baseOptions = {
      tagName: 'ul',
      className: 'nav nav-tabs tabs'
    };
    var self = new (Backbone.View.extend(baseOptions))();
    var agent = new bulldog.NavigationTabsAgent(self, options);

    var $el;

    self.render = function() {
      $el = $(self.el);

      $el.empty();

      var locals = agent.getLocals();
      $el.append(JST["tabs"](locals));

      return self;
    };

    self.select = function(newTab) {
      agent.select(newTab);
    };

    return self;
  }
}(jQuery, bulldog));
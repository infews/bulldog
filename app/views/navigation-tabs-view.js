(function($) {
  bulldog.views.NavigationTabs = function(options) {
    var baseOptions = {
      tagName: 'ul',
      className: 'nav nav-tabs tabs'
    };
    var self = new (Backbone.View.extend(baseOptions))();
    var agent = new bulldog.agents.NavigationTabs(self, options);

    self.render = function() {
      this.$el.empty();

      var locals = agent.getLocals();
      this.$el.append(JST["tabs"](locals));

      return self;
    };

    self.select = function(newTab) {
      agent.select(newTab);
    };

    return self;
  }
}(jQuery));
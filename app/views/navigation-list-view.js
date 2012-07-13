(function($) {

  bulldog.views.NavigationList = function(options) {
    var baseOptions = {
      className: 'items'
    };
    var self = new (Backbone.View.extend(baseOptions))(options);
    var agent = new bulldog.agents.NavigationList(self, options);

    self.render = function() {
      this.$el.empty();
      this.$el.append(JST["list"](agent.getLocals()));

      return self;
    };

    self.select = function() {
      agent.select();
    };

    return self;
  };

}(jQuery));
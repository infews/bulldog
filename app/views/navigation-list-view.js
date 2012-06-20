(function($, namespace) {

  namespace.NavigationListView = function(options) {
    var baseOptions = {
      className: 'scroll'
    };
    var self = new (Backbone.View.extend(baseOptions))(options);
    var agent = new bulldog.NavigationListAgent(self, options);

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

}(jQuery, bulldog));
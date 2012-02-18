(function($, namespace) {

  namespace.NavigationListView = function(options) {
    var baseOptions = {
      tagName: 'ul',
      className: 'nav nav-pills nav-stacked list'
    };
    var self = new (Backbone.View.extend(baseOptions))(options);
    var agent = new bulldog.NavigationListAgent(self, options);

    self.render = function() {
      var $el = $(self.el);

      $el.empty();

      $el.append(JST["list"](agent.getLocals()));

      return self;
    };

    self.select = function() {
      agent.select();
    };

    return self;
  };

}(jQuery, bulldog));
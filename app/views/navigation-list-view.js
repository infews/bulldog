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

      $el.unbind('click', self.select);
      $el.empty();

      var locals = agent.getLocals();
      var dom = JST["list"](locals);
      $el.append(dom);

      $el.bind('click', self.selectItem);

      return self;
    };

    self.select = function(selection) {
      agent.selectList(selection.list);
      agent.selectItem(selection.name);
    };

    return self;
  };

}(jQuery, bulldog));
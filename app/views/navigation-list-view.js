(function($, namespace) {

  namespace.NavigationListView = function(options) {
    var baseOptions = {
      tagName: 'div',
      className: 'list'
    };
    var self = new (Backbone.View.extend(baseOptions))(options);
    var agent = new bulldog.NavigationListAgent(self, options);

    self.render = function() {
      var $el = $(self.el);

      $el.unbind('click', self.select);
      $el.empty();

      var locals = agent.getLocals();
      $el.append(JST["list"](locals));

      $el.bind('click', self.selectItem);

      return self;
    };

    self.selectItem = function(e) {
      $target = $(e.target);
      agent.selectItem($target.text());
      self.trigger('selection', agent.getSelection());
    };

    self.selectList = function(listName) {
      agent.selectList(listName);
      self.trigger('selection', agent.getSelection());
    };

    return self;
  };

}(jQuery, bulldog));
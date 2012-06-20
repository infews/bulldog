(function($) {
  bulldog.NavigationListAgent = function(view, options) {
    var self = this;

    self.select = function() {
      view.render();
    };

    self.getLocals = function() {
      var selection = options.selection.get();
      var currentItem = selection.item;

      return {
        list: selection.list.map(forLocals)
      };

      function forLocals(model) {
        var name = model.get('name') || '__none';

        var classes = [itemClassNameFrom(selection.listName)];
        if (name === currentItem) {
          classes.push('active');
        }

        var url = _.template("#/todo/<%=list%>/<%=name%>");
        return {
          name:      prettyNameFor(name),
          className: classes.join(' '),
          url:       url({list: selection.listName, name: name})
        };
      }
    };

    return self;

    function itemClassNameFrom(listName) {
      return listName.substring(0, listName.length - 1);
    }

    function prettyNameFor(str) {
      if (str == '__none') {
        return '(none)';
      }

      return _(_(str).humanize()).titleize();
    }
  }
}(jQuery));
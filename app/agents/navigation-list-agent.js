(function($) {
  bulldog.NavigationListAgent = function(view, options) {
    var self = this;

    self.select = function() {
      view.render();
    };

    self.getLocals = function() {
      var currentSelection = options.app.getCurrentSelection();
      var currentItem = currentSelection.currentItem;

      return {
        list: currentSelection.collection.map(forLocals)
      };

      function forLocals(model) {
        var name = model.get('name');

        var classes = [itemClassNameFrom(currentSelection.currentList)];
        if (name === currentItem) {
          classes.push('active');
        }

        var url = _.template("#/<%=list%>/<%=name%>");
        return {
          name:      prettyNameFor(name),
          className: classes.join(' '),
          url:       url({list: currentSelection.currentList, name: name})
        };
      }
    };

    return self;

    function itemClassNameFrom(listName) {
      return listName.substring(0, listName.length - 1);
    }

    function prettyNameFor(str) {
      if (str == '') {
        return '(none)';
      }

      return _(_(str).humanize()).titleize();
    }
  }
}(jQuery));
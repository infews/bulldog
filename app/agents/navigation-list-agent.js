(function($) {
  bulldog.NavigationListAgent = function(view, options) {
    var self = this;

    var validLists = ['projects', 'contexts'];
    var currentList = validLists[0];

    self.selectList = function(value) {
      currentList = _(validLists).include(value) ? value : validLists[0];
      selectedItem = options[currentList].first();

      view.render();
    };

    var selectedItem = options[currentList].first();

    self.selectItem = function(name) {
      var currentCollection = options[currentList];

      selectedItem = currentCollection.find(function(model) {
        var modelName = model.get('name');
        return modelName == name || prettyNameFor(modelName) === name;
      });

      selectedItem = selectedItem || currentCollection.first();

      view.render();
    };

    self.getSelection = function() {
      return { list: currentList, name: selectedItem.get('name') };
    };

    self.getLocals = function() {
      return {
        list: options[currentList].map(forLocals)
      };

      function forLocals(model) {
        var name = model.get('name');

        var itemType = currentList.substring(0, currentList.length - 1);
        var classes = [itemType];
        if (name === selectedItem.get('name')) {
          classes.push('selected');
        }

        var url = _.template("#/<%=list%>/<%=name%>");
        return {
          name:      prettyNameFor(name),
          className: classes.join(' '),
          url:       url({list: currentList, name: name})
        };
      }
    };

    return self;

    function prettyNameFor(str) {
      if (str == '') {
        return '(none)';
      }

      return _(_(str).humanize()).titleize();
    }
  }
}(jQuery));
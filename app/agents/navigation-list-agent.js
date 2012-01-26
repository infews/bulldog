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

    self.selectItem = function(prettyName) {
      var currentCollection = options[currentList];

      selectedItem = currentCollection.find(function(model) {
         return prettyNameFor(model.get('name')) === prettyName;
      });

      view.render();
    };

    self.getSelection = function() {
      return { list: currentList, name: selectedItem.get('name') };
    };

    self.getLocals = function() {
      return {
        list:  options[currentList].map(forLocals)
      };

      function forLocals(model) {
        var name = model.get('name');

        var itemType = currentList.substring(0, currentList.length-1);
        var classes = [itemType];
        if (name === selectedItem.get('name')) {
          classes.push('selected');
        }

        return {
          name: prettyNameFor(name),
          className: classes.join(' '),
          url:       "project/" + name
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
(function($, bulldog) {
  bulldog.ToDoNavSelection = function() {
    var self = this;

    var todos = getDawg().getToDos();

    var validLists = ['projects', 'contexts', 'next-actions'];
    var currentListName = validLists[0];
    var currentItem = todos[currentListName]().first().get('name');

    self.get = function() {
      todos = getDawg().getToDos();
      return {
        listName: currentListName,
        list:     todos[currentListName](),
        item:     currentItem
      }
    };

    self.set = function(listName, itemName) {
      if (!_(validLists).include(listName)) {
        return;
      }

      currentListName = listName;

      todos = getDawg().getToDos();
      var currentList = todos[currentListName]();
      var validItems = currentList.pluck('name');
      currentItem = _(validItems).include(itemName) ? itemName : currentList.first().get('name');
    };

    return self;
  }
}(jQuery, bulldog));
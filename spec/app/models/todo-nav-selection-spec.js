describe("bulldog.models.ToDoNavSelection", function() {
  var selection, currentSelection;

  beforeEach(function() {
    var dawg = new bulldog.models.App();
    window.getDawg = function() { return dawg; };

    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);

    selection = new bulldog.models.ToDoNavSelection();
  });

  describe("#get", function() {
    beforeEach(function() {
      currentSelection = selection.get();
    });

    it("should have 'projects' selected", function() {
      expect(currentSelection.listName).toEqual('projects');
    });

    it("should have the 'All' project selected", function() {
      expect(currentSelection.item).toEqual('All');
    });

    it("should provide the collection of Projects", function() {
      expect(currentSelection.list.length).toEqual(5);
      var projects = currentSelection.list.map(function(item) { return item.get('name');});
      expect(projects).toEqual(['All', 'CleanDesk', 'Release1.2', 'Vacation', '__none']);
    });
  });

  describe("when the selection changes to an invalid list", function() {
    beforeEach(function() {
      selection.set('foos');
      currentSelection = selection.get();
    });

    it("should not change the selected list", function() {
      expect(currentSelection.listName).toEqual('projects');
    });

    it("should not change the selected item", function() {
      expect(currentSelection.item).toEqual('All');
    });

    it("should not change the selected collection", function() {
      expect(currentSelection.list.length).toEqual(5);
      var projects = currentSelection.list.map(function(item) { return item.get('name');});
      expect(projects).toEqual(['All', 'CleanDesk', 'Release1.2', 'Vacation', '__none']);
    });
  });

  describe("when the selection changes to a valid list", function() {
    beforeEach(function() {
      selection.set('contexts');
      currentSelection = selection.get();
    });

    it("should have the new list selected", function() {
      expect(currentSelection.listName).toEqual('contexts');
    });

    it("should have the first item of the selected list selected", function() {
      expect(currentSelection.item).toEqual('House-2');
    });

    it("should provide the collection of the requested list", function() {
      expect(currentSelection.list.length).toEqual(5);
      var projects = currentSelection.list.map(function(item) { return item.get('name');});
      expect(projects).toEqual(['House-2', 'home', 'pc', 'work', '__none']);
    });

    describe("but an invalid item", function() {
      beforeEach(function() {
        selection.set('contexts', 'ugly');
        currentSelection = selection.get();
      });

      it("should have the new list selected", function() {
        expect(currentSelection.listName).toEqual('contexts');
      });

      it("should have the first item of the selected list selected", function() {
        expect(currentSelection.item).toEqual('House-2');
      });

      it("should provide the collection of the requested list", function() {
        expect(currentSelection.list.length).toEqual(5);
        var projects = currentSelection.list.map(function(item) { return item.get('name');});
        expect(projects).toEqual(['House-2', 'home', 'pc', 'work', '__none']);
      });
    });

    describe("with a invalid item", function() {
      beforeEach(function() {
        selection.set('contexts', 'pc');
        currentSelection = selection.get();
      });

      it("should have the new list selected", function() {
        expect(currentSelection.listName).toEqual('contexts');
      });

      it("should have the first item of the selected list selected", function() {
        expect(currentSelection.item).toEqual('pc');
      });

      it("should provide the collection of the requested list", function() {
        expect(currentSelection.list.length).toEqual(5);
        var projects = currentSelection.list.map(function(item) { return item.get('name');});
        expect(projects).toEqual(['House-2', 'home', 'pc', 'work', '__none']);
      });
    });
  });
});
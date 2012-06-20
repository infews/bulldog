describe("bulldog.NavigationListAgent", function() {
  var agent, view, locals;

  beforeEach(function() {
    var dawg = new bulldog.App();
    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);

    window.getDawg = function() { return dawg; };

    view = { render: jasmine.createSpy('view.render') };
    selection = new bulldog.ToDoNavSelection();

    agent = new bulldog.NavigationListAgent(view, {selection: selection});
  });

  describe("#select", function() {
    beforeEach(function() {
      agent.select();
    });

    it("should tell the view to render", function() {
      expect(view.render).toHaveBeenCalled();
    });
  });

  describe("on initialize", function() {
    describe("#getLocals", function() {
      beforeEach(function() {
        locals = agent.getLocals();
      });

      it("should have the correct number of list items", function() {
        expect(locals.list.length).toEqual(5);
      });

      it("should have the items of default list", function() {
        var eachIsAProject = _(locals.list).all(function(item) {
          return item.className.match(/project/);
        });
        expect(eachIsAProject).toEqual(true);
      });

      it("should build the correct URLs", function() {
        expect(locals.list[0].url).toEqual('#/todo/projects/All');
      });

      it("should have the default list item selected", function() {
        expect(locals.list[0].className.match(/active/)).toBeTruthy();
      });
    });
  });
});
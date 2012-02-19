describe("bulldog.NavigationListAgent", function() {
  var agent, view, locals, routerAgent;

  beforeEach(function() {
    router = jasmine.createSpyObj('FakeRouter', ['updateNavigationView', 'updateTaskListView']);
    var tasks = buildTaskFixtures();
    var taskList = new bulldog.TaskList(tasks);
    routerAgent = new bulldog.RouterAgent(router, taskList);

    view = { render: jasmine.createSpy('view.render') };
    agent = new bulldog.NavigationListAgent(
      view,
      {
        app: routerAgent
      }
    );
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
        expect(locals.list.length).toEqual(4);
      });

      it("should have the items of default list", function() {
        var eachIsAProject = _(locals.list).all(function(item) {
          return item.className.match(/project/);
        });
        expect(eachIsAProject).toEqual(true);
      });

      it("should build the correct URLs", function() {
        expect(locals.list[0].url).toEqual('#/projects/All');
      });

      it("should have the default list item selected", function() {
        expect(locals.list[0].className.match(/active/)).toBeTruthy();
      });
    });
  });

  describe("when the selection changes", function() {
    describe("#getLocals", function() {
      beforeEach(function() {
        routerAgent.selectContext('pc');
        locals = agent.getLocals();
      });

      it("should have the correct number of list items", function() {
        expect(locals.list.length).toEqual(3);
      });

      it("should have the items of default list", function() {
        var eachIsAProject = _(locals.list).all(function(item) {
          return item.className.match(/context/);
        });
        expect(eachIsAProject).toEqual(true);
      });

      it("should build the correct URLs", function() {
        expect(locals.list[1].url).toEqual('#/contexts/pc');
      });

      it("should have the correct list item selected", function() {
        expect(locals.list[1].className.match(/active/)).toBeTruthy();
      });
    });
  });
});
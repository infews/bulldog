describe("bulldog.NavigationTabsAgent", function() {
  var agent, view, locals, routerAgent;

  beforeEach(function() {
    var router = jasmine.createSpyObj('FakeRouter', ['updateNavigationView', 'updateTaskListView']);
    var tasks = [
      new bulldog.Task({action: "foo", projectName: 'Zip', context: 'pc', priority: 'C'}),
      new bulldog.Task({action: "bar", projectName: '', context: ''}),
      new bulldog.Task({action: "baz", projectName: 'Buzz', context: 'pc', priority: 'N'}),
      new bulldog.Task({action: "quux", projectName: 'Zip', context: 'home', priority: 'N'}),
      new bulldog.Task({action: "corge", projectName: 'Zip', context: '', priority: 'N'})
    ];
    var taskList = new bulldog.TaskList(tasks);
    routerAgent = new bulldog.RouterAgent(router, taskList);

    view = {
      render: jasmine.createSpy('view.render')
    };
    agent = new bulldog.NavigationTabsAgent(view, {app: routerAgent});
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

      it("should return the expected number of tabs", function() {
        expect(locals.tabs.length).toEqual(3);
      });

      it("should have the tabs in the correct order", function() {
        var labels = _(locals.tabs).pluck('text');
        expect(labels).toEqual(['+', '@', '\u2794']);
      });

      it("should configure the projects tab correctly", function() {
        var projects = locals.tabs[0];
        expect(projects.text).toEqual('+');
        expect(projects.className).toMatch(/projects/);
        expect(projects.className).toMatch(/active/);
        expect(projects.link).toEqual('#/');
      });

      it("should configure the contexts tab correctly", function() {
        var contexts = locals.tabs[1];
        expect(contexts.text).toEqual('@');
        expect(contexts.className).toMatch(/contexts/);
        expect(contexts.link).toEqual('#/contexts');
      });

      it("should configure the nextActions tab correctly", function() {
        var nextActions = locals.tabs[2];
        expect(nextActions.text).toEqual('\u2794');
        expect(nextActions.className).toMatch(/next-actions/);
        expect(nextActions.link).toEqual('#/next-actions');
      });
    });
  });

  describe("when the selection changes", function() {
    describe("#getLocals", function() {
      beforeEach(function() {
        routerAgent.selectContext('pc');
        locals = agent.getLocals();
      });

      it("should return the expected number of tabs", function() {
        expect(locals.tabs.length).toEqual(3);
      });

      it("should have the tabs in the correct order", function() {
        var labels = _(locals.tabs).pluck('text');
        expect(labels).toEqual(['+', '@', '\u2794']);
      });

      it("should configure the projects tab correctly", function() {
        var projects = locals.tabs[0];
        expect(projects.text).toEqual('+');
        expect(projects.className).toMatch(/projects/);
        expect(projects.link).toEqual('#/');
      });

      it("should configure the contexts tab correctly", function() {
        var contexts = locals.tabs[1];
        expect(contexts.text).toEqual('@');
        expect(contexts.className).toMatch(/contexts/);
        expect(contexts.className).toMatch(/active/);
        expect(contexts.link).toEqual('#/contexts');
      });

      it("should configure the nextActions tab correctly", function() {
        var nextActions = locals.tabs[2];
        expect(nextActions.text).toEqual('\u2794');
        expect(nextActions.className).toMatch(/next-actions/);
        expect(nextActions.link).toEqual('#/next-actions');
      });
    });
  });
});
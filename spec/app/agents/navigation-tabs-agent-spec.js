describe("bulldog.agents.NavigationTabs", function() {
  var agent, view, locals;

  beforeEach(function() {
    var dawg = new bulldog.models.App();
    window.getDawg = function() { return dawg; };

    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);

    view = {
      render: jasmine.createSpy('view.render')
    };
    selection = new bulldog.models.ToDoNavSelection();
    agent = new bulldog.agents.NavigationTabs(view, {selection: selection});
  });

  describe("#select", function() {
    beforeEach(function() {
      agent.select();
    });

    it("should tell the view to render", function() {
      expect(view.render).toHaveBeenCalled();
    });
  });

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
      expect(projects.link).toEqual('#/todo/projects');
    });

    it("should configure the contexts tab correctly", function() {
      var contexts = locals.tabs[1];
      expect(contexts.text).toEqual('@');
      expect(contexts.className).toMatch(/contexts/);
      expect(contexts.link).toEqual('#/todo/contexts');
    });

    it("should configure the nextActions tab correctly", function() {
      var nextActions = locals.tabs[2];
      expect(nextActions.text).toEqual('\u2794');
      expect(nextActions.className).toMatch(/next-actions/);
      expect(nextActions.link).toEqual('#/todo/next-actions');
    });
  });
});

describe("bulldog.models.ToDos", function() {
  var todos;

  beforeEach(function() {
    todos = new bulldog.models.ToDos(buildTaskFixtures());
  });

  describe("#taskList", function() {
    it("should return the full taskList", function() {
      expect(todos.taskList().length).toEqual(5);
    });
  });

  describe("#projects", function() {
    var projects;

    beforeEach(function() {
      projects = todos.projects();
    });

    it("should return a collection of projects", function() {
      expect(projects.length).toEqual(4);
      expect(projects.first().get('name')).toEqual('All');
      expect(projects.at(1).get('name')).toEqual('Buzz');
      expect(projects.last().get('name')).toEqual('__none');
    });
  });

  describe("#contexts", function() {
    var contexts;

    beforeEach(function() {
      contexts = todos.contexts();
    });

    it("should return a collection of contexts", function() {
      expect(contexts.length).toEqual(3);
      expect(contexts.first().get('name')).toEqual('home');
    });
  });

  describe("#nextActions", function() {
    var nextActions;

    beforeEach(function() {
      nextActions = todos['next-actions']();
    });

    it("should return a collection of next actions", function() {
      expect(nextActions.length).toEqual(3);
      expect(nextActions.first().get('name')).toEqual('home');
    });
  });
});
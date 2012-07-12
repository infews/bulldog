describe("bulldog.App", function() {
  var dawg;

  beforeEach(function() {
    dawg = new bulldog.App();
  });

  describe("#loadTodoTxt", function() {
    describe("without a callback", function() {
      beforeEach(function() {
        dawg.loadTodoTxt();
        ajaxRequests[0].response(testResponses.localTodos);
        ajaxRequests[1].response(testResponses.localDone);
      });

      it("should load the todos", function() {
        var todos = dawg.getToDos();
        expect(todos.taskList).toBeDefined();
        expect(todos.projects).toBeDefined();
        expect(todos.contexts).toBeDefined();
        expect(todos['next-actions']).toBeDefined();
      });
    });

    describe("with a callback", function() {
      var callback;
      beforeEach(function() {
        callback = jasmine.createSpy();
        dawg.loadTodoTxt(callback);
        ajaxRequests[0].response(testResponses.localTodos);
        ajaxRequests[1].response(testResponses.localDone);
      });

      it("should load the todos", function() {
        var todos = dawg.getToDos();
        expect(todos.taskList).toBeDefined();
        expect(todos.projects).toBeDefined();
        expect(todos.contexts).toBeDefined();
        expect(todos['next-actions']).toBeDefined();
      });

      it("should call the specified callback when done", function() {
        expect(callback).toHaveBeenCalled();
      });
    });
  });
});
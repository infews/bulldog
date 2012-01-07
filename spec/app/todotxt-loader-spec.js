describe("todoTxt", function () {
  var tasksLines, request;

  describe(".load", function () {
    beforeEach(function () {
      todoTxt.load(function (tasksResponse) {
        tasksLines = tasksResponse;
      });
      request = mostRecentAjaxRequest();
    });

    it("should request the local todo.txt file", function () {
      expect(request.url).toMatch('todo.txt');
    });

    describe("onSuccess", function () {
      beforeEach(function () {
        request.response(testResponses.localTodos);
      });

      it("should send the file split into task lines, ignoring blank lines", function () {
        expect(tasksLines.length).toEqual(7);
      });
    });
  });

  describe(".build", function () {
    var tasks, projects;

    beforeEach(function () {
      todoTxt.build(function (data) {
        tasks = data;
      });
      request = mostRecentAjaxRequest();
      request.response(testResponses.localTodos);
    });

    it("should build the tasks", function () {
      expect(tasks.length).toEqual(7);
      expect(tasks[0].get('action')).toEqual('Call Mom for her birthday');
    });

    it("should set the project correctly on a Task", function () {
      expect(tasks[2].get('projectName')).toEqual('Vacation');
      expect(tasks[4].get('projectName')).toEqual('CleanDesk');
    });

    it("should set the context correctly on a Task", function () {
      expect(tasks[2].get('context')).toEqual('pc');
      expect(tasks[4].get('context')).toEqual('home');
      expect(tasks[5].get('context')).toEqual('work');
    });

    it("should strip the project from the action", function () {
      expect(tasks[2].get('action')).not.toMatch(/\+Vacation/);
    });

    it("should strip the context from the action", function () {
      expect(tasks[2].get('action')).not.toMatch(/@pc/);
    });

    it("should clean up extra whitespace from task actions", function () {
      expect(tasks[2].get('action')).toEqual('Google Maui restaurant reviews');
    });

    it("should set the task number", function () {
      expect(tasks[2].get('number')).toEqual(3);
    });

  });
});

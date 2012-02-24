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

      it("should send the file split into task lines", function () {
        expect(tasksLines.length).toEqual(9);
      });
    });
  });

  describe(".build", function () {
    var tasks;

    beforeEach(function () {
      todoTxt.build(function (data) {
        tasks = data;
      });
      request = mostRecentAjaxRequest();
      request.response(testResponses.localTodos);
    });

    it("should build the tasks", function () {
      expect(tasks.length).toEqual(8);
      expect(tasks[0].get('action')).toEqual('Call Mom for her birthday');
    });

    it("should set the projectName on a Task without a project to a special value", function () {
      expect(tasks[0].get('projectName')).toEqual('__none');
    });

    it("should extract the projectName for a Task based on whitespace", function() {
      expect(tasks[2].get('projectName')).toEqual('Vacation');
      expect(tasks[4].get('projectName')).toEqual('CleanDesk');
      expect(tasks[7].get('projectName')).toEqual('Release1.2');
    });

    it("should set the context on a Task without a context to a special value", function () {
      expect(tasks[0].get('context')).toEqual('__none');
    });

    it("should set the context on a Task based on whitespace", function () {
      expect(tasks[2].get('context')).toEqual('pc');
      expect(tasks[4].get('context')).toEqual('home');
      expect(tasks[5].get('context')).toEqual('work');
      expect(tasks[7].get('context')).toEqual('House-2');
    });

    it("should strip the project from the action", function () {
      expect(tasks[2].get('action')).not.toMatch(/\+Vacation/);
    });

    it("should strip the priority from the action", function() {
      expect(tasks[1].get('action')).not.toMatch(/\(A\)/);
    });

    it("should strip the context from the action", function () {
      expect(tasks[2].get('action')).not.toMatch(/@pc/);
    });

    it("should clean up extra whitespace from task actions", function () {
      expect(tasks[2].get('action')).toEqual('Google Maui restaurant reviews');
    });

    it("should set the task priority", function() {
      expect(tasks[0].get('priority')).toBeUndefined();
      expect(tasks[1].get('priority')).toEqual('A');
      expect(tasks[2].get('priority')).toEqual('N');
    });

    it("should determine if a task is a Next Action", function() {
      expect(tasks[1].isNextAction()).toBeFalsy();
      expect(tasks[2].isNextAction()).toBeTruthy();
    });

    it("should set the task number", function () {
      expect(tasks[2].get('number')).toEqual(3);
    });

    it("should skip a task number when there is a blank line", function() {
      expect(tasks[5].get('number')).toEqual(6);
      expect(tasks[6].get('number')).toEqual(8);
    });
  });
});
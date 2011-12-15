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
      expect(request.url).toEqual('todo.txt');
    });

    describe("onSuccess", function () {
      beforeEach(function () {
        request.response(testResponses.localTodos);
      });

      it("should send the file split into task lines", function () {
        expect(tasksLines.length).toEqual(7);
      });
    });
  });

  describe(".buildTasks", function () {
    var tasks;

    beforeEach(function () {
      todoTxt.buildTasks(function (taskModels) {
        tasks = taskModels;
      });
      request = mostRecentAjaxRequest();
      request.response(testResponses.localTodos);
    });

    it("should call the onSuccess with an array of Task models", function () {
      expect(tasks.length).toEqual(7);
      expect(tasks[0].get('description')).toEqual('Call Mom for her birthday');
    });
  });
});

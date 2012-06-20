describe("todoTxt", function() {
  var todoTxt, done;

  // TODO: Need to test error cases - failures due to no files
  describe(".build", function() {
    var tasks;
    beforeEach(function() {
      clearAjaxRequests();
      todoTxt = new bulldog.TodoTxtApi();
      todoTxt.build(function(data) {
        tasks = data.todo;
        done = data.done;
      });
    });

    describe("when there is content", function() {
      beforeEach(function() {
        ajaxRequests[0].response(testResponses.localTodos);
        ajaxRequests[1].response(testResponses.localDone);
      });

      describe("current tasks", function() {

        it("should build the tasks", function() {
          expect(tasks.length).toEqual(8);
          expect(tasks[0].get('action')).toEqual('Call Mom for her birthday');
        });

        it("should set the projectName on a Task without a project to a special value", function() {
          expect(tasks[0].get('projectName')).toEqual('__none');
        });

        it("should extract the projectName for a Task based on whitespace", function() {
          expect(tasks[2].get('projectName')).toEqual('Vacation');
          expect(tasks[4].get('projectName')).toEqual('CleanDesk');
          expect(tasks[7].get('projectName')).toEqual('Release1.2');
        });

        it("should set the context on a Task without a context to a special value", function() {
          expect(tasks[0].get('context')).toEqual('__none');
        });

        it("should set the context on a Task based on whitespace", function() {
          expect(tasks[2].get('context')).toEqual('pc');
          expect(tasks[4].get('context')).toEqual('home');
          expect(tasks[5].get('context')).toEqual('work');
          expect(tasks[7].get('context')).toEqual('House-2');
        });

        it("should strip the project from the action", function() {
          expect(tasks[2].get('action')).not.toMatch(/\+Vacation/);
        });

        it("should strip the priority from the action", function() {
          expect(tasks[1].get('action')).not.toMatch(/\(A\)/);
        });

        it("should strip the context from the action", function() {
          expect(tasks[2].get('action')).not.toMatch(/@pc/);
        });

        it("should clean up extra whitespace from task actions", function() {
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

        it("should set the task number", function() {
          expect(tasks[2].get('number')).toEqual(3);
        });

        it("should skip a task number when there is a blank line", function() {
          expect(tasks[5].get('number')).toEqual(6);
          expect(tasks[6].get('number')).toEqual(8);
        });
      });

      describe("done tasks", function() {

        it("should build the tasks", function() {
          expect(done.length).toEqual(8);
          expect(done[0].get('action')).toEqual('Call Mom for her birthday');
        });

        it("should set the projectName on a Task without a project to a special value", function() {
          expect(done[0].get('projectName')).toEqual('__none');
        });

        it("should extract the projectName for a Task based on whitespace", function() {
          expect(done[2].get('projectName')).toEqual('Vacation');
          expect(done[4].get('projectName')).toEqual('CleanDesk');
          expect(done[7].get('projectName')).toEqual('Release1.2');
        });

        it("should set the context on a Task without a context to a special value", function() {
          expect(done[0].get('context')).toEqual('__none');
        });

        it("should set the context on a Task based on whitespace", function() {
          expect(done[2].get('context')).toEqual('pc');
          expect(done[4].get('context')).toEqual('home');
          expect(done[5].get('context')).toEqual('work');
          expect(done[7].get('context')).toEqual('House-2');
        });

        it("should strip the project from the action", function() {
          expect(done[2].get('action')).not.toMatch(/\+Vacation/);
        });

        it("should strip the priority from the action", function() {
          expect(done[1].get('action')).not.toMatch(/\(A\)/);
        });

        it("should strip the context from the action", function() {
          expect(done[2].get('action')).not.toMatch(/@pc/);
        });

        it("should clean up extra whitespace from task actions", function() {
          expect(done[2].get('action')).toEqual('Google Maui restaurant reviews');
        });

        it("should set the tasks' done dates", function() {
          expect(done[0].get('date')).toEqual(new Date('2011-11-30'));
          expect(done[1].get('date')).toEqual(new Date('2012-04-15'));
          expect(done[2].get('date')).toEqual(new Date('2010-12-25'));
        });
      });
    });

    describe("when there is no data", function() {
      beforeEach(function() {
        ajaxRequests[0].response(testResponses.localTodos404);
        ajaxRequests[1].response(testResponses.localDone404);
      });

      describe("current tasks", function() {
        it("should be empty", function() {
          expect(tasks.length).toEqual(0);
        });
      });

      describe("done tasks", function() {
        it("should be empty", function() {
          expect(done.length).toEqual(0);
        });
      });
    });
  });
});
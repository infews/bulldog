describe("bulldog.RouterAgent", function() {
  var agent, router, taskList;

  beforeEach(function() {
    router = jasmine.createSpyObj('FakeRouter',
      [
        'updateNavigationView',
        'updateTaskListView'
      ]
    );
    var tasks = buildTaskFixtures();
    var taskList = new bulldog.TaskList(tasks);

    agent = new bulldog.RouterAgent(router, taskList);
  });

  describe("#selectProject", function() {
    describe("when the project list 'All' is selected", function() {
      beforeEach(function() {
        agent.selectProject();
      });

      it("should tell the router to update the navigation UI", function() {
        expect(router.updateNavigationView).toHaveBeenCalled();
      });

      it("should tell the router to update the Tasks", function() {
        expect(router.updateTaskListView).toHaveBeenCalled();
      });

      it("should give the router all of the tasks", function() {
        taskList = router.updateTaskListView.mostRecentCall.args[0];

        expect(taskList.length).toEqual(5);
      });
    });

    describe("when a project is selected", function() {
      beforeEach(function() {
        agent.selectProject('Zip');
      });

      it("should tell the router to update the navigation UI", function() {
        expect(router.updateNavigationView).toHaveBeenCalled();
      });

      it("should tellt he router to update the Tasks", function() {
        expect(router.updateTaskListView).toHaveBeenCalled();
      });

      it("should give the router all of the tasks, in priority order, with next actions at the top", function() {
        taskList = router.updateTaskListView.mostRecentCall.args[0];

        expect(taskList.length).toEqual(3);
        expect(taskList.first().get('action')).toEqual('quux');
        expect(taskList.last().get('action')).toEqual('foo');
      });
    });
  });

  describe("#selectContext", function() {
    describe("when no context list is selected", function() {
      beforeEach(function() {
        agent.selectContext();
      });

      it("should tell the router to update the navigation UI", function() {
        expect(router.updateNavigationView).toHaveBeenCalled();
      });

      it("should tellt he router to update the Tasks", function() {
        expect(router.updateTaskListView).toHaveBeenCalled();
      });

      it("should give the router all of the tasks, in task order", function() {
        taskList = router.updateTaskListView.mostRecentCall.args[0];

        expect(taskList.length).toEqual(1);
        expect(taskList.first().get('action')).toEqual('quux');
      });
    });

    describe("when a context is selected", function() {
      beforeEach(function() {
        agent.selectContext('pc');
      });

      it("should tell the router to update the navigation UI", function() {
        expect(router.updateNavigationView).toHaveBeenCalled();
      });

      it("should tellt he router to update the Tasks", function() {
        expect(router.updateTaskListView).toHaveBeenCalled();
      });

      it("should give the router all of the tasks, in priority order, with next actions first", function() {
        taskList = router.updateTaskListView.mostRecentCall.args[0];

        expect(taskList.length).toEqual(2);
        expect(taskList.first().get('action')).toEqual('baz');
        expect(taskList.last().get('action')).toEqual('foo');
      });
    });
  });

  describe("#selectNextActions", function() {
    describe("when no context list is selected", function() {
      beforeEach(function() {
        agent.selectContextsWithNextActions();
      });

      it("should tell the router to update the navigation UI", function() {
        expect(router.updateNavigationView).toHaveBeenCalled();
      });

      it("should tellt he router to update the Tasks", function() {
        expect(router.updateTaskListView).toHaveBeenCalled();
      });

      it("should give the router all of the tasks, in task order", function() {
        taskList = router.updateTaskListView.mostRecentCall.args[0];

        expect(taskList.length).toEqual(1);
        expect(taskList.first().get('action')).toEqual('quux');
      });
    });

    describe("when a context is selected", function() {
      beforeEach(function() {
        agent.selectContextsWithNextActions('pc');
      });

      it("should tell the router to update the navigation UI", function() {
        expect(router.updateNavigationView).toHaveBeenCalled();
      });

      it("should tellt he router to update the Tasks", function() {
        expect(router.updateTaskListView).toHaveBeenCalled();
      });

      it("should give the router all of the tasks, in priority order, with next actions first", function() {
        taskList = router.updateTaskListView.mostRecentCall.args[0];

        expect(taskList.length).toEqual(1);
        expect(taskList.first().get('action')).toEqual('baz');
      });
    });
  });

  describe("#getCurrentSelection", function() {
    var list;

    describe("by default", function() {
      beforeEach(function() {
        list = agent.getCurrentSelection();
      });

      it("should return the project list", function() {
        expect(list.collection.length).toEqual(4);
        expect(list.currentList).toEqual('projects');
      });

      it("should return the 'All' item", function() {
        expect(list.currentItem).toEqual('All');
      });
    });

    describe("when a project is selected", function() {
      beforeEach(function() {
        agent.selectProject('Zip');
        list = agent.getCurrentSelection();
      });

      it("should return the project list", function() {
        expect(list.collection.length).toEqual(4);
        expect(list.currentList).toEqual('projects');
      });

      it("should return the correct item selected", function() {
        expect(list.currentItem).toEqual('Zip');
      });
    });

    describe("when a context is selected", function() {
      beforeEach(function() {
        agent.selectContext('home');
        list = agent.getCurrentSelection();
      });

      it("should return the context list", function() {
        expect(list.collection.length).toEqual(3);
        expect(list.currentList).toEqual('contexts');
      });

      it("should return the correct item selected", function() {
        expect(list.currentItem).toEqual('home');
      });
    });

    describe("when nextActions (cor a context) is selected", function() {
      beforeEach(function() {
        agent.selectContextsWithNextActions('home');
        list = agent.getCurrentSelection();
      });

      it("should return the context list", function() {
        expect(list.collection.length).toEqual(3);
        expect(list.currentList).toEqual('next-actions');
      });

      it("should return the correct item selected", function() {
        expect(list.currentItem).toEqual('home');
      });
    });
  });
});
describe("bulldog.RouterAgent", function() {
  var agent, router;

  beforeEach(function() {
    router = jasmine.createSpyObj('FakeRouter', ['select']);
    var tasks = [
      new Backbone.Model({action: "foo", projectName: 'Zip', context: 'pc', priority: 'C'}),
      new Backbone.Model({action: "bar", projectName: '', context: ''}),
      new Backbone.Model({action: "baz", projectName: 'Buzz', context: 'pc', priority: 'B'}),
      new Backbone.Model({action: "quux", projectName: 'Zip', context: 'home', priority: 'A'}),
      new Backbone.Model({action: "corge", projectName: 'Zip', context: ''})
    ];
    var taskList = new bulldog.TaskList(tasks);

    agent = new bulldog.RouterAgent(router, taskList);
  });

  describe("#getProjectList", function() {
    var projectList;
    beforeEach(function() {
      projectList = agent.getProjectList();
    });

    it("should make a full project list", function() {
      expect(projectList.length).toEqual(4);
    });

    it("should have the project 'All' first", function() {
      expect(projectList.first().get('name')).toEqual('All');
    });

    it("should have the project '' last", function() {
      expect(projectList.last().get('name')).toEqual('');
    });

    it("should sort the 'real' projects by name", function() {
      expect(projectList.models[1].get('name')).toEqual('Buzz');
      expect(projectList.models[2].get('name')).toEqual('Zip');
    });
  });

  describe("#getContextList", function() {
    var contextList;
    beforeEach(function() {
      contextList = agent.getContextList();
    });

    it("should have a context list", function() {
      expect(contextList.length).toEqual(3);
    });

    it("should have the context '' last", function() {
      expect(contextList.last().get('name')).toEqual('');
    });

    it("should sort the 'real' contexts by name", function() {
      expect(contextList.models[0].get('name')).toEqual('home');
      expect(contextList.models[1].get('name')).toEqual('pc');
    });
  });

  describe("#selectProject", function() {
    var args, taskList;

    describe("when the project list 'All' is selected", function() {
      beforeEach(function() {
        agent.selectProject('All');
        args = router.select.mostRecentCall.args;
        taskList = args[2];
      });

      it("should tell the router to select a new task list", function() {
        expect(router.select).toHaveBeenCalled();
      });

      it("should tell the router to select a project", function() {
        expect(args[0]).toEqual('projects');
      });

      it("should tell the router to select the list 'All'", function() {
        expect(args[1]).toEqual('All');
      });

      it("should give the router all of the tasks, in task order", function() {
        expect(taskList.length).toEqual(5);
        expect(taskList.first().get('action')).toEqual('foo');
        expect(taskList.last().get('action')).toEqual('corge');
      });
    });

    describe("when a project is selected", function() {
      beforeEach(function() {
        agent.selectProject('Zip');
        args = router.select.mostRecentCall.args;
        taskList = args[2];
      });

      it("should tell the router to select a new task list", function() {
        expect(router.select).toHaveBeenCalled();
      });

      it("should tell the router to select a project", function() {
        expect(args[0]).toEqual('projects');
      });

      it("should tell the router to select the list 'All'", function() {
        expect(args[1]).toEqual('Zip');
      });

      it("should give the router all of the tasks, in priority order", function() {
        expect(taskList.length).toEqual(3);
        expect(taskList.first().get('action')).toEqual('quux');
        expect(taskList.last().get('action')).toEqual('corge');
      });
    });
  });
  
  describe("#selectContext", function() {
    var args, taskList;

    describe("when no context list is selected", function() {
      beforeEach(function() {
        agent.selectContext();
        args = router.select.mostRecentCall.args;
        taskList = args[2];
      });

      it("should tell the router to select a new task list", function() {
        expect(router.select).toHaveBeenCalled();
      });

      it("should tell the router to select a context", function() {
        expect(args[0]).toEqual('contexts');
      });

      it("should tell the router to select the first context (alphabetically)", function() {
        expect(args[1]).toEqual('home');
      });

      it("should give the router all of the tasks, in task order", function() {
        expect(taskList.length).toEqual(1);
        expect(taskList.first().get('action')).toEqual('quux');
      });
    });

    describe("when a context is selected", function() {
      beforeEach(function() {
        agent.selectContext('pc');
        args = router.select.mostRecentCall.args;
        taskList = args[2];
      });

      it("should tell the router to select a new task list", function() {
        expect(router.select).toHaveBeenCalled();
      });

      it("should tell the router to select a context", function() {
        expect(args[0]).toEqual('contexts');
      });

      it("should tell the router to select the correct context'", function() {
        expect(args[1]).toEqual('pc');
      });

      it("should give the router all of the tasks, in priority order", function() {
        expect(taskList.length).toEqual(2);
        expect(taskList.first().get('action')).toEqual('baz');
        expect(taskList.last().get('action')).toEqual('foo');
      });
    });
  });
});
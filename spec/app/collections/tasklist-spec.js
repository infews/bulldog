describe("bulldog.TaskList", function () {
  var taskList, otherCollection;

  beforeEach(function () {
    var tasks = buildTaskFixtures();
    taskList = new bulldog.TaskList(tasks);
  });

  describe("should stay sorted with", function() {
    var tasks;

    beforeEach(function() {
      tasks = taskList.models;
    });

    it("priority N first", function() {
      expect(tasks[0].get('priority')).toEqual('N');
      expect(tasks[1].get('priority')).toEqual('N');
      expect(tasks[2].get('priority')).toEqual('N');
    });

    it("priortity A-Z, less N next", function() {
      expect(tasks[3].get('priority')).toEqual('C');
      expect(tasks[3].get('action')).toEqual('foo');
    });

    it("no priority at the end", function() {
      expect(tasks[4].get('priority')).toEqual(null);
      expect(tasks[4].get('action')).toEqual('bar');
    });
  });

  describe("#actionsForProject", function() {
    describe("when the project is 'All'", function() {
      it("should return all tasks", function() {
        expect(taskList.actionsForProject('All').length).toEqual(5);
      });
    });

    describe("when the project is something", function() {
      it("should return only the tasks for that project", function() {
        expect(taskList.actionsForProject('Zip').length).toEqual(3);
        expect(taskList.actionsForProject('Zip').first().get('action')).toEqual('quux');
      });
    });
  });

  describe("#actionsForContext", function() {
    it("should return only tasks for the requested context", function() {
      expect(taskList.actionsForContext('pc').length).toEqual(2);
      expect(taskList.actionsForContext('pc').first().get('action')).toEqual('baz');
    });
  });

  describe("#nextActionsForContext", function() {
    it("should return only tasks for the requested context", function() {
      expect(taskList.nextActionsForContext('pc').length).toEqual(1);
      expect(taskList.nextActionsForContext('pc').first().get('action')).toEqual('baz');
    });
  });
});
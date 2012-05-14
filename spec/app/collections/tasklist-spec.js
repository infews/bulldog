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
});
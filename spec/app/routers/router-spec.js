describe("bulldog.Router", function() {
  var router, $content;

  beforeEach(function() {
    $content = $("#jasmine_content");
    $content.append('<nav></nav><section class="tasks"></section>');

    var tasks = buildTaskFixtures();
    tasks.push(new bulldog.Task({action: "flint", projectName: 'Fluffy', context: 'home', priority: 'N'}));
    var taskList = new bulldog.TaskList(tasks);
    router = new bulldog.Router(taskList);

    spyOn(router.toDoController, 'action');
  });

  describe("#initialize", function() {
    it("should build necessary controllers", function() {
      expect(router.toDoController).toBeDefined();
    });
  });

  describe("#todo", function() {
    beforeEach(function() {
      router.todo("foo/bar");
    });

    it("should forward the path arguments to the controller", function() {
      expect(router.toDoController.action).toHaveBeenCalledWith('foo', 'bar');
    });
  });
});
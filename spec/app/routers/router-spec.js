describe("bulldog.Router", function() {
  var router, $content;

  beforeEach(function() {
    $content = $("#jasmine_content");

    var dawg = new bulldog.models.App();
    window.getDawg = function() { return dawg; };

    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);

    router = new bulldog.Router();

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
describe("bulldog.TaskListView", function () {
  var view, $content;

  beforeEach(function () {
    var collection = new Backbone.Collection([
      new bulldog.Task({ action: "foo", number: "1", context: "", project: ""}),
      new bulldog.Task({ action: "bar", number: "2", context: "", project: ""}),
      new bulldog.Task({ action: "baz", number: "3", context: "", project: ""})
    ]);
    view = new bulldog.TaskListView({collection: collection});
    $content = $("#jasmine_content");
  });

  describe("#render", function () {
    beforeEach(function () {
      $content.append(view.render().el);
    });

    it("should put the task list into the dom", function () {
      var listNode = $("div.task-list", $content);
      expect(listNode.length).toEqual(1);
    });

    it("should put each task into the dom", function() {
      expect($('.task').length).toEqual(3);
    });
  });
});
describe("bulldog.App", function() {
 var app, $content;

  beforeEach(function() {
    var models = [
      new Backbone.Model({action: "foo"}),
      new Backbone.Model({action: "bar"})
    ];
    app = new bulldog.App(models);
    $content = $("#jasmine_content");
    $content.append('<div class="app"></div>');
  });

  describe("#initialize", function() {
    it("should make a tasklist", function() {
      expect(app.taskList.length).toEqual(2);
    });
  });

  describe("#allTasks", function() {
    beforeEach(function() {
      app.allTasks();
    });

    it("should render the basic task list to the DOM", function() {
      expect($(".task-list", $content).length).toEqual(1);
    });
  });
});
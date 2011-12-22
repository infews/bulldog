describe("bulldog.ProjectListView", function() {
  var view, $content;

  beforeEach(function() {
    var collection = new Backbone.Collection([
      new Backbone.Model({name: 'foo'}),
      new Backbone.Model({name: 'bar'}),
      new Backbone.Model({name: 'baz'})
    ]);

    view = new bulldog.ProjectListView({collection: collection});
    $content = $("#jasmine_content");
  });

  describe("#render", function () {
    beforeEach(function () {
      $content.append(view.render().el);
    });

    it("should put the project list into the dom", function () {
      var listNode = $("div.project-list", $content);
      expect(listNode.length).toEqual(1);
    });

    it("should put each task into the dom", function() {
      expect($('.project').length).toEqual(3);
    });
  });
});
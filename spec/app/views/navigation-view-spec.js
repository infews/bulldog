describe("bulldog.NavigationView", function() {
  var view, $content;

  beforeEach(function() {
    var collection = new Backbone.Collection([
      new Backbone.Model({name: 'All'}),
      new Backbone.Model({name: 'baz'}),
      new Backbone.Model({name: ''})
    ]);

    view = new bulldog.NavigationView({collection: collection});
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

  describe("when a new project is selected", function() {
    var $selected;

    beforeEach(function () {
      $content.append(view.render().el);
      view.selectProject({target: $('.project', $content)[1]});
      $selected = $('.selected');
    });

    it("should move the selection", function() {
      expect($selected.length).toEqual(1);
      expect($($selected[0]).text()).toEqual('Baz');
    });
  });
});
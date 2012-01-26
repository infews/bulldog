describe("bulldog.NavigationView", function() {
  var view, $content;

  beforeEach(function() {
    var projectCollection = new Backbone.Collection([
      new Backbone.Model({name: 'All'}),
      new Backbone.Model({name: 'baz'}),
      new Backbone.Model({name: ''})
    ]);

    var contextCollection = new Backbone.Collection([
      new Backbone.Model({name: 'home'}),
      new Backbone.Model({name: 'pc'}),
      new Backbone.Model({name: 'calls'}),
      new Backbone.Model({name: ''})
    ]);

    view = new bulldog.NavigationView({
      projects: projectCollection,
      contexts: contextCollection
    });
    spyOn(view, 'trigger');
    $content = $("#jasmine_content");
  });

  describe("#render", function () {
    var $navigationNode;

    beforeEach(function () {
      $content.append(view.render().el);
      $navigationNode = $('.navigation', $content);
    });

    it("should render the tabs for projects and contexts", function() {
      var $tabs = $('.tabs', $navigationNode);
      expect($tabs.length).toEqual(1);
    });

    it("should render the project/context list into the dom", function() {
      expect($('.list', $navigationNode).length).toEqual(1);
    });
  });

  describe("when contexts is clicked", function() {
    var $navigationNode;

    beforeEach(function () {
      $content.append(view.render().el);
      $('.contexts').click();

      $navigationNode = $('.navigation', $content);
    });

    it("should select the contexts tab", function() {
      expect($('.tabs .projects.selected').length).toEqual(0);
      expect($('.tabs .contexts.selected').length).toEqual(1);
    });

    it("should remove the project list", function() {
      expect($('.list .project').length).toEqual(0);
    });

    it("should render the context list", function() {
      expect($('.list .context').length).toEqual(4);
    });

    it("should trigger an event sharing the new selection", function() {
      expect(view.trigger).toHaveBeenCalledWith('selection', {list: 'contexts', name: 'home'});
    });
  });
});
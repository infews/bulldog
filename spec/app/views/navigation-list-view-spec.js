describe("bulldog.NavigationListView", function() {
  var view, $content, $list;

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

    view = new bulldog.NavigationListView({
      projects: projectCollection,
      contexts: contextCollection
    });
    spyOn(view, 'trigger');
    $content = $("#jasmine_content");
  });

  describe("#render", function() {
    beforeEach(function() {
      $content.append(view.render().el);
      $list = $('.list', $content);
    });

    it("should render the project/context list into the dom", function() {
      expect($list.length).toEqual(1);
    });
  });

  describe("when a new list item is selected", function() {
    var $selected;

    beforeEach(function() {
      $content.append(view.render().el);
      view.selectItem({target: $('.project', $content)[1]});
      $selected = $('.selected');
    });

    it("should move the selection", function() {
      expect($selected.length).toEqual(1);
      expect($($selected[0]).text()).toEqual('Baz');
    });

    it("should trigger an event", function() {
      expect(view.trigger).toHaveBeenCalledWith('selection', {list: 'projects', name: 'baz'});
    });
  });

  describe("when a new list is selected", function() {
    beforeEach(function() {
      $content.append(view.render().el);
      view.selectList('contexts');
      $list = $('.list');
    });

    it("should replace the list", function() {
      expect($('.context', $list).length).toEqual(4);
    });
    it("should trigger an event", function() {
      expect(view.trigger).toHaveBeenCalledWith('selection', {list: 'contexts', name: 'home'});
    });
  });
});
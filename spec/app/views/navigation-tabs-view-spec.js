describe("bulldog.NavigationTabsView", function() {
  var view, $content, $tabs;

  beforeEach(function() {
    view = new bulldog.NavigationTabsView();
    spyOn(view, 'trigger');
    $content = $("#jasmine_content");
  });

  describe("#render", function () {

    beforeEach(function () {
      $content.append(view.render().el);
      $tabs = $('.tabs', $content);
    });

    it("should render the tabs for projects and contexts", function() {
      expect($tabs.length).toEqual(1);
      expect($('.projects.selected', $tabs).length).toEqual(1);
      expect($('.contexts', $tabs).length).toEqual(1);
    });
  });

  describe("when a tab is selected", function() {
    beforeEach(function () {
      $content.append(view.render().el);
      view.selectTab('contexts');
    });

    it("should select the contexts tab", function() {
      expect($('.tabs .projects.selected', $content).length).toEqual(0);
      expect($('.tabs .contexts.selected', $content).length).toEqual(1);
    });
  });
});
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
      $tabs = $('.nav-tabs', $content);
    });

    it("should render the tabs for projects and contexts", function() {
      expect($tabs.length).toEqual(1);
      expect($('.projects.active', $tabs).length).toEqual(1);
      expect($('.contexts', $tabs).length).toEqual(1);
    });
  });

  describe("when projects is selected", function() {
    beforeEach(function () {
      $content.append(view.render().el);
      view.selectTab('projects');
    });

    it("should select the projects tab", function() {
      expect($('.nav-tabs .active', $content).length).toEqual(1);
      expect($('.nav-tabs .projects.active', $content).length).toEqual(1);
    });
  });

  describe("when contexts is selected", function() {
    beforeEach(function () {
      $content.append(view.render().el);
      view.selectTab('contexts');
    });

    it("should select the contexts tab", function() {
      expect($('.nav-tabs .active', $content).length).toEqual(1);
      expect($('.nav-tabs .contexts.active', $content).length).toEqual(1);
    });
  });

  describe("when nextActions is selected", function() {
    beforeEach(function () {
      $content.append(view.render().el);
      view.selectTab('nextActions');
    });

    it("should select the nextActions tab", function() {
      expect($('.nav-tabs .active', $content).length).toEqual(1);
      expect($('.nav-tabs .nextActions.active', $content).length).toEqual(1);
    });
  });

  describe("when something random is selected", function() {
    beforeEach(function () {
      $content.append(view.render().el);
      view.selectTab('random');
    });

    it("should select the projects tab", function() {
      expect($('.nav-tabs .active', $content).length).toEqual(1);
      expect($('.nav-tabs .projects.active', $content).length).toEqual(1);
    });
  });
});
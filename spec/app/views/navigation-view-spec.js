describe("bulldog.views.Navigation", function() {
  var view, $content, routerAgent;

  beforeEach(function() {
    $content = $("#jasmine_content");

    var dawg = new bulldog.models.App();
    window.getDawg = function() { return dawg; };

    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);

    window.getDawg = function() { return dawg; };

    selection = new bulldog.models.ToDoNavSelection();

    view = new bulldog.views.Navigation({
      el:  $('nav', $content),
      selection: selection
    });
  });

  describe("#render", function() {
    var $navigationNode;

    beforeEach(function() {
      view.render();
      $navigationNode = $('.navigation', $content);
    });

    it("should render the tabs for projects and contexts", function() {
      var $tabs = $('.nav-tabs.tabs', $navigationNode);
      expect($tabs.length).toEqual(1);
    });

    it("should render the project/context list into the dom", function() {
      expect($('.items', $navigationNode).length).toEqual(1);
    });
  });

  describe("#select", function() {
    beforeEach(function() {
      $content.append(view.render().el);
      view.select();
    });

    it("should select the projects tab", function() {
      expect($('.nav-tabs .active').length).toEqual(1);
      expect($('.nav-tabs .projects.active').length).toEqual(1);
    });

    it("should render the project list", function() {
      expect($('ul .project').length).toBeGreaterThan(0);
    });

    it("should select the correct project in the list", function() {
      expect($('ul .project.active').text()).toMatch(/All/);
    });
  });

  xdescribe("when the selection is updated", function() {
    var $navigationNode;

    beforeEach(function() {
      routerAgent.selectContext('home');
      $content.append(view.render().el);
      view.select();

      $navigationNode = $('.navigation', $content);
    });

    it("should select the correct tab", function() {
      expect($('.nav-tabs .active').length).toEqual(1);
      expect($('.nav-tabs .contexts.active').length).toEqual(1);
    });

    it("should render the correct list", function() {
      expect($('.scroll .context').length).toEqual(3);
    });
  });
});
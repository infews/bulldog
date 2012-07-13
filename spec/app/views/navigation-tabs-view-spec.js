describe("bulldog.views.NavigationTabs", function() {
  var view, $content, $tabs, controller;

  beforeEach(function() {
    $content = $("#jasmine_content");

    var dawg = new bulldog.models.App();
    window.getDawg = function() { return dawg; };

    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);

    selection = new bulldog.models.ToDoNavSelection();

    view = new bulldog.views.NavigationTabs({selection: selection});
    $('nav', $content).append(view.render().el);
  });

  describe("#render", function() {
    beforeEach(function() {
      $tabs = $('.nav-tabs', $content);
    });

    it("should render all of the tabs", function() {
      expect($tabs.length).toEqual(1);
      expect($('.projects.active', $tabs).length).toEqual(1);
      expect($('.contexts', $tabs).length).toEqual(1);
      expect($('.next-actions', $tabs).length).toEqual(1);
    });
  });

  xdescribe("when the selection changes", function() {
    beforeEach(function() {
      controller.selectContextsWithNextActions('home');
      view.select();
    });

    describe("#render", function() {
      beforeEach(function() {
        $tabs = $('.nav-tabs', $content);
      });

      it("should render all of the tabs", function() {
        expect($tabs.length).toEqual(1);
        expect($('.projects', $tabs).length).toEqual(1);
        expect($('.contexts', $tabs).length).toEqual(1);
        expect($('.next-actions.active', $tabs).length).toEqual(1);
      });
    });
  });
});
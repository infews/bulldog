describe("bulldog.views.NavigationList", function() {
  var view, $content, $list, routerAgent;

  beforeEach(function() {
    $content = $("#jasmine_content");

    var dawg = new bulldog.models.App();
    window.getDawg = function() { return dawg; };

    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);


    selection = new bulldog.models.ToDoNavSelection();

    view = new bulldog.views.NavigationList({ selection: selection });
    $('nav', $content).append(view.render().el);
  });

  describe("#render", function() {
    beforeEach(function() {
      $content.append(view.render().el);
      $list = $('.items ul', $content);
    });

    it("should render the navigation list into the dom", function() {
      expect($list.length).toEqual(1);
    });
  });

  xdescribe("when the selection changes", function() {
    var $active;

    beforeEach(function() {
      $content.append(view.render().el);
      routerAgent.selectContext('pc');
      view.select();
      $active = $('.active');
    });

    it("should move the selection", function() {
      var selectedItemName = $($active[0]).text();
      expect(_(selectedItemName).clean()).toEqual('Pc');
      expect($active.length).toEqual(1);
    });
  });
});
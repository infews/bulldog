describe("bulldog.NavigationListView", function() {
  var view, $content, $list, routerAgent;

  beforeEach(function() {
    $content = $("#jasmine_content");

    var dawg = new bulldog.App();
    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);

    window.getDawg = function() { return dawg; };

    selection = new bulldog.ToDoNavSelection();

    view = new bulldog.NavigationListView({ selection: selection });
    $('nav', $content).append(view.render().el);
  });

  describe("#render", function() {
    beforeEach(function() {
      $content.append(view.render().el);
      $list = $('.scroll ul', $content);
    });

    it("should render the project/context list into the dom", function() {
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
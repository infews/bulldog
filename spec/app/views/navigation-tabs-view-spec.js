describe("bulldog.NavigationTabsView", function() {
  var view, $content, $tabs, routerAgent;

  beforeEach(function() {
    var router = jasmine.createSpyObj('FakeRouter', ['updateNavigationView', 'updateTaskListView']);
    var tasks = buildTaskFixtures();
    var taskList = new bulldog.TaskList(tasks);
    routerAgent = new bulldog.RouterAgent(router, taskList);

    view = new bulldog.NavigationTabsView({app: routerAgent});
    spyOn(view, 'trigger');
    $content = $("#jasmine_content");
  });

  describe("#render", function() {
    beforeEach(function() {
      $content.append(view.render().el);
      $tabs = $('.nav-tabs', $content);
    });

    it("should render all of the tabs", function() {
      expect($tabs.length).toEqual(1);
      expect($('.projects.active', $tabs).length).toEqual(1);
      expect($('.contexts', $tabs).length).toEqual(1);
      expect($('.next-actions', $tabs).length).toEqual(1);
    });
  });

  describe("when the selection changes", function() {
    beforeEach(function() {
      routerAgent.selectContextsWithNextActions('home');
      view.select();
    });

    describe("#render", function() {
      beforeEach(function() {
        $content.append(view.render().el);
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
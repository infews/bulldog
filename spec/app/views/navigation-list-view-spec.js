describe("bulldog.NavigationListView", function() {
  var view, $content, $list, routerAgent;

  beforeEach(function() {
    var router = jasmine.createSpyObj('FakeRouter', ['updateNavigationView', 'updateTaskListView']);
    var tasks = [
      new bulldog.Task({action: "foo", projectName: 'Zip', context: 'pc', priority: 'C'}),
      new bulldog.Task({action: "bar", projectName: '', context: ''}),
      new bulldog.Task({action: "baz", projectName: 'Buzz', context: 'pc', priority: 'N'}),
      new bulldog.Task({action: "quux", projectName: 'Zip', context: 'home', priority: 'N'}),
      new bulldog.Task({action: "corge", projectName: 'Zip', context: '', priority: 'N'})
    ];
    var taskList = new bulldog.TaskList(tasks);
    routerAgent = new bulldog.RouterAgent(router, taskList);

    view = new bulldog.NavigationListView({ app: routerAgent });

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

  describe("when the selection changes", function() {
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
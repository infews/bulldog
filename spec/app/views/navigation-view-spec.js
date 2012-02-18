describe("bulldog.NavigationView", function() {
  var view, $content, routerAgent;

  beforeEach(function() {
    $content = $("#jasmine_content");

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

    view = new bulldog.NavigationView({ app: routerAgent });
  });

  describe("#render", function () {
    var $navigationNode;

    beforeEach(function () {
      $content.append(view.render().el);
      $navigationNode = $('.navigation', $content);
    });

    it("should render the tabs for projects and contexts", function() {
      var $tabs = $('.nav-tabs.tabs', $navigationNode);
      expect($tabs.length).toEqual(1);
    });

    it("should render the project/context list into the dom", function() {
      expect($('.list', $navigationNode).length).toEqual(1);
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
      expect($('.list .project').length).toBeGreaterThan(0);
    });

    it("should select the correct project in the list", function() {
      expect($('.list .project.active').text()).toMatch(/All/);
    });
  });

  describe("when the selection is updated", function() {
    var $navigationNode;

    beforeEach(function () {
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
      expect($('.list .context').length).toEqual(3);
    });
  });
});
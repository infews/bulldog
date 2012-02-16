describe("bulldog.Router", function() {
 var app, $content;

  beforeEach(function() {
    $content = $("#jasmine_content");
    $content.append('<nav></nav><section class="tasks"></section>');

    var tasks = [
      new bulldog.Task({action: "foo", projectName: 'Zip', context: 'pc', priority: 'C'}),
      new bulldog.Task({action: "bar", projectName: '', context: ''}),
      new bulldog.Task({action: "baz", projectName: 'Buzz', context: 'pc'}),
      new bulldog.Task({action: "quuz", projectName: 'Zip', context: 'home', priority: 'A'}),
      new bulldog.Task({action: "corge", projectName: 'Zip', context: 'pc', priority: 'N'}),
      new bulldog.Task({action: "flint", projectName: 'Fluffy', context: 'home', priority: 'N'})
    ];

    app = new bulldog.Router(tasks);
  });

  describe("#initialize", function() {
    it("should make a tasklist", function() {
      expect(app.taskList.length).toEqual(6);
    });
  });

  describe("#firstProject", function() {
    beforeEach(function() {
      app.firstProject();
    });

    it("should render the navigation UI", function() {
      expect($('nav .navigation').length).toEqual(1)
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
      expect($("section.tasks .task", $content).length).toEqual(6);
    });
  });

  describe("#project", function() {
    beforeEach(function() {
      app.project("Zip");
    });

    it("should select the 'projects' tab", function() {
      expect($('nav .navigation .tabs .active').length).toEqual(1);
      expect($('nav .navigation .tabs .projects.active').length).toEqual(1);
    });

    it("should select the correct project in the navigation", function() {
      expect($('nav .navigation .project.active').text()).toMatch(/Zip/);
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
    });

    it("should render the tasks UI with only tasks from from the selected project", function() {
      expect($("section.tasks .task", $content).length).toEqual(3);
    });
  });

  describe("#firstContext", function() {
    beforeEach(function() {
      app.firstContext();
    });

    it("should render the navigation UI", function() {
      expect($('nav .navigation').length).toEqual(1)
    });

    it("should select the 'contexts' tab", function() {
      expect($('nav .navigation .tabs .active').length).toEqual(1);
      expect($('nav .navigation .tabs .contexts.active').length).toEqual(1);
    });

    it("should select the correct context in the navigation", function() {
      expect($('nav .navigation .context.active').text()).toMatch(/home/i);
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
    });

    it("should render the tasks UI with only tasks from from the selected context", function() {
      expect($("section.tasks .task", $content).length).toEqual(2);
    });
  });

  describe("#context", function() {
    beforeEach(function() {
      app.context("pc");
    });

    it("should render the navigation UI", function() {
      expect($('nav .navigation').length).toEqual(1)
    });

    it("should select the 'contexts' tab", function() {
      expect($('nav .navigation .tabs .active').length).toEqual(1);
      expect($('nav .navigation .tabs .contexts.active').length).toEqual(1);
    });

    it("should select the correct context in the navigation", function() {
      expect($('nav .navigation .context.active').text()).toMatch(/pc/i);
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
    });

    it("should render the tasks UI with only tasks from from the selected context", function() {
      expect($("section.tasks .task", $content).length).toEqual(3);
    });
  });

  xdescribe("#firstContextWithNextActions", function() {
    beforeEach(function() {
      app.firstContextWithNextActions("pc");
    });

    it("should render the navigation UI", function() {
      expect($('nav .navigation').length).toEqual(1)
    });

    it("should select the 'contexts' tab", function() {
      expect($('nav .navigation .projects.active').length).toEqual(0);
      expect($('nav .navigation .contexts.active').length).toEqual(1);
    });

    it("should select the correct context in the navigation", function() {
      expect($('nav .navigation .context.active').text()).toMatch(/pc/i);
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
    });

    it("should render the tasks UI with only tasks from from the selected context", function() {
      expect($("section.tasks .task", $content).length).toEqual(3);
    });
  });

  describe("#nextActions", function() {
    beforeEach(function() {
      app.nextActions("pc");
    });

    it("should render the navigation UI", function() {
      expect($('nav .navigation').length).toEqual(1)
    });

    it("should select the 'contexts' tab", function() {
      expect($('nav .navigation .tabs .active').length).toEqual(1);
      expect($('nav .navigation .tabs .nextActions.active').length).toEqual(1);
    });

    it("should select the correct context in the navigation", function() {
      expect($('nav .navigation .list .nextAction.active').text()).toMatch(/pc/i);
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
    });

    it("should render the tasks UI with only tasks from from the selected context", function() {
      expect($("section.tasks .task", $content).length).toEqual(3);
    });
  });
});
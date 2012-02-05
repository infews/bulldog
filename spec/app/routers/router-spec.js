describe("bulldog.Router", function() {
 var app, $content;

  beforeEach(function() {
    var tasks = [
      new Backbone.Model({action: "foo", projectName: 'Zip', context: 'home'}),
      new Backbone.Model({action: "bar", projectName: '', context: ''}),
      new Backbone.Model({action: "baz", projectName: 'Buzz', context: 'pc'}),
      new Backbone.Model({action: "quuz", projectName: 'Zip', context: 'home'})
    ];
    app = new bulldog.Router(tasks);
    $content = $("#jasmine_content");
    $content.append('<nav></nav><section class="tasks"></section>');
  });

  describe("#initialize", function() {
    it("should make a tasklist", function() {
      expect(app.taskList.length).toEqual(4);
    });

    it("should make a project list", function() {
      expect(app.projectList.length).toEqual(4);
    });

    it("should have the project 'All' first", function() {
      expect(app.projectList.first().get('name')).toEqual('All');
    });

    it("should have the project '' last", function() {
      expect(app.projectList.last().get('name')).toEqual('');
    });

    it("should have a context list", function() {
      expect(app.contextList.length).toEqual(3);
    });

    it("should have the context '' last", function() {
      expect(app.contextList.last().get('name')).toEqual('');
    });
  });

  describe("#root", function() {
    beforeEach(function() {
      app.root();
    });

    it("should render the navigation UI", function() {
      expect($('nav .navigation').length).toEqual(1)
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
      expect($("section.tasks .task", $content).length).toEqual(4);
    });
  });

  describe("#project", function() {
    beforeEach(function() {
      app.root();
      app.project("Zip");
    });

    it("should select the 'projects' tab", function() {
      expect($('nav .navigation .projects.active').length).toEqual(1);
      expect($('nav .navigation .contexts.active').length).toEqual(0);
    });

    it("should select the correct project in the navigation", function() {
      expect($('nav .navigation .project.active').text()).toMatch(/Zip/);
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
    });

    it("should render the tasks UI with only tasks from from the selected project", function() {
      expect($("section.tasks .task", $content).length).toEqual(2);
    });
  });

  describe("#context", function() {
    beforeEach(function() {
      app.root();
      app.context("pc");
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
      expect($("section.tasks .task", $content).length).toEqual(1);
    });
  });
});
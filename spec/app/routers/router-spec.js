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

  describe("picking a project", function() {

    beforeEach(function() {
      app.root();
      $($('.project')[1]).click();
    });

    it("should select the 2nd project", function() {
      expect($($('.project.selected')[0]).text()).toMatch(/Zip/);
    });

    it("should re-render the project list", function() {
      expect($('.tasks .task').length).toEqual(2);
    });
  });
});
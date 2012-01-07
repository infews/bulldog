describe("bulldog.Router", function() {
 var app, $content;

  beforeEach(function() {
    var tasks = [
      new Backbone.Model({action: "foo", projectName: 'Zip'}),
      new Backbone.Model({action: "bar", projectName: ''}),
      new Backbone.Model({action: "baz", projectName: 'Buzz'}),
      new Backbone.Model({action: "quuz", projectName: 'Zip'})
    ];
    app = new bulldog.Router(tasks);
    $content = $("#jasmine_content");
    $content.append('<nav class="projects"></nav><section class="tasks"></section>');
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
  });

  describe("#tasksFor", function() {

    describe("when no project is specified", function() {
      beforeEach(function() {
        app.tasksFor({projectName: 'All'});
      });

      it("should render all tasks into the DOM", function() {
        expect($(".task-list", $content).length).toEqual(1);
        expect($(".task", $content).length).toEqual(4);
      });
    });

    describe("when a project is specified", function() {
      beforeEach(function() {
        app.tasksFor({projectName: 'Zip'});
      });

      it("should render only the requested Project's tasks into the DOM", function() {
        expect($(".task-list", $content).length).toEqual(1);
        expect($(".task", $content).length).toEqual(2);
      });
    });
  });

  describe("#allProjects", function() {
    beforeEach(function() {
      app.allProjects();
    });

    it("should render just the list of all project names", function() {
      expect($(".project-list", $content).length).toEqual(1);
    });
  });
});
describe("bulldog.Router", function() {
  var router, $content;

  beforeEach(function() {
    $content = $("#jasmine_content");
    $content.append('<nav></nav><section class="tasks"></section>');

    var tasks = buildTaskFixtures();
    tasks.push(new bulldog.Task({action: "flint", projectName: 'Fluffy', context: 'home', priority: 'N'}));

    router = new bulldog.Router(tasks);
  });

  describe("#initialize", function() {
    it("should make a tasklist", function() {
      expect(router.taskList.length).toEqual(6);
    });
  });

  describe("#firstProject", function() {
    beforeEach(function() {
      router.project();
    });

    it("should render the navigation UI", function() {
      expect($('nav .navigation').length).toEqual(1)
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
      expect($("section.tasks .task", $content).length).toEqual(6);
    });

    it("should label the tasks with the current tab", function() {
      expect($("section.tasks", $content).attr('class')).toMatch(/projects/);
    });
  });

  describe("#project", function() {
    beforeEach(function() {
      router.project("Zip");
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

    it("should label the tasks with the current tab", function() {
      expect($("section.tasks", $content).attr('class')).toMatch(/projects/);
    });

    it("should render the tasks UI with only tasks from from the selected project", function() {
      expect($("section.tasks .task", $content).length).toEqual(3);
    });
  });

  describe("#firstContext", function() {
    beforeEach(function() {
      router.context();
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

    it("should label the tasks with the current tab", function() {
      expect($("section.tasks", $content).attr('class')).toMatch(/contexts/);
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
      router.context("pc");
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

    it("should label the tasks with the current tab", function() {
      expect($("section.tasks", $content).attr('class')).toMatch(/contexts/);
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
    });

    it("should render the tasks UI with only tasks from from the selected context", function() {
      expect($("section.tasks .task", $content).length).toEqual(2);
    });
  });

  describe("#nextActions", function() {
    beforeEach(function() {
      router.nextActions("pc");
    });

    it("should render the navigation UI", function() {
      expect($('nav .navigation').length).toEqual(1)
    });

    it("should select the 'next-actions' tab", function() {
      expect($('nav .navigation .tabs .active').length).toEqual(1);
      expect($('nav .navigation .tabs .next-actions.active').length).toEqual(1);
    });

    it("should select the correct context in the navigation", function() {
      expect($('nav .navigation .list .next-action.active').text()).toMatch(/pc/i);
    });

    it("should label the tasks with the current tab", function() {
      expect($("section.tasks", $content).attr('class')).toMatch(/next-actions/);
    });

    it("should render the tasks UI", function() {
      expect($("section.tasks .task-list", $content).length).toEqual(1);
    });

    it("should render the tasks UI with only tasks from from the selected context", function() {
      expect($("section.tasks .task", $content).length).toEqual(1);
    });
  });
});
describe("bulldog.ToDoController", function() {
  var controller, $content;

  beforeEach(function() {
    $content = $("#jasmine_content");
    $content.append('<nav></nav><section class="tasks"></section>');

    var tasks = buildTaskFixtures();
    tasks.push(new bulldog.Task({action: "flint", projectName: 'Fluffy', context: 'home', priority: 'N'}));
    var taskList = new bulldog.TaskList(tasks);
    controller = new bulldog.ToDoController(taskList);
  });

  describe("#action", function() {
    describe("for projects", function() {
      describe("with no project specified", function() {
        beforeEach(function() {
          controller.action('projects');
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

      describe("#with a project specified", function() {
        beforeEach(function() {
          controller.action("projects", "Zip");
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
    });

    describe("#context", function() {

      describe("when a context is not specified", function() {
        beforeEach(function() {
          controller.action("contexts");
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
          controller.action("contexts", "pc");
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
    });

    describe("#nextActions", function() {
      beforeEach(function() {
        controller.action("next-actions", "pc");
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
});
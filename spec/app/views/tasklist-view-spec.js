describe("bulldog.TaskListView", function() {
  var view, selection, taskList, $content;

  beforeEach(function() {
    $content = $("#jasmine_content");

    var dawg = new bulldog.App();
    window.getDawg = function() { return dawg; };

    dawg.loadTodoTxt();
    ajaxRequests[0].response(testResponses.localTodos);
    ajaxRequests[1].response(testResponses.localDone);

    taskList = getDawg().getToDos().taskList();
    selection = new bulldog.ToDoNavSelection();

    view = new bulldog.TaskListView({
      el: $content.find('section'),
      selection: selection
    });
  });

  describe("#render", function() {
    describe("with defaults", function() {
      beforeEach(function() {
        view.render(taskList['actionsForProject']('All'));
        $content.append(view.el);
      });

      it("should set the class based on the task list", function() {
        var _classes = _(view.$el.attr('class').split(' '));

        expect(_classes.include('tasks')).toEqual(true);
        expect(_classes.include('projects')).toEqual(true);
        expect(_classes.include('all')).toEqual(true);
      });

      it("should put each task into the dom", function() {
        expect(view.$('.task').length).toEqual(8);
      });
    });

    describe("when the selection changes", function() {
      beforeEach(function() {
        selection.set('contexts');
        view.render(taskList['actionsForContext']('home'));
        $content.append(view.el);
      });

      it("should set the class based on the task list", function() {
        var _classes = _(view.$el.attr('class').split(' '));

        expect(_classes.include('tasks')).toEqual(true);
        expect(_classes.include('contexts')).toEqual(true);
        expect(_classes.include('all')).toEqual(false);
      });

      it("should put each task into the dom", function() {
        expect(view.$('.task').length).toEqual(2);
      });
    });
  });
});
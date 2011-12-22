describe("bulldog.TaskView", function() {
  var view, $content;

  beforeEach(function() {
    var task = new bulldog.Task({
      action:  "Call mom for wishes",
      number:  "17",
      context: "calls",
      project: "Happy Birthday"
    });

    view = new bulldog.TaskView(task);
    $content = $("#jasmine_content");
  });

  describe("#render", function() {
    var $task;
    beforeEach(function() {
      $content.append(view.render().el);
      $task = $('div.task', $content);
    });

    it("should render the task into the DOM", function() {
      expect($task.length).toEqual(1);
    });

    it("should render the task action", function() {
      expect($('div.action', $task).text()).toEqual('Call mom for wishes');
    });

    it("should render the task number", function() {
      expect($('span.number', $task).text()).toEqual('17');
    });

    it("should render the task context", function() {
      expect($('div.context', $task).text()).toEqual('calls');
    });

    it("should render the task project", function() {
      expect($('div.project', $task).text()).toMatch('Happy Birthday');
    });
  });
});
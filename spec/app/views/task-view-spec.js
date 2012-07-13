describe("bulldog.views.Task", function() {
  var view, $content, $task;

  beforeEach(function() {
    var task = new bulldog.models.Task({
      action:      "Call mom for wishes",
      number:      "17",
      context:     "calls",
      projectName: "HappyBirthday"
    });

    view = new bulldog.views.Task(task);
    $content = $("#jasmine_content");
  });

  describe("#render", function() {
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
      expect($('.number', $task).html()).toMatch(/17/)
    });

    it("should render the task context", function() {
      expect($('.context', $task).html()).toMatch(/@calls/);
    });

    it("should render the task project", function() {
      expect($('.project', $task).html()).toMatch(/\+HappyBirthday/);
    });

    it("should not render a priority", function() {
      expect($('.priority').length).toEqual(0);
    });
  });

  describe("when a task has prirority", function() {
    beforeEach(function() {
      var task = new bulldog.models.Task({
        action:      "Call mom for wishes",
        number:      "17",
        context:     "calls",
        projectName: "HappyBirthday",
        priority:    "A"
      });

      view = new bulldog.views.Task(task);
      $content.append(view.render().el);
      $task = $('div.task', $content);
    });

    it("should render a prirority", function() {
      expect($('.priority').length).toEqual(1);
    });
  });
});
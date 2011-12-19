describe("bulldog.TaskAgent", function() {
  var agent, view;

  beforeEach(function() {
    var task = new bulldog.Task({
      action: "Call mom for wishes",
      number:      "17",
      context:     "calls",
      project:     "Happy Birthday"
    });

    agent = new bulldog.TaskAgent(view, task)
  });

  describe("#getTaskLocals", function() {
    var locals;

    beforeEach(function() {
      locals = agent.getTaskLocals();
    });

    it("should return all the task fields", function() {
      expect(locals.action).toEqual('Call mom for wishes');
      expect(locals.number).toEqual('17');
      expect(locals.context).toEqual('calls');
      expect(locals.project).toEqual('Happy Birthday');
    });
  });
});
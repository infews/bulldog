describe("bulldog.Task", function() {
  var task;

  describe("without a next action", function() {
    beforeEach(function() {
      task = new bulldog.Task({ action: "foo", context: "Email", project: "HawaiiTrip"});
    });

    it("should report that it does not have a next action", function() {
      expect(task.isNextAction()).toBeFalsy();
    });
  });

  describe("with a next action", function() {
    beforeEach(function() {
      task = new bulldog.Task({ action: "baz", context: "Email", project: "HawaiiTrip", priority: "N"});
    });

    it("should report that it does not have a next action", function() {
      expect(task.isNextAction()).toBeTruthy();
    });
  });
});
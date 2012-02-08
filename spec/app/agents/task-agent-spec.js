describe("bulldog.TaskAgent", function() {
  var agent, view, locals;

  describe("for a task without prirority", function() {
    beforeEach(function() {
      var task = new bulldog.Task({
        action:      "Call mom for wishes",
        number:      "17",
        context:     "calls",
        projectName: "Happy Birthday"
      });

      agent = new bulldog.TaskAgent(view, task);
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
        expect(locals.projectName).toEqual('Happy Birthday');
        expect(locals.priority).not.toBeDefined();
      });
    });
  });

  describe("for a task with prirority", function() {
    beforeEach(function() {
      var task = new bulldog.Task({
        action:      "Call mom for wishes",
        number:      "17",
        context:     "calls",
        projectName: "Happy Birthday",
        priority: "A"
      });

      agent = new bulldog.TaskAgent(view, task);
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
        expect(locals.projectName).toEqual('Happy Birthday');
        expect(locals.priority).toEqual('A');
      });
    });
  });

  describe("URL shortening & linking", function() {

    describe("with a single link", function() {
      beforeEach(function() {
        var task = new bulldog.Task({
          action:      "Call mom for wishes http://foobar.com/abc",
          number:      "17",
          context:     "calls",
          projectName: "Happy Birthday"
        });

        agent = new bulldog.TaskAgent(view, task)
        locals = agent.getTaskLocals();
      });

      it("should replace links in the text with clickable <a> tags", function() {
        expect(locals.action).toMatch(/<a target="_blank" href="http:\/\/foobar\.com\/abc">\[link\]<\/a>/)
      });
    });

    describe("with multiple links", function() {
      beforeEach(function() {
        var task = new bulldog.Task({
          action:      "Call mom for wishes http://foobar.com/abc boo https://www.example.com?q=zippy",
          number:      "17",
          context:     "calls",
          projectName: "Happy Birthday"
        });

        agent = new bulldog.TaskAgent(view, task)
        locals = agent.getTaskLocals();
      });

      it("should replace links in the text with clickable <a> tags", function() {
        expect(locals.action).toMatch(/<a target="_blank" href="http:\/\/foobar\.com\/abc">\[link 1\]<\/a>/)
        expect(locals.action).toMatch(/<a target="_blank" href="https:\/\/www\.example\.com\?q=zippy">\[link 2\]<\/a>/)
      });
    });
  });

});
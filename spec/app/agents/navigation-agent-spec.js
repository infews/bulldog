describe("bulldog.NavigationAgent", function() {
  var agent, view, locals;

  beforeEach(function() {
    var projects = [
      new Backbone.Model({name: "All"}),
      new Backbone.Model({name: "ThankYouNotes"}),
      new Backbone.Model({name: ""})
    ];
    var collection = new Backbone.Collection(projects);

    agent = new bulldog.NavigationAgent(view, collection);
  });

  describe("current selection", function() {
    var selection;

    describe("before being set", function() {
      beforeEach(function() {
        selection = agent.getCurrentSelection();
      });

      it("#getCurrentSelection should return 'All'", function() {
        expect(selection).toEqual('All');
      });
    });

    describe("after being set", function() {
      beforeEach(function() {
        agent.setCurrentSelection("");
        selection = agent.getCurrentSelection();
      });

      it("should equal ''", function() {
        expect(selection).toEqual('');
      });
    });

    describe("when set to a non-present value", function() {
      beforeEach(function() {
        agent.setCurrentSelection('zippy');
        selection = agent.getCurrentSelection();
      });

      it("should return 'All'", function() {
        expect(selection).toEqual('All');
      });
    });

  });

  describe("#getProjectLocals", function() {
    var locals, projectAttrs;

    describe("when there is a selection", function() {
      beforeEach(function() {
        agent.setCurrentSelection('ThankYouNotes');
        locals = agent.getProjectLocals();
        projectAttrs = locals.projects[1];
      });

      it("should have the correct project selected", function() {
        expect(projectAttrs.name).toEqual('Thank You Notes');
        expect(projectAttrs.className).toEqual('project selected');
        expect(projectAttrs.url).toEqual('project/ThankYouNotes');
      });
    });

    describe("when there is no selection", function() {
      beforeEach(function() {
        locals = agent.getProjectLocals();
      });

      it("should return all the project names", function() {
        expect(locals.projects.length).toEqual(3);
      });

      it("should return 'All' as the first project", function() {
        expect(_(locals.projects).first().name).toEqual('All');
      });

      it("should have the 'All' project selected", function() {
        expect(_(locals.projects).first().className).toEqual('project selected');
      });

      it("should return '(none)' as the last project", function() {
        expect(_(locals.projects).last().name).toEqual('(none)');
      });

      it("should have the 'All' project selected", function() {
        expect(_(locals.projects).last().className).toEqual('project');
      });
    });
  });

  describe("#findProjectByPrettyName", function() {
    var project;
    beforeEach(function() {
      project = agent.findProjectByPrettyName('(none)');
    });

    it("should return the correct project", function() {
      expect(project.get('name')).toEqual('');
    });
  });


});
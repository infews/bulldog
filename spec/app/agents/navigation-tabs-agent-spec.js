describe("bulldog.NavigationTabsAgent", function() {
  var agent, view, locals;

  beforeEach(function() {
    view = { render: jasmine.createSpy('view.render') };
    agent = new bulldog.NavigationTabsAgent(
      view
    );
  });

  describe("selected navigation tab", function() {
    var selection;

    describe("before being set", function() {
      beforeEach(function() {
        selection = agent.getSelectedTab();
      });

      it("should equal 'projects' text", function() {
        expect(selection).toEqual('projects');
      });
    });

    describe("after being set", function() {
      beforeEach(function() {
        agent.selectTab('contexts');
        selection = agent.getSelectedTab();
      });

      it("should equal 'contexts' text", function() {
        expect(selection).toEqual('contexts');
      });

      it("should tell the view to re-render the navigation", function() {
        expect(view.render).toHaveBeenCalled();
      });
    });

    describe("when set to something other than projects or contexts", function() {
      beforeEach(function() {
        agent.selectTab('zippy');
        selection = agent.getSelectedTab();
      });

      it("should return 'projects'", function() {
        expect(selection).toEqual('projects');
      });
    });
  });

  describe("#getLocals", function() {
    var locals;

    describe("when 'contexts' is selected", function() {
      beforeEach(function() {
        agent.selectTab('contexts');
        locals = agent.getLocals();
      });

      it("should show 'contexts' selected", function() {
        expect(locals.tabs.length).toEqual(2);
        expect(locals.tabs[0]).toEqual({text: '+', className: 'projects'});
        expect(locals.tabs[1]).toEqual({text: '@', className: 'contexts selected'});
      });
    });

    describe("when 'projects' is selected", function() {

      describe("the navigation tabs", function() {

        beforeEach(function() {
          locals = agent.getLocals();
        });

        it("should show 'projects' selected", function() {
          expect(locals.tabs.length).toEqual(2);
          expect(locals.tabs[0]).toEqual({text: '+', className: 'projects selected'});
          expect(locals.tabs[1]).toEqual({text: '@', className: 'contexts'});
        });
      });
    });
  });
});
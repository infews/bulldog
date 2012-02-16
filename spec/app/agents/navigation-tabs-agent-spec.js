describe("bulldog.NavigationTabsAgent", function() {
  var agent, view, locals;

  beforeEach(function() {
    view = {
      render: jasmine.createSpy('view.render')
    };
    agent = new bulldog.NavigationTabsAgent(view);
  });

  describe("#getLocals", function() {

    beforeEach(function() {
      locals = agent.getLocals();
    });

    it("should return the expected number of tabs", function() {
      expect(locals.tabs.length).toEqual(3);
    });

    it("should have the tabs in the correct order", function() {
      var labels = _(locals.tabs).pluck('text');
      expect(labels).toEqual(['+', '@', '\u2794']);
    });

    it("should configure the projects tab correctly", function() {
      var projects = locals.tabs[0];
      expect(projects.text).toEqual('+');
      expect(projects.className).toMatch(/projects/);
      expect(projects.link).toEqual('#/');
    });

    it("should configure the contexts tab correctly", function() {
      var contexts = locals.tabs[1];
      expect(contexts.text).toEqual('@');
      expect(contexts.className).toMatch(/contexts/);
      expect(contexts.link).toEqual('#/contexts');
    });

    it("should configure the nextActions tab correctly", function() {
      var nextActions = locals.tabs[2];
      expect(nextActions.text).toEqual('\u2794');
      expect(nextActions.className).toMatch(/nextActions/);
      expect(nextActions.link).toEqual('#/nextActions');
    });

  });

  xdescribe("selected navigation tab", function() {
    var selection;

    describe("before being set", function() {
      beforeEach(function() {
        selection = agent.getSelectedTab();
      });

      it("should equal 'projects' text", function() {
        expect(selection).toEqual('projects');
      });
    });

    describe("after being set to contexts", function() {
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

    describe("after being set to nextActions", function() {
      beforeEach(function() {
        agent.selectTab('nextActions');
        selection = agent.getSelectedTab();
      });

      it("should equal 'contexts' text", function() {
        expect(selection).toEqual('nextActions');
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

  xdescribe("#getLocals", function() {
    var locals;

    describe("when 'contexts' is selected", function() {
      beforeEach(function() {
        agent.selectTab('contexts');
        locals = agent.getLocals();
      });

      it("should show 'contexts' selected", function() {
        expect(locals.tabs.length).toEqual(2);
        expect(locals.tabs[0]).toEqual({text: '+', className: 'projects', link: '#/'});
        expect(locals.tabs[1]).toEqual({text: '@', className: 'contexts active', link: '#/contexts'});
      });
    });

    describe("when 'projects' is selected", function() {

      describe("the navigation tabs", function() {

        beforeEach(function() {
          locals = agent.getLocals();
        });

        it("should show 'projects' selected", function() {
          expect(locals.tabs.length).toEqual(2);
          expect(locals.tabs[0]).toEqual({text: '+', className: 'projects active', link: '#/'});
          expect(locals.tabs[1]).toEqual({text: '@', className: 'contexts', link: '#/contexts'});
        });
      });
    });
  });
});
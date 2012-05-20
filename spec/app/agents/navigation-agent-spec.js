describe("bulldog.NavigationAgent", function() {
  var agent, view, locals;

  beforeEach(function() {
    var projectCollection = new Backbone.Collection([
      new Backbone.Model({name: 'All'}),
      new Backbone.Model({name: 'ThankYouNotes'}),
      new Backbone.Model({name: ''})
    ]);

    var contextCollection = new Backbone.Collection([
      new Backbone.Model({name: 'home'}),
      new Backbone.Model({name: 'pc'}),
      new Backbone.Model({name: 'calls'}),
      new Backbone.Model({name: ''})
    ]);

    view = { render: jasmine.createSpy('view.render') };
    agent = new bulldog.NavigationAgent(
      view,
      {
        projects: projectCollection,
        contexts: contextCollection
      }
    );
  });

  describe("selected navigation tab", function() {
    var selection;

    describe("before being set", function() {
      beforeEach(function() {
        selection = agent.getSelectedTab();
      });

      it("should equal 'projects' text", function() {
        expect(selection).toEqual('+');
      });
    });

    describe("after being set", function() {
      beforeEach(function() {
        agent.selectTab("@");
        selection = agent.getSelectedTab();
      });

      it("should equal 'contexts' text", function() {
        expect(selection).toEqual('@');
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
        expect(selection).toEqual('+');
      });
    });
  });

  describe("selected project", function() {
    var selection;

    describe("before being set", function() {
      beforeEach(function() {
        selection = agent.getSelectedProject();
      });

      it("#getSelectedProject should return 'All'", function() {
        expect(selection).toEqual('All');
      });
    });

    describe("after being set", function() {
      beforeEach(function() {
        agent.selectProject('ThankYouNotes');
        selection = agent.getSelectedProject();
      });

      it("should equal the new value", function() {
        expect(selection).toEqual('ThankYouNotes');
      });
    });

    describe("when set to a non-present value", function() {
      beforeEach(function() {
        agent.selectProject('zippy');
        selection = agent.getSelectedProject();
      });

      it("should return 'All'", function() {
        expect(selection).toEqual('All');
      });
    });
  });
  
  describe("selected context", function() {
    var selection;

    describe("before being set", function() {
      beforeEach(function() {
        selection = agent.getSelectedContext();
      });

      it("#getSelectedContext should return 'none'", function() {
        expect(selection).toEqual('(none)');
      });
    });

    describe("after being set", function() {
      beforeEach(function() {
        agent.selectContext("");
        selection = agent.getSelectedContext();
      });

      it("should equal ''", function() {
        expect(selection).toEqual('');
      });
    });

    describe("when set to a non-present value", function() {
      beforeEach(function() {
        agent.selectContext('zippy');
        selection = agent.getSelectedContext();
      });

      it("should return 'All'", function() {
        expect(selection).toEqual('(none)');
      });
    });

  });

  describe("#getLocals", function() {
    var locals, item;

    describe("when 'contexts' is selected", function() {
      beforeEach(function() {
        agent.selectTab('@');
        agent.selectContext('home');
        locals = agent.getLocals();
      });

      it("should show 'contexts' selected", function() {
        expect(locals.tabs.length).toEqual(2);
        expect(locals.tabs[0]).toEqual({text: '+', className: 'projects'});
        expect(locals.tabs[1]).toEqual({text: '@', className: 'contexts active'});
      });

      describe("the list", function() {
        beforeEach(function() {
          locals = agent.getLocals();
        });

        it("should return all the context names", function() {
          expect(locals.list.length).toEqual(4);
        });

        it("should have the fist item selected", function() {
          expect(_(locals.list).first().className).toEqual('context active');
        });

        it("should return '(none)' as the last item", function() {
          expect(_(locals.list).last().name).toEqual('(none)');
        });

        it("should have the right classname on all the other contexts", function() {
          expect(_(locals.list).last().className).toEqual('context');
        });
      })
    });

    describe("when 'projects' is selected", function() {

      describe("the navigation tabs", function() {

        beforeEach(function() {
          locals = agent.getLocals();
        });

        it("should show 'projects' selected", function() {
          expect(locals.tabs.length).toEqual(2);
          expect(locals.tabs[0]).toEqual({text: '+', className: 'projects active'});
          expect(locals.tabs[1]).toEqual({text: '@', className: 'contexts'});
        });
      });

      describe("when there is a selection", function() {
        beforeEach(function() {
          agent.selectProject('ThankYouNotes');
          locals = agent.getLocals();
          item = locals.list[1];
        });

        it("should have the correct project selected", function() {
          expect(item.name).toEqual('Thank You Notes');
          expect(item.className).toEqual('project active');
          expect(item.url).toEqual('todo/project/ThankYouNotes');
        });
      });

      describe("the list", function() {
        beforeEach(function() {
          locals = agent.getLocals();
        });

        it("should return all the project names", function() {
          expect(locals.list.length).toEqual(3);
        });

        it("should return 'All' as the first item", function() {
          expect(_(locals.list).first().name).toEqual('All');
        });

        it("should have the 'All' item selected", function() {
          expect(_(locals.list).first().className).toEqual('project active');
        });

        it("should return '(none)' as the last project", function() {
          expect(_(locals.list).last().name).toEqual('(none)');
        });

        it("should have the 'All' project selected", function() {
          expect(_(locals.list).last().className).toEqual('project');
        });
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